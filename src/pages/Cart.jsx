import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { IMAGE_BASE_URL } from '../constants/contant';
import { IncProduct, DecProduct, DeleteProduct, fetchCartsAsync } from '../features/cartSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { addToCart, deleteToCart } from '../features/cartSlice';
import Checkout from './Checkout';
import Loading from '../components/Loading';
const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart_items = useSelector((state) => state.cart.cart);
    const cart_status = useSelector((state) => state.cart.status);
    const subscription_cart_status = useSelector((state) => state.subscription_cart.subscription_cart);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user_id = useSelector((state) => state.auth.user_id);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [packagingCharge, setPackagingCharge] = useState(0);
    const freeDeliveryAmount = 1199;
    const handleIncrement = (product) => {
        if (isLoggedIn) {
            const producttocart = {
                inc: true
            }
            dispatch(addToCart({ product_id: product._id, user_id, producttocart }));
        }
        else {
            dispatch(IncProduct(product));
        }
    }
    const handleDecrement = (product) => {
        if (isLoggedIn) {
            const producttocart = {
                dec: true
            }
            dispatch(addToCart({ product_id: product._id, user_id, producttocart }));
        }
        else {
            dispatch(DecProduct(product));
        }
    }
    const handleDeleteCart = (product) => {
        if (isLoggedIn) {
            dispatch(deleteToCart({ product_id: product._id, user_id }));
        }
        else {
            dispatch((DeleteProduct(product)));
        }
    }

    const handleCheckOut = () => {
        if (isLoggedIn) {
            navigate("/checkout");
        } else {
            navigate("/login");
        }
    }

    const calculateTotal = () => {
        // Calculate subtotal
        let tot = 0;
        cart_items.forEach((item) => {
            tot += item.price * item.selQty;
        });
    
        // Calculate delivery charge
        let deliveryCharge = 0;
        if (tot < freeDeliveryAmount) {
            cart_items.forEach((item) => {
                deliveryCharge += 50 * item.selQty;
            });
        }
    
        // Calculate total amount to be paid
        const pay = tot + deliveryCharge + packagingCharge;
    
        // Update state
        setSubTotal(tot);
        setDeliveryCharge(deliveryCharge);
        setTotal(pay);
    };
    
    useEffect(() => {
        calculateTotal();
        localStorage.setItem("cart", JSON.stringify(cart_items));
    }, [cart_items]);
    

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchCartsAsync(user_id));
        }
    }, [])
    return (
        <>
            <div className="container-fluid cart-section py-5">
                <div className="container">
                    {
                        cart_items.length > 0 ? (
                            <>
                                <div className="row">
                                    <div className="col-lg-8 col-12">
                                        <div className="col-12">

                                            {
                                                cart_items?.map((item) => (
                                                    <div className="d-flex align-items-center border rounded-1 p-3 cart_product_check" >
                                                        <div className="col-lg-3 col-md-3 col-3 border rounded-1 p-1 overflow-hidden img_hover position-relative">
                                                            <img src={`${IMAGE_BASE_URL}${item.icon}`} alt="product-img" className="img-fluid" />
                                                        </div>
                                                        <div className="ps-3 w-100">
                                                            <div className="d-flex justify-content-between w-100">
                                                                <div>
                                                                    <h6 className="text_clip_head fw-semibold mb-1" onClick={() => navigate(`/product-list/${item._id}`)}>
                                                                        {item.name}
                                                                    </h6>
                                                                    <p className='text-dark fw-semibold pb-1'>{item.unit_value} {item.unit}</p>
                                                                    <p>only {item.stock} left in stock-order soon</p>
                                                                </div>
                                                                <div onClick={() => handleDeleteCart(item)}><i class="fa fa-trash-o text-danger fs-5" aria-hidden="true"></i></div>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <p className="me-2 prim_color d-flex align-items-center">
                                                                    <span className="currency-symbol prim_color pe-1"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value prim_color">{item.price}</span>
                                                                </p>
                                                                <p className="d-flex align-items-center">
                                                                    <span className="del_line">
                                                                        <span className="currency-symbol text-secondary"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value">{item.regularPrice}</span>
                                                                    </span>
                                                                    <span className="ps-1 text-secondary"> {`${((item.regularPrice - item.price) / item.regularPrice * 100).toFixed(2)}% off`} </span>
                                                                </p>
                                                            </div>
                                                            <div className='d-md-flex align-items-center justify-content-between'>
                                                                <p className='d-flex align-items-center text-secondary'>You are saving  <span className="currency-symbol text-secondary px-1"><i class="fa fa-inr" aria-hidden="true"></i></span>{((item.regularPrice - item.price) * item.selQty).toFixed(2)}</p>
                                                                <div className="cart_plus_minus position-relative">
                                                                    <button className="dec qtybutton border-0" onClick={() => handleDecrement(item)} disabled={item.selQty <= 1}>-</button>
                                                                    <input type='text' value={item.selQty} className="cart-plus-minus-box" />
                                                                    <button className="inc qtybutton border-0" onClick={() => handleIncrement(item)} disabled={item.stock <= item.selQty}>+</button>
                                                                    <div className='position-absolute'>
                                                                        {cart_status == "loading" && <Loading />}
                                                                        {subscription_cart_status == "loading" && <Loading />}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12 pt-lg-0 pt-md-5 pt-5">
                                        <div className="cart_totals shadow rounded-1 p-4">
                                            <h4 className="ps-2 fw-semibold">Cart Totals</h4>
                                            <table className="table mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>Cart Subtotal</td>
                                                        <td>Rs {subTotal}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Delivery Charges</td>
                                                        <td>Rs {deliveryCharge}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>Packaging Charges</td>
                                                        <td>Rs {packagingCharge}</td>
                                                    </tr> */}
                                                    <tr>
                                                        <td><strong>Order Total</strong></td>
                                                        <td><strong>Rs {total}</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="coupon-button text-center" style={{ cursor: "pointer" }} onClick={handleCheckOut}>
                                                <div className="text-white text-decoration-none fw-bold">Proceed to checkout</div>
                                            </div>
                                            {freeDeliveryAmount > subTotal && (
                                                <div className="m-2" style={{ color: "#309a20" }}>
                                                    Add items worth {freeDeliveryAmount - subTotal} to unlock free delivery
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row mt-5">
                                    <div className="col-12 d-md-flex d-block justify-content-between align-items-center">
                                        <div className="d-flex align-items-center ">
                                            <div className="pe-3">

                                                <input type="email" className="form-control rounded-0 p-3" id="exampleFormControlInput1" placeholder="Coupon Code" />
                                            </div>
                                            <div>
                                                <button className="border-0 coupon-button text-white fw-bold">Apply Coupon</button>
                                            </div>
                                        </div>
                                        <div className=" pt-md-0 pt-3">
                                            <button className="update-btn text-white">Update Cart</button>
                                        </div>
                                    </div>
                                </div> */}
                            </>
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
                </div>
            </div>
        </>
    )
}

export default Cart
