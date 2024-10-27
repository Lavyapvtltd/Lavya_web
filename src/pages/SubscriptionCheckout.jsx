import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL, BASE_URL, API_URL, RAZORPAY_KEY_ID } from "../constants/contant";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import { fetchSubscriptionCartAsync } from "../features/subscriptionCartSlice";
import { updateProductStock } from "../features/productSlice";
import DeliveryAddress from "../components/DeliveryAddress";
import { fetchUserAsync, walletAmountAddition, walletAmountDeduction } from "../features/authSlice";
import { fetchFirstTimeRechargeAsync } from "../features/firstTimeRechargeSlice";
import Swal from "sweetalert2";
import { fetchOrdersAsync, fetchSubsciptionOrdersAsync } from "../features/orderSlice";

const SubscriptionCheckout = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const { user, user_id } = useSelector((state) => state.auth);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [packagingCharge, setPackagingCharge] = useState(0);
    const [wallet, setWallet] = useState(true);
    const [toggleRecharge, setToggleRecharge] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState("");
    const [loading, setLoading] = useState(false);
    const non_subscription_orders = useSelector(state => state.orders.orders);
    const subscription_orders = useSelector(state => state.orders.subscription_orders);
    const first_time_recharges = useSelector(state => state.firsttimerecharges.firsttimerecharges);
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

    const handleRechargeOfferClick = (offer) => {
        setSelectedOffer(offer);
        Swal.fire({
            html: `The additional amount for the number of days for which you are being offered free milk 
                   will be added to your wallet along with your recharge value.<br><br>
                   जितने दिनों के लिए आपको मुफ्त दूध की पेशकश की जा रही है, उतने दिनों की अतिरिक्त राशि 
                   आपके रिचार्ज मूल्य के साथ आपके वॉलेट में जोड़ दी जाएगी।`,
        });

    }

    const handleSkip = () => {
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

    const handleGetOffer = async () => {
        if (!selectedOffer) {
            return toast.error("Please select an offer");
        }
        try {
            setLoading(true);
            const data = {
                amount: selectedOffer?.value,
                currency: "INR",
                notes: "Recharge Wallet",
                type: "web"
            }
            const res = await axios.post(
                `${BASE_URL}${API_URL.WALLET_RECHARGE}${user_id}`,
                data
            );
            const result = res.data;
            const { baseResponse, order } = result;
            if (baseResponse.status == 1) {
                setLoading(false);
                const options = {
                    key: RAZORPAY_KEY_ID,
                    amount: order.amount,
                    currency: order.currency,
                    name: 'Lavya Organic Foods',
                    description: '',
                    order_id: order.id,
                    handler: async function (response) {
                        try {
                            let payment = selectedOffer?.value + selectedOffer?.cashback
                            const data = {
                                amount: payment
                            }
                            dispatch(walletAmountAddition({ user_id, data }));
                            navigate(`/recharge-success?id=${order.id}`)
                        } catch (error) {
                            toast.error("Something went wrong");
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.phone
                    },
                    notes: {
                        address: "Lavya Organic Foods Corporate Office"
                    },
                    theme: {
                        color: "#3399cc"
                    },
                    modal: {
                        ondismiss: async function () {
                            toast.error("Transaction cancelled")
                        }
                    }
                };
                console.log(options)
                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong");
        }
    }

    const handleOrderPlace = async () => {
        if (!address) {
            return toast.error("Please select address");
        }
        if (user.walletBalance < total) {
            if (non_subscription_orders.length === 0 || subscription_orders.length === 0) {
                setToggleRecharge(true);
            } else {
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
                    setLoading(false);
                    toast.success("Order Subscribed Successfully");
                    const data = {
                        amount: total
                    }
                    dispatch(walletAmountDeduction({ user_id, data }));
                    dispatch(updateProductStock({ productId: subscription_cart_item.id, qty: subscription_cart_item.selQty }));
                    setTimeout(() => {
                        navigate(`/order-success?order_no=${response.order_no}`)
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
            dispatch(fetchUserAsync(user_id));
            dispatch(fetchSubscriptionCartAsync(user_id));
            dispatch(fetchOrdersAsync(user_id));
            dispatch(fetchSubsciptionOrdersAsync(user_id));
        }
    }, [dispatch, user_id]);
    const calculateTotal = () => {
        const tot = subscription_cart_item.price * subscription_cart_item.selQty;
        setSubTotal(tot);
        const pay = tot + deliveryCharge + packagingCharge;
        setTotal(pay);
    };

    useEffect(() => {
        calculateTotal();
    }, [subscription_cart_item]);
    useEffect(() => {
        dispatch(fetchFirstTimeRechargeAsync());
    }, [])
    return (
        <>
            {
                !toggleRecharge ? (
                    <div className="container-fluid checkout-section py-5">
                        <div className="container">
                            <div className="row">
                                <DeliveryAddress setAddress={setAddress} />
                                <div className="col-lg-6 col-md-6 col-12">
                                    {
                                        subscription_cart_item ? (
                                            <>
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
                                                                    <div className="text-secondary fw-semibold">
                                                                        {`${subscription_cart_item.unitValue} ${subscription_cart_item.unit}`} x {subscription_cart_item.selQty}
                                                                    </div>
                                                                    <div>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="me-2 fs-4 prim_color">
                                                                                <span className="currency-symbol prim_color"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value prim_color">{subscription_cart_item.price}</span>
                                                                            </p>
                                                                            <p className="fs-5">
                                                                                <span className="del_line">
                                                                                    <span className="currency-symbol text-secondary"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value">{subscription_cart_item.regularPrice}</span>
                                                                                </span>
                                                                                <span className="fs-6 text-secondary"> {`${((subscription_cart_item.regularPrice - subscription_cart_item.price) / subscription_cart_item.regularPrice * 100).toFixed(2)}% off`} </span>
                                                                            </p>
                                                                        </div>
                                                                        <p className='d-flex align-items-center text-secondary'>You are saving  <span className="currency-symbol text-secondary px-1"><i class="fa fa-inr" aria-hidden="true"></i></span> {(subscription_cart_item.regularPrice - subscription_cart_item.price).toFixed(2)}</p>
                                                                    </div>
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
                                                                            <td>Rs {deliveryCharge}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Packaging Charges</td>
                                                                            <td>Rs {packagingCharge}</td>
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
                                                <div className="col-12 mt-5">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={wallet} onChange={(e) => { setWallet(e.target.checked) }} />
                                                            <label className="form-check-label ms-2 fw-semibold" for="flexCheckChecked">
                                                                Wallet Balance
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <p class="me-2 fs-6 prim_color d-flex align-items-center"><span class="currency-symbol prim_color pe-1"><i class="fa fa-inr" aria-hidden="true"></i></span> <span class="currency-value prim_color">{user.walletBalance}</span></p>
                                                        </div>
                                                    </div>
                                                    {user.walletBalance < subTotal && (
                                                        <div className="mt-2 text-danger">
                                                            Insufficient wallet balance.
                                                        </div>
                                                    )}
                                                </div>
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
                                                {loading && <div className="spinner-border me-2" style={{ borderWidth: '3px', height: '1rem', width: '1rem' }} role="status">
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
                ) : (
                    <div className="container-fluid recharge_offer_sec py-5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7 col-md-9 col-12">
                                    <div className="row gy-3 justify-content-center">
                                        {
                                            first_time_recharges?.map((item, index) => (
                                                <div className="col-12" key={index} onClick={() => { handleRechargeOfferClick(item) }}>
                                                    <div className="recharge_box">
                                                        <h5 className='fw-semibold'>{item?.name}</h5>
                                                        <div className='mt-3 d-flex justify-content-between align-items-center'>
                                                            <div>
                                                                <button className='prim_color_bg text-white btn-effect-1 px-3 py-1'><i class="fa fa-inr" aria-hidden="true"></i>{item?.value}</button>
                                                            </div>
                                                            <div>
                                                                <p className='text-secondary'>Valid for {item?.validity} days</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='mt-3 d-flex justify-content-between align-items-center w-100'>
                                        <button type='button' className='recharge_btn bg-white btn-effect-1 prim_color' onClick={handleSkip}>Skip</button>
                                        <button type='button' className='prim_color_bg text-white btn-effect-1' onClick={handleGetOffer}>  {loading && <div className="spinner-border me-2" style={{ borderWidth: '3px', height: '1rem', width: '1rem' }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}get Offer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SubscriptionCheckout;
