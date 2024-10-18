import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL, BASE_URL, API_URL } from "../constants/contant";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import { fetchSubscriptionCartAsync } from "../features/subscriptionCartSlice";
import { updateProductStock } from "../features/productSlice";
import DeliveryAddress from "../components/DeliveryAddress";
import { walletAmountDeduction } from "../features/authSlice";
const SubscriptionCheckout = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const { user, user_id } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const subscription_cart_items = useSelector((state) => state.subscription_cart.subscription_cart);
    const product = subscription_cart_items?.map((cart_item) => {
        return {
            id: cart_item._id,
            name: cart_item.name,
            image: cart_item.productImage,
            price: cart_item.price,
            unitValue: cart_item.unit_value,
            unit: cart_item.unit,
            subscription_type: cart_item.subscribed_type,
            start_date: cart_item.start_date,
            subscription_dates: [],
            selQty: cart_item.selQty,
            regularPrice: cart_item.regularPrice,
            subscription_active: cart_item.subscription_active,
            membership_offer: cart_item.membership_offer,
            icon: cart_item.icon,
            sgst: cart_item.sgst,
            cgst: cart_item.cgst,
            igst: cart_item.igst
        }
    })
    const subscription_cart_item = product.find((item) => item.id == id);
    const [address, setAddress] = useState("");

    const handleOrderPlace = async () => {
        if (!address) {
            return toast.error("Please select address");
        }
        if (user.walletBalance < total) {
            const data = {
                status: "SUBSCRIBED",
                orderPlace: "",
                product: [subscription_cart_item],
                shippingaddress: address,
                user: user,
                amount: total,
                orderId: "",
                deliveryDate: moment(subscription_cart_item.start_date, 'DD-MM-YYYY').format("Do MMM YY"),
                deliveryType: subscription_cart_item.subscription_type
            }
            navigate("/recharge", { state: { data: data } });
        }
        else {
            try {
                setLoading(true);
                const data = {
                    status: "SUBSCRIBED",
                    orderPlace: "",
                    product: [subscription_cart_item],
                    shippingaddress: address,
                    user: user,
                    amount: total,
                    orderId: "",
                    deliveryDate: moment(subscription_cart_item.start_date, 'DD-MM-YYYY').format("Do MMM YY"),
                    deliveryType: subscription_cart_item.subscription_type,
                    paymentOption: "Wallet",
                }
                const res = await axios.post(
                    `${BASE_URL}${API_URL.CREATE_SUBSCRIPTION_ORDER}`,
                    data
                );
                const result = res.data;
                const { baseResponse, response } = result;
                if (baseResponse.status == 1) {
                    toast.success("Order Subscribed Successfully");
                    const data = {
                        amount: total
                    }
                    dispatch(walletAmountDeduction({ user_id, data }));
                    dispatch(updateProductStock({ productId: subscription_cart_item.id, qty: subscription_cart_item.selQty }));
                    setLoading(false);
                    setTimeout(() => {
                        navigate("/")
                    }, 1000)
                } else {
                    setLoading(false);
                    toast.error(baseResponse.message);
                }
            } catch (error) {
                setLoading(false);
                toast.error("Something went wrong");
            }
        }
    };

    useEffect(() => {
        if (user_id) {
            dispatch(fetchSubscriptionCartAsync(user_id));
        }
    }, [dispatch, user_id]);
    const calculateTotal = () => {
        const tot = subscription_cart_item.price * subscription_cart_item.selQty;
        setSubTotal(tot);
        setTotal(tot);
    };

    useEffect(() => {
        calculateTotal();
    }, [subscription_cart_item]);
    return (
        <>
            <div className="container-fluid checkout-section py-5">
                <div className="container">
                    <div className="row">
                        <DeliveryAddress setAddress={setAddress} />
                        <div className="col-lg-6 col-md-6 col-12">
                            {
                                subscription_cart_item ? (
                                    <div className="col-12">
                                        <div className="card_total_box p-5">
                                            <div className="d-flex justify-content-between">
                                                <h5 className="fw-semibold">Your order</h5>
                                                <p className="fw-semibold text-secondary">Subtotal</p>
                                            </div>
                                            <div className="order_place_check py-2">
                                                <div className="d-flex align-items-center border rounded-1 p-3">
                                                    <div className="col-lg-3 col-md-3 col-4 border rounded-1 p-1 overflow-hidden img_hover position-relative">
                                                        <img
                                                            src={`${IMAGE_BASE_URL}${subscription_cart_item.icon}`}
                                                            className="img-fluid"
                                                            alt={subscription_cart_item.name}
                                                        />
                                                    </div>
                                                    <div className="ps-3">
                                                        <h6 className="text_clip_head fw-semibold mb-1">
                                                            {subscription_cart_item.name}
                                                        </h6>
                                                        <div className="product-ratting d-flex align-items-center">
                                                            <ul className="d-flex align-items-center p-0 m-0">
                                                                <li className="me-1">
                                                                    <a href="#" tabIndex={0}>
                                                                        <i className="fa fa-star" />
                                                                    </a>
                                                                </li>
                                                                <li className="me-1">
                                                                    <a href="#" tabIndex={0}>
                                                                        <i className="fa fa-star" />
                                                                    </a>
                                                                </li>
                                                                <li className="me-1">
                                                                    <a href="#" tabIndex={0}>
                                                                        <i className="fa fa-star" />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a href="#" tabIndex={0}>
                                                                        <i className="fa fa-star-half" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <p className="text-secondary ps-1">(4.0)</p>
                                                        </div>
                                                        <div className="text-secondary fw-semibold">
                                                            {`${subscription_cart_item.unitValue} ${subscription_cart_item.unit}`} x {subscription_cart_item.selQty}
                                                        </div>
                                                        <h6 className="price_txt prim_color fw-semibold">
                                                            Rs {subscription_cart_item.price}
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table mt-2">
                                                        <tbody>
                                                            <tr>
                                                                <td>Subtotal</td>
                                                                <td>Rs {subTotal}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delivery Charges</td>
                                                                <td>Rs 00.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Packaging Charges</td>
                                                                <td>Rs 00.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <strong>Order Total</strong>
                                                                </td>
                                                                <td>
                                                                    <strong>Rs {total}</strong>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-md-8 col-12">
                                            <img src="/images/cart-empty.png" alt="" className="img-fluid w-100" />
                                            <div className="col-12 text-center mt-2">
                                                <h3 className='fw-semibold'>Your Cart is empty</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="submit-btn mt-3 text-center">
                                                    <NavLink to="/" className="prim_color_bg text-white btn-effect-1">
                                                        Back to Home
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="col-12 mt-3">
                                <p className="mt-3">
                                    Your personal data will be used to process your order, support
                                    your experience throughout this website, and for other
                                    purposes described in our privacy policy.
                                </p>
                                <div className="submit-btn mt-3">
                                    <button
                                        disabled={loading}
                                        className="prim_color_bg text-white btn-effect-1 d-flex align-items-center justify-content-center"
                                        onClick={handleOrderPlace}
                                    >
                                        {loading && <div className="spinner-border me-2" style={{borderWidth:'3px',height:'1rem',width:'1rem'}} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}
                                        Subscribed Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubscriptionCheckout;
