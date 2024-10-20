import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetailAsync } from '../features/productDetailSlice';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ProductImages from './ProductImages';
import Spinner from './Spinner';
import { AddProduct, IncProduct, DecProduct } from '../features/cartSlice';
import { AddSubscriptionProduct, IncSubscriptionProduct, DecSubscriptionProduct } from '../features/subscriptionCartSlice';
import { toast } from 'react-toastify';
import { addToCart } from '../features/cartSlice';
import { addToSubscriptionCart } from '../features/subscriptionCartSlice';
import Loading from './Loading';
import { fetchSubsciptionOrdersAsync } from '../features/orderSlice';
import { API_URL, BASE_URL } from '../constants/contant';
import axios from "axios";


const ProductDetail = () => {
    const navigate = useNavigate();
    const [nextDay, setNextDay] = useState('');
    const [toggle, setToggle] = useState(false);
    const [qty, setQty] = useState(1);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user_id = useSelector((state) => state.auth.user_id);
    const productdetail = useSelector((state) => state.productdetail.product);
    const productdetail_status = useSelector((state) => state.productdetail.status);
    const cart_status = useSelector((state) => state.cart.status);
    const subscription_cart_status = useSelector((state) => state.subscription_cart.status);
    const [selectedSubscription, setSelectedSubscription] = useState("");
    console.log(selectedSubscription,"dsfvdfb")
    const cart_items = useSelector((state) => state.cart.cart);
    const subscription_cart_items = useSelector((state) => state.subscription_cart.subscription_cart)
    const subscription_orders = useSelector(state => state.orders.subscription_orders);
    const [existsSubscriptionProduct, setExistsSubscriptionProduct] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [reason, setReason] = useState("");

    const handleCancelSubscription = async () => {
        if (!reason) {
            toast.error("Please Select Reason")
        }
        try {
            const data = {
                status: "CANCELLEDBYCUSTOMER",
                reason: reason
            }
            const res = await axios.put(
                `${BASE_URL}${API_URL.CANCEL_ORDER}${existsSubscriptionProduct._id}`,
                data
            );
            const result = res.data;
            const { baseResponse, response } = result;
            if (baseResponse.status == 1) {
                toast.success("Subscription Cancel Successfully");
                setReason("");
                dispatch(fetchSubsciptionOrdersAsync(user_id));
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    const handleRadioChange = (e) => {
        setSelectedSubscription(e.target.value);
    };
    const convertDateFormat = (dateString) => {
        let [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    const handleAddToCart = async (product) => {
        if (!(productdetail.stock > 0)) {
            return toast.error("Product Currently Not Available")
        }
        const date = convertDateFormat(nextDay);
        if (product.subscription_active) {
            if (isLoggedIn) {
                const producttosubscriptioncart = {
                    productwithdates: {
                        subscribed_type: selectedSubscription,
                        start_date: date,
                        membership_offer: product.membership_offer,
                        regularPrice: product.regularPrice,
                        subscription_dates: []
                    }
                }
                dispatch(addToSubscriptionCart({ product_id: product._id, user_id, producttosubscriptioncart }));
                toast.success("Item added to cart");
            } else {
                dispatch(AddSubscriptionProduct(product));
                setToggle(true);
                toast.success("Item added to subscription cart");
            }
        }
        else {
            if (isLoggedIn) {
                const producttocart = {
                    productwithdates: {
                        subscribed_type: selectedSubscription,
                        start_date: date,
                        membership_offer: product.membership_offer,
                        regularPrice: product.regularPrice,
                        subscription_dates: []
                    }
                }
                dispatch(addToCart({ product_id: product._id, user_id, producttocart }));
                toast.success("Item added to cart");
            } else {
                dispatch(AddProduct(product));
                setToggle(true);
                toast.success("Item added to cart");
            }
        }
    }
    const handleIncrement = async (product) => {
        if (product.subscription_active) {
            if (isLoggedIn) {
                try {
                    const producttosubscriptioncart = {
                        inc: true
                    }
                    dispatch(addToSubscriptionCart({ product_id: product._id, user_id, producttosubscriptioncart }));
                } catch (error) {
                    console.log(error);
                    toast.error("Internal server error");
                }
            } else {
                dispatch(IncSubscriptionProduct(product));
                setQty(qty + 1);
            }
        } else {
            if (isLoggedIn) {
                try {
                    const producttocart = {
                        inc: true
                    }
                    dispatch(addToCart({ product_id: product._id, user_id, producttocart }));
                } catch (error) {
                    console.log(error);
                    toast.error("Internal server error");
                }
            } else {
                dispatch(IncProduct(product));
                setQty(qty + 1);
            }
        }
    }
    const handleDecrement = async (product) => {
        if (product.subscription_active) {
            if (isLoggedIn) {
                const producttosubscriptioncart = {
                    dec: true
                }
                dispatch(addToSubscriptionCart({ product_id: product._id, user_id, producttosubscriptioncart }));
            } else {
                dispatch(DecSubscriptionProduct(product));
                setQty(qty - 1);
            }
        } else {
            if (isLoggedIn) {
                const producttocart = {
                    dec: true
                }
                dispatch(addToCart({ product_id: product._id, user_id, producttocart }));
            } else {
                dispatch(DecProduct(product));
                setQty(qty - 1);
            }
        }
    }
    const handleDateChange = (event) => {
        setNextDay(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchProductDetailAsync(id));
        dispatch(fetchSubsciptionOrdersAsync(user_id));
        setNextDay(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart_items));
        localStorage.setItem("subscription_cart", JSON.stringify(subscription_cart_items));
    }, [cart_items, subscription_cart_items]);

    useEffect(() => {
        if (!existsSubscriptionProduct && productdetail && productdetail.subscription_type && productdetail.subscription_type.length > 0) {
            setSelectedSubscription(productdetail.subscription_type[0].split(",")[0]);
        }
    }, [productdetail]);

    useEffect(() => {
        if (productdetail.subscription_active) {
            const isExists = subscription_cart_items.find((item) => item._id === productdetail._id);
            if (isExists) {
                setToggle(true);
                setQty(isExists.selQty);
            } else {
                setToggle(false);
                setQty(1);
            }
        } else {
            const isExists = cart_items.find((item) => item._id === productdetail._id);
            if (isExists) {
                setToggle(true);
                setQty(isExists.selQty);
            } else {
                setToggle(false);
                setQty(1);
            }
        }
    }, [cart_items, subscription_cart_items, productdetail])

    useEffect(() => {
        if (productdetail.subscription_active) {
            const isExists = subscription_orders.find((item) => item?.product[0]?.id === productdetail._id);
            if (isExists) {
                setExistsSubscriptionProduct(isExists);
                setSelectedSubscription(isExists.deliveryType);
            }
        }
    }, [subscription_orders])
    return (
        <>
            {productdetail_status === "loading" ?
                <Spinner /> :
                <div className="container-fluid product_detail">
                    <div className="container-fluid breadcrumb py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                                        <ol className="breadcrumb m-0 d-flex justify-content-center">
                                            <li className="breadcrumb-item">
                                                <NavLink to="/" className='text-decoration-underline'>Home</NavLink>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <NavLink to="/product-list" className='text-decoration-underline'>All Products</NavLink>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Product Detail
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <ProductImages images={productdetail.productImage} />
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h3 className="fw-semibold mb-1">{productdetail?.name}</h3>
                                    <div>
                                        <span className="label_detail">{productdetail.productType}</span>
                                    </div>
                                </div>
                                {
                                    !(productdetail.stock > 0) && <p className='pb-1 text-danger'>Currently not available</p>
                                }
                                <p className='text-dark fw-semibold pb-1'>{productdetail.unit_value} {productdetail.unit}</p>
                                <div>
                                    <div className="d-flex align-items-center">
                                        <p className="me-2 fs-4 prim_color">
                                            <span className="currency-symbol prim_color"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value prim_color">{productdetail.price}</span>
                                        </p>
                                        <p className="fs-5">
                                            <span className="del_line">
                                                <span className="currency-symbol text-secondary"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value">{productdetail.regularPrice}</span>
                                            </span>
                                            <span className="fs-6 text-secondary"> {`${((productdetail.regularPrice - productdetail.price) / productdetail.regularPrice * 100).toFixed(2)}% off`} </span>
                                        </p>
                                    </div>
                                    <p className='d-flex align-items-center text-secondary'>You are saving  <span className="currency-symbol text-secondary px-1"><i class="fa fa-inr" aria-hidden="true"></i></span> {(productdetail.regularPrice - productdetail.price).toFixed(2)}</p>
                                </div>
                                <div class="product-ratting py-1">
                                    <ul className="d-flex align-items-cente p-0 m-0">
                                        <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                        <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                        <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                        <li><a href="#" tabindex="0"><i class="fa fa-star-half"></i></a></li>
                                    </ul>
                                </div>
                                {
                                    productdetail.subscription_active && <div className='start_date pt-1 pb-3'>
                                    <p className='fw-semibold fs-6 text-dark mb-2'>Start Date:</p>
                                    <input
                                        type='date'
                                        className='custom-date-input bg-dark py-2 px-3 text-white rounded-1'
                                        value={nextDay}
                                        onChange={handleDateChange}
                                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                                    />
                                </div>
                                }
                                <div className="choose_Subs mt-2">
                                    <p className='fw-semibold fs-6 text-dark'>Subscription Type</p>

                                    <ul className="select_check_user p-0 mt-2">
                                        {
                                            productdetail.subscription_type && productdetail.subscription_type.length > 0 && (
                                                productdetail.subscription_type[0].split(",").map((item, index) => (
                                                    <li className='d-inline-block me-2 mb-2' key={index}>
                                                        <input
                                                            className="form-check-input d-none"
                                                            type="radio"
                                                            value={item.trim()}
                                                            id={`flexRadioDefault_${index}`}
                                                            checked={selectedSubscription === item.trim()}
                                                            onChange={handleRadioChange}
                                                        />
                                                        <label
                                                            className={"form-check-label check_list"}
                                                            htmlFor={`flexRadioDefault_${index}`}
                                                        >
                                                            {item.trim()}
                                                        </label>
                                                    </li>
                                                ))
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className="btn_wrapper mt-2 d-flex align-items-center">
                                    {
                                        !toggle ? (
                                            <button className="prim_color_bg text-white btn-effect-1" onClick={() => handleAddToCart(productdetail)}>Add to cart</button>
                                        ) : (
                                            <>
                                                <div className="cart_plus_minus my-3 position-relative">
                                                    <button className="dec qtybutton border-0" onClick={() => handleDecrement(productdetail)} disabled={qty <= 1}>-</button>
                                                    <input type='text' value={qty} className="cart-plus-minus-box" readOnly />
                                                    <button className="inc qtybutton border-0" onClick={() => handleIncrement(productdetail)} disabled={productdetail.stock <= qty}>+</button>
                                                    <div className='position-absolute'>
                                                        {cart_status === "loading" && <Loading />}
                                                        {subscription_cart_status === "loading" && <Loading />}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        productdetail.subscription_active && existsSubscriptionProduct ? (
                                            <>
                                                <button className="ms-2 cancelation_sub prim_color bg-white btn-effect-1" style={{border:"2px solid green"}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Cancel Subscription</button>
                                                <div
                                                    className="offcanvas offcanvas-bottom"
                                                    tabIndex={-1}
                                                    id="offcanvasBottom"
                                                    aria-labelledby="offcanvasBottomLabel"
                                                    style={{ height: "80%" }}
                                                >
                                                    <div className="offcanvas-header">
                                                        <h5 className="offcanvas-title" id="offcanvasBottomLabel">
                                                            Order Cancel
                                                        </h5>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="offcanvas"
                                                            aria-label="Close"
                                                        />
                                                    </div>
                                                    <div className="offcanvas-body small">
                                                        <div className="col-md-12 col-12">
                                                            <div className=''>
                                                                <div className='cancel_reason'>
                                                                    <div className='pb-2'>
                                                                        <p className='fs-6 text-dark'>Are you sure?</p>
                                                                        <p className='fs-6 text-dark'>Please choose reason for cancelling</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className="form-check ps-0 mb-0 py-2">
                                                                            <input
                                                                                className="form-check-input ms-0"
                                                                                type="radio"
                                                                                name="flexRadioDefault"
                                                                                id="choose1"
                                                                                value="Offer not applicable anymore"
                                                                                onChange={(e) => setReason(e.target.value)}
                                                                            />
                                                                            <label
                                                                                className="form-check-label ps-3"
                                                                                htmlFor="choose1"
                                                                            >
                                                                                Offer not applicable anymore
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check ps-0 mb-0 py-2">
                                                                            <input
                                                                                className="form-check-input ms-0"
                                                                                type="radio"
                                                                                name="flexRadioDefault"
                                                                                id="choose2"
                                                                                value="I am going out of a town"
                                                                                onChange={(e) => setReason(e.target.value)}
                                                                            />
                                                                            <label
                                                                                className="form-check-label ps-3"
                                                                                htmlFor="choose2"
                                                                            >
                                                                                I am going out of a town
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check ps-0 mb-0 py-2">
                                                                            <input
                                                                                className="form-check-input ms-0"
                                                                                type="radio"
                                                                                name="flexRadioDefault"
                                                                                id="choose3"
                                                                                value="I don't need this product anymore"
                                                                                onChange={(e) => setReason(e.target.value)}
                                                                            />
                                                                            <label
                                                                                className="form-check-label ps-3"
                                                                                htmlFor="choose3"
                                                                            >
                                                                                I don't need this product anymore
                                                                            </label>
                                                                        </div>
                                                                        <div className="form-check ps-0 mb-0 py-2">
                                                                            <input
                                                                                className="form-check-input ms-0"
                                                                                type="radio"
                                                                                name="flexRadioDefault"
                                                                                id="choose4"
                                                                                value="Order by mistake"
                                                                                onChange={(e) => setReason(e.target.value)}
                                                                            />
                                                                            <label
                                                                                className="form-check-label ps-3"
                                                                                htmlFor="choose4"
                                                                            >
                                                                                Order by mistake
                                                                            </label>
                                                                        </div>

                                                                    </div>
                                                                    <div className='mt-3'>
                                                                        <button className="prim_color_bg py-2 px-3 text-white btn-effect-1" onClick={handleCancelSubscription}>Cancel</button>
                                                                        <button className="ms-3 prim_color_bg py-2 px-3 text-white btn-effect-1" data-bs-dismiss="offcanvas" aria-label="Close">Don't cancel</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            productdetail.subscription_active && toggle && (
                                                <button className="ms-2 prim_color_bg text-white btn-effect-1" onClick={() => { navigate(`/subscription-checkout/${productdetail._id}`) }}>Checkout</button>
                                            )
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 product_detail_tabs">
                                <ul class="nav nav-pills mb-3 p-0" id="pills-tab" role="tablist">
                                    <li class="nav-item me-md-5 me-3" role="presentation">
                                        <button class="nav-link active fs-5" id="pills-description-tab" data-bs-toggle="pill" data-bs-target="#pills-description" type="button" role="tab" aria-controls="pills-description" aria-selected="true">Description</button>
                                    </li>
                                    {/* <li class="nav-item me-md-5 me-3" role="presentation">
                                        <button class="nav-link fs-5" id="pills-information-tab" data-bs-toggle="pill" data-bs-target="#pills-information" type="button" role="tab" aria-controls="pills-information" aria-selected="false">Information</button>
                                    </li>
                                    <li class="nav-item me-md-5 me-3" role="presentation">
                                        <button class="nav-link fs-5" id="pills-reviews-tab" data-bs-toggle="pill" data-bs-target="#pills-reviews" type="button" role="tab" aria-controls="pills-reviews" aria-selected="false">Reviews</button>
                                    </li> */}
                                </ul>
                                <div class="tab-content mt-4" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab" tabindex="0">
                                        <div className="col-12">
                                            <div className="desc_content">
                                                <p className="fs-6 py-1" dangerouslySetInnerHTML={{ __html: productdetail.description }}></p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="tab-pane fade" id="pills-information" role="tabpanel" aria-labelledby="pills-information-tab" tabindex="0">
                                        <div className="col-12">
                                            <div className="table-responsive">
                                                <table class="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">First</th>
                                                            <th scope="col">Last</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Mark</td>
                                                            <td>Otto</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jacob</td>
                                                            <td>Thornton</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Jacob</td>
                                                            <td>@twitter</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-reviews" role="tabpanel" aria-labelledby="pills-reviews-tab" tabindex="0">
                                        <div className="col-12">
                                            <div className="reviews_box">
                                                <div className="head_rewis pb-4">
                                                    <h6 className="fw-semibold">Customer reviews</h6>
                                                    <div class="product-ratting">
                                                        <div className='d-flex align-items-center'>
                                                            <ul className="d-flex align-items-cente p-0 m-0">
                                                                <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                <li><a href="#" tabindex="0"><i class="fa fa-star-half"></i></a></li>
                                                            </ul>
                                                            <span className='ms-1 prim_color'>(95 reviews)</span>
                                                        </div>
                                                        <p className='text-secondary'>8 global ratings</p>
                                                    </div>
                                                </div>
                                                <div className="client_reviews pt-4">
                                                    <div className="row gy-5">
                                                        <div className="col-lg-6">
                                                            <div className="client_sec d-flex align-items-center pb-4 border-bottom">
                                                                <div className='col-3 client_img overflow-hidden'>
                                                                    <a href="#">
                                                                        <img src="/images/about.jpg" alt="" className="img-fluid" />
                                                                    </a>
                                                                </div>
                                                                <div className="client_content ms-3">
                                                                    <a href="#" className='fw-semibood'><h6 className='mb-1'>Abhishek Sharma</h6></a>
                                                                    <div class="product-ratting">
                                                                        <ul className="d-flex align-items-cente p-0 m-0">
                                                                            <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                            <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                            <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                            <li><a href="#" tabindex="0"><i class="fa fa-star-half"></i></a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <p className='text_clip_para'>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                                                                </div>
                                                            </div>
                                                            <div className="client_sec d-flex align-items-center pt-4">
                                                                <div className='col-3 client_img overflow-hidden'>
                                                                    <a href="#">
                                                                        <img src="/images/about.jpg" alt="" className="img-fluid" />
                                                                    </a>
                                                                </div>
                                                                <div className="client_content ms-3">
                                                                    <div className='d-md-flex align-items-center justify-content-between'>
                                                                        <a href="#" className='fw-semibood'><h6 className='mb-1'>Abhishek Sharma</h6></a>
                                                                        <div className='my-md-0 my-3'><span className='border px-3 py-2 rounded-pill date_review'>12 sep 2024</span></div>
                                                                    </div>
                                                                    <div class="product-ratting">
                                                                        <ul className="d-flex align-items-cente p-0 m-0">
                                                                            <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                            <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                            <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                            <li><a href="#" tabindex="0"><i class="fa fa-star-half"></i></a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <p className='text_clip_para'>Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="review_form">
                                                                <div className="review-details rounded-2 p-5">
                                                                    <h4 className="fw-bold mb-2">Add Your Review</h4>
                                                                    <div class="product-ratting d-flex align-items-center">
                                                                        <p className='text-dark me-2'>Your rating:</p>
                                                                        <ul className="d-flex align-items-cente p-0 m-0">
                                                                            <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                            <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                            <li className="me-1"><a href="#" tabindex="0"><i class="fa fa-star"></i></a></li>
                                                                            <li><a href="#" tabindex="0"><i class="fa fa-star-half"></i></a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <form className='mt-4' action="#">
                                                                        <div className="row">
                                                                            <div className="col-12">
                                                                                <div className="form-group mb-4">
                                                                                    <textarea className="form-control border-0 rounded-2" placeholder="Type Something here.." rows="5" id="comment"></textarea>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 mb-4">
                                                                                <input type="text" placeholder="Enter your name" className=" input-name border-0 p-3 w-100 position-relative" />
                                                                            </div>
                                                                            <div className="col-12 mb-4">
                                                                                <input type="text" placeholder="Enter email address" className="border-0 input-name p-3 w-100 position-relative" />
                                                                            </div>


                                                                            <div className="form-check my-4 d-flex align-items-center">
                                                                                <input className="form-check-input mt-0 me-2" type="checkbox" value="" id="flexCheckDefault" />
                                                                                <label className="form-check-label" style={{ fontSize: '14px' }} for="flexCheckDefault">
                                                                                    Save my name, email, and website in this browser for the next time I comment.
                                                                                </label>
                                                                            </div>
                                                                            <div>
                                                                                <button className="prim_color_bg text-white btn-effect-1">Submit</button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductDetail;
