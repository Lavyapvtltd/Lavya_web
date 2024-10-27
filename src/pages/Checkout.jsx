import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL, BASE_URL, API_URL, RAZORPAY_KEY_ID } from "../constants/contant";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { fetchCartsAsync } from "../features/cartSlice";
import { fetchUserAsync, walletAmountDeduction } from "../features/authSlice";
import { updateProductStock } from "../features/productSlice";
import DeliveryAddress from "../components/DeliveryAddress";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const freeDeliveryAmount = 1199;
    const { user, user_id, isLoggedIn } = useSelector((state) => state.auth);
    const cart_items = useSelector((state) => state.cart.cart);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [flexRadioDefault, setFlexRadioDefault] = useState("");
    const [finalTotal, setFinalTotal] = useState(total);
    const [address, setAddress] = useState("");
    const [wallet, setWallet] = useState(false);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [packagingCharge, setPackagingCharge] = useState(0);
    const [loading, setLoading] = useState(false);
    const product = cart_items?.map((cart_item) => {
        return {
            id: cart_item._id,
            name: cart_item.name,
            image: cart_item.productImage,
            quantity: cart_item.selQty,
            price: cart_item.price,
            unitValue: cart_item.unit_value,
            unit: cart_item.unit,
            subscription_type: cart_item.subscribed_type,
            start_date: cart_item.start_date,
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
    const handleOrderPlace = async () => {
        if (!address) {
            return toast.error("Please select address");
        }
        if (wallet) {
            if (finalTotal == 0) {
                try {
                    const data = {
                        status: "ORDERED",
                        orderPlace: "",
                        product: product,
                        shippingaddress: address,
                        user: user,
                        amount: total,
                        deliveryDate: moment(product[0].start_date, 'DD-MM-YYYY').format("Do MMM YY"),
                        deliveryType: product[0].subscription_type,
                        paymentOption: "Wallet",
                        walletDeductedAmount: "Full",
                        type: "web"
                    }
                    setLoading(true);
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, savedorder } = result;
                    if (baseResponse.status == 1) {
                        const data = {
                            amount: total
                        }
                        dispatch(walletAmountDeduction({ user_id, data }));
                        product.forEach((item) => {
                            dispatch(updateProductStock({ productId: item.id, qty: item.selQty }));
                        })
                        toast.success("Order Created Successfully");
                        setLoading(false);
                        setTimeout(() => {
                            navigate(`/order-success?order_no=${savedorder.order_no}`)
                        }, 1000);
                    } else {
                        setLoading(false);
                        toast.error(baseResponse.message);
                    }
                } catch (error) {
                    setLoading(false);
                    toast.error("Something went wrong");
                }
            }
            else if (flexRadioDefault == "Cash on delivery") {
                if (!flexRadioDefault) {
                    return toast.error("Please select payment type");
                }
                const deducted_amount = total - finalTotal;
                try {
                    setLoading(true);
                    const data = {
                        status: "ORDERED",
                        orderPlace: "",
                        product: product,
                        shippingaddress: address,
                        user: user,
                        amount: finalTotal,
                        deductedWalletAmount: deducted_amount,
                        deliveryDate: moment(product[0].start_date, 'DD-MM-YYYY').format("Do MMM YY"),
                        deliveryType: product[0].subscription_type,
                        paymentOption: flexRadioDefault,
                        walletDeductedAmount: deducted_amount,
                        type: "web"
                    }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, savedorder } = result;
                    if (baseResponse.status == 1) {
                        const data = {
                            amount: deducted_amount
                        }
                        dispatch(walletAmountDeduction({ user_id, data }));
                        product.forEach((item) => {
                            dispatch(updateProductStock({ productId: item.id, qty: item.selQty }));
                        })
                        toast.success("Order Created Successfully");
                        setLoading(false);
                        setTimeout(() => {
                            navigate(`/order-success?order_no=${savedorder.order_no}`)
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
            else {
                if (!flexRadioDefault) {
                    return toast.error("Please select payment type");
                }
                const deducted_amount = total - finalTotal;
                try {
                    setLoading(true);
                    const data = {
                        status: "PROCCESSING",
                        orderPlace: "",
                        product: product,
                        shippingaddress: address,
                        user: user,
                        amount: finalTotal,
                        deductedWalletAmount: deducted_amount,
                        deliveryDate: moment(product[0].start_date, 'DD-MM-YYYY').format("Do MMM YY"),
                        deliveryType: product[0].subscription_type,
                        paymentOption: flexRadioDefault,
                        walletDeductedAmount: deducted_amount,
                        type: "web"
                    }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, order, savedorder } = result;
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
                                    const data = { status: "ORDERED", paymentStatus: "PAIDONLINE" };
                                    const res = await axios.patch(
                                        `${BASE_URL}${API_URL.UPDATE_ORDER_AND_PAYMENT_STATUS_BY_ORDER_ID}${savedorder.order_no}`,
                                        data
                                    );
                                    const result = res.data;
                                    const { baseResponse, response } = result;
                                    if (baseResponse.status == "1") {
                                        const data = {
                                            amount: savedorder.walletDeductedAmount
                                        }
                                        dispatch(walletAmountDeduction({ user_id, data }));
                                        product.forEach((item) => {
                                            dispatch(updateProductStock({ productId: item.id, qty: item.selQty }));
                                        })
                                        navigate(`/order-success?order_no=${savedorder.order_no}`);
                                    }
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
                                    try {
                                        const data = { status: "FAILED", paymentStatus: "FAILED" };
                                        const res = await axios.patch(
                                            `${BASE_URL}${API_URL.UPDATE_ORDER_AND_PAYMENT_STATUS_BY_ORDER_ID}${savedorder.order_no}`,
                                            data
                                        );
                                        const result = res.data;
                                        const { baseResponse, response } = result;
                                        if (baseResponse.status == "1") {
                                            toast.error("Order cancelled")
                                        }
                                    } catch (error) {
                                        toast.error("Something went wrong");
                                    }
                                }
                            }
                        };
                        const rzp = new window.Razorpay(options);
                        rzp.open();
                    } else {
                        setLoading(false);
                        toast.error(baseResponse.message);
                    }
                } catch (error) {
                    setLoading(false);
                    toast.error("Something went wrong");
                }
            }
        } else {
            if (!flexRadioDefault) {
                return toast.error("Please select payment type");
            }
            if (flexRadioDefault == "Cash on delivery") {
                try {
                    const data = {
                        status: "ORDERED",
                        orderPlace: "",
                        product: product,
                        shippingaddress: address,
                        user: user,
                        amount: finalTotal,
                        deliveryDate: moment(product[0].start_date, 'DD-MM-YYYY').format("Do MMM YY"),
                        deliveryType: product[0].subscription_type,
                        paymentOption: flexRadioDefault,
                        walletDeductedAmount: 0,
                        type: "web"
                    }
                    setLoading(true);
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, savedorder } = result;
                    if (baseResponse.status == 1) {
                        toast.success("Order Created Successfully");
                        product.forEach((item) => {
                            dispatch(updateProductStock({ productId: item.id, qty: item.selQty }));
                        })
                        setLoading(false);
                        setTimeout(() => {
                            navigate(`/order-success?order_no=${savedorder.order_no}`)
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
            else {
                try {
                    setLoading(true);
                    const data = {
                        status: "PROCCESSING",
                        orderPlace: "",
                        product: product,
                        shippingaddress: address,
                        user: user,
                        amount: finalTotal,
                        deductedWalletAmount: 0,
                        deliveryDate: moment(product[0].start_date, 'DD-MM-YYYY').format("Do MMM YY"),
                        deliveryType: product[0].subscription_type,
                        paymentOption: flexRadioDefault,
                        walletDeductedAmount: 0,
                        type: "web"
                    }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, order, savedorder } = result;
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
                                    const data = { status: "ORDERED", paymentStatus: "PAIDONLINE" };
                                    const res = await axios.patch(
                                        `${BASE_URL}${API_URL.UPDATE_ORDER_AND_PAYMENT_STATUS_BY_ORDER_ID}${savedorder.order_no}`,
                                        data
                                    );
                                    const result = res.data;
                                    const { baseResponse, response } = result;
                                    if (baseResponse.status == "1") {
                                        product.forEach((item) => {
                                            dispatch(updateProductStock({ productId: item.id, qty: item.selQty }));
                                        })
                                        navigate(`/order-success?order_no=${savedorder.order_no}`);
                                    }
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
                                    try {
                                        const data = { status: "FAILED", paymentStatus: "FAILED" };
                                        const res = await axios.patch(
                                            `${BASE_URL}${API_URL.UPDATE_ORDER_AND_PAYMENT_STATUS_BY_ORDER_ID}${savedorder.order_no}`,
                                            data
                                        );
                                        const result = res.data;
                                        const { baseResponse, response } = result;
                                        if (baseResponse.status == "1") {
                                            toast.error("Order cancelled")
                                        }
                                    } catch (error) {
                                        toast.error("Something went wrong");
                                    }
                                }
                            }
                        };
                        const rzp = new window.Razorpay(options);
                        rzp.open();
                    } else {
                        setLoading(false);
                        toast.error(baseResponse.message);
                    }
                } catch (error) {
                    setLoading(false);
                    toast.error("Something went wrong");
                }
            }
        }
    };
    useEffect(() => {
        if (wallet) {
            const payableAmount = finalTotal - user.walletBalance
            if (payableAmount < 0) {
                setFinalTotal(0)
            } else {
                setFinalTotal(payableAmount);
            }
        } else {
            setFinalTotal(total)
        }
    }, [wallet]);

    useEffect(() => {
        if (!wallet && flexRadioDefault === "Pay Online") {
            setFinalTotal(total - total * 0.05);
        } else if (!wallet) {
            setFinalTotal(total);
        }
    }, [flexRadioDefault, total]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchUserAsync(user_id));
            dispatch(fetchCartsAsync(user_id));
        }
    }, [])
    const calculateTotal = () => {
        let tot = 0;
        cart_items.forEach((item) => {
            tot += item.price * item.selQty;
        });
        setSubTotal(tot);
        if (tot < freeDeliveryAmount) {
            setDeliveryCharge(50);
        }
        const pay = tot + deliveryCharge + packagingCharge;
        setTotal(pay);
    };

    useEffect(() => {
        calculateTotal();
    }, [cart_items]);


    return (
        <>
            <div className="container-fluid checkout-section py-5">
                <div className="container">
                    <div className="row">
                        <DeliveryAddress setAddress={setAddress} />
                        <div className="col-lg-6 col-md-6 col-12 mt-lg-0 mt-md-0 mt-4">
                            {
                                cart_items?.length > 0 ? (
                                    <div className="col-12">
                                        <div className="card_total_box p-5">
                                            <div className="d-flex justify-content-between">
                                                <h5 className="fw-semibold">Your order</h5>
                                                <p className="fw-semibold text-secondary">Subtotal</p>
                                            </div>
                                            <div className="order_place_check py-2">
                                                {cart_items?.map((item) => (
                                                    <div className="d-flex align-items-center border rounded-1 p-3" key={item.id}>
                                                        <div className="col-lg-3 col-md-3 col-4 border rounded-1 p-1 overflow-hidden img_hover position-relative">
                                                            <img
                                                                src={`${IMAGE_BASE_URL}${item.icon}`}
                                                                className="img-fluid"
                                                                alt={item.name}
                                                            />
                                                        </div>
                                                        <div className="ps-3">
                                                            <h6 className="text_clip_head fw-semibold mb-1">
                                                                {item.name}
                                                            </h6>
                                                            <div className="text-secondary fw-semibold">
                                                                {`${item.unit_value} ${item.unit}`} x {item.selQty}
                                                            </div>
                                                            <div>
                                                                <div className="d-flex align-items-center">
                                                                    <p className="me-2 fs-4 prim_color">
                                                                        <span className="currency-symbol prim_color"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value prim_color">{item.price}</span>
                                                                    </p>
                                                                    <p className="fs-5">
                                                                        <span className="del_line">
                                                                            <span className="currency-symbol text-secondary"><i class="fa fa-inr" aria-hidden="true"></i></span> <span className="currency-value">{item.regularPrice}</span>
                                                                        </span>
                                                                        <span className="fs-6 text-secondary"> {`${((item.regularPrice - item.price) / item.regularPrice * 100).toFixed(2)}% off`} </span>
                                                                    </p>
                                                                </div>
                                                                <p className='d-flex align-items-center text-secondary'>You are saving  <span className="currency-symbol text-secondary px-1"><i class="fa fa-inr" aria-hidden="true"></i></span> {(item.regularPrice - item.price).toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
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
                                                                    <strong>Rs {finalTotal}</strong>
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

                            <div className="col-12 mt-5">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={wallet} onChange={(e) => setWallet(e.target.checked)} />
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
                            <div className="col-12 mt-3">
                                <h5 className="fw-semibold">Payment</h5>
                                <div className="radio-box mt-2">
                                    <div className="form-check ps-0 border-bottom-0 py-2 mb-0">
                                        <input
                                            className="form-check-input ms-0"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault1"
                                            value="Pay Online"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setFlexRadioDefault(e.target.value);
                                                }
                                            }}
                                        />
                                        <label
                                            className="form-check-label ps-3"
                                            htmlFor="flexRadioDefault1"
                                        >
                                            Pay Online(Get Extra 5% Chossing This)
                                        </label>
                                    </div>
                                    <div className="form-check ps-0 mb-0 py-2">
                                        <input
                                            className="form-check-input ms-0"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault2"
                                            value="Cash on delivery"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setFlexRadioDefault(e.target.value);
                                                }
                                            }}
                                        />
                                        <label
                                            className="form-check-label ps-3"
                                            htmlFor="flexRadioDefault2"
                                        >
                                            Cash On Delivery
                                        </label>
                                    </div>
                                </div>
                                <p className="mt-3">
                                    Your personal data will be used to process your order, support
                                    your experience throughout this website, and for other
                                    purposes described in our privacy policy.
                                </p>
                                <div className="submit-btn mt-3">
                                    <button
                                        className="prim_color_bg text-white btn-effect-1 d-flex align-items-center justify-content-center"
                                        onClick={handleOrderPlace}
                                    >
                                        {loading && <div className="spinner-border me-2" style={{ borderWidth: '3px', height: '1rem', width: '1rem' }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}Order Place
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

export default Checkout;
