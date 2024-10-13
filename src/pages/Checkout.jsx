import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL, BASE_URL, API_URL, GOOGLE_MAP_API_KEY } from "../constants/contant";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchAddressesAsync } from "../features/addressSlice";
import moment from "moment/moment";
import { fetchCartsAsync } from "../features/cartSlice";
import { walletAmountDeduction } from "../features/authSlice";
const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, user_id, isLoggedIn } = useSelector((state) => state.auth);
    const cart_items = useSelector((state) => state.cart.cart);
    const addresses = useSelector(state => state.addresses.addresses);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [flexRadioDefault, setFlexRadioDefault] = useState("");
    const [finalTotal, setFinalTotal] = useState(total);
    const [toggle, setToggle] = useState(false);
    const [address, setAddress] = useState("");
    const [wallet, setWallet] = useState(false);
    const autocompleteInputRef = useRef(null);
    const setFieldValueRef = useRef(null);
    const [mapSrc, setMapSrc] = useState("");
    function convertDateFormat(dateString) {
        return moment(dateString, "MM-DD-YYYY").format("DD-MM-YYYY");
    }
    const product = cart_items?.map((cart_item) => {
        return {
            id: cart_item._id,
            name: cart_item.name,
            image: cart_item.productImage,
            quantity: cart_item.selQty,
            price: cart_item.price,
            unitValue: cart_item.unit_value,
            unit: cart_item.unit,
            subscription_type: cart_item.subscription_type,
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
                        deliveryDate: moment(convertDateFormat(product[0].start_date)).format("Do MMM YY"),
                        deliveryType: product[0].subscribed_type,
                        paymentOption: "Wallet",
                        walletDeductedAmount: "Full"
                    }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, response } = result;
                    if (baseResponse.status == 1) {
                        const data = {
                            amount:total
                        }
                        dispatch(walletAmountDeduction({user_id,data}));
                        toast.success("Order Created Successfully");
                        setTimeout(() => {
                            navigate("/")
                        }, 1000);
                    } else {
                        toast.error(baseResponse.message);
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                }
            }
            else if (flexRadioDefault == "Cash on delivery") {
                if (!flexRadioDefault) {
                    return toast.error("Please select payment type");
                }
                const deducted_amount = total - finalTotal;
                try {
                    const data = {
                        status: "ORDERED",
                        orderPlace: "",
                        product: product,
                        shippingaddress: address,
                        user: user,
                        amount: finalTotal,
                        deductedWalletAmount: deducted_amount,
                        deliveryDate: moment(convertDateFormat(product[0].start_date)).format("Do MMM YY"),
                        deliveryType: product[0].subscribed_type,
                        paymentOption: flexRadioDefault,
                        walletDeductedAmount: deducted_amount,
                    }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, response } = result;
                    if (baseResponse.status == 1) {
                        const data = {
                            amount:deducted_amount
                        }
                        dispatch(walletAmountDeduction({user_id,data}));
                        toast.success("Order Created Successfully");
                        setTimeout(() => {
                            navigate("/")
                        }, 1000)
                    } else {
                        toast.error(baseResponse.message);
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                }
            }
            else {
                if (!flexRadioDefault) {
                    return toast.error("Please select payment type");
                }
                const deducted_amount = total - finalTotal;
                try {
                    const data = {
                        status: "PROCCESSING",
                        orderPlace: "",
                        product: product,
                        shippingaddress: address,
                        user: user,
                        amount: finalTotal,
                        deductedWalletAmount: deducted_amount,
                        deliveryDate: moment(convertDateFormat(product[0].start_date)).format("Do MMM YY"),
                        deliveryType: product[0].subscribed_type,
                        paymentOption: flexRadioDefault,
                        walletDeductedAmount: deducted_amount,
                    }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, htmlContent } = result;
                    if (baseResponse.status == 1) {
                        const newTab = window.open();
                        newTab.document.write(htmlContent);
                        newTab.document.close();
                    } else {
                        toast.error(baseResponse.message);
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                }
            }
        } else {
            if (flexRadioDefault == "Cash on delivery") {
                try {
                    const data = {
                        status: "ORDERED",
                        orderPlace: "",
                        product: product,
                        shippingaddress: address,
                        user: user,
                        amount: finalTotal,
                        deliveryDate: moment(convertDateFormat(product[0].start_date)).format("Do MMM YY"),
                        deliveryType: product[0].subscribed_type,
                        paymentOption: flexRadioDefault,
                        walletDeductedAmount: 0,
                    }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, response } = result;
                    if (baseResponse.status == 1) {
                        toast.success("Order Created Successfully");
                        setTimeout(() => {
                            navigate("/")
                        }, 1000)
                    } else {
                        toast.error(baseResponse.message);
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                }
            }
            else {
                try {
                    const data = {
                        status: "PROCCESSING",
                        orderPlace: "",
                        product: product,
                        shippingaddress: address,
                        user: user,
                        amount: finalTotal,
                        deductedWalletAmount: 0,
                        deliveryDate: moment(convertDateFormat(product[0].start_date)).format("Do MMM YY"),
                        deliveryType: product[0].subscribed_type,
                        paymentOption: flexRadioDefault,
                        walletDeductedAmount: 0,
                    }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_NEW_ORDER}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse, htmlContent } = result;
                    if (baseResponse.status == 1) {
                        const newTab = window.open();
                        newTab.document.write(htmlContent);
                        newTab.document.close();
                    } else {
                        toast.error(baseResponse.message);
                    }
                } catch (error) {
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
        if (user_id) {
            dispatch(fetchAddressesAsync(user_id));
        }
    }, [dispatch, user_id]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchCartsAsync(user_id));
        }
    }, [])
    const calculateTotal = () => {
        let tot = 0;
        cart_items.forEach((item) => {
            tot += item.price * item.selQty;
        });
        setSubTotal(tot);
        setTotal(tot);
    };

    useEffect(() => {
        calculateTotal();
    }, [cart_items]);

    useEffect(() => {
        const loadScript = (url, callback) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = callback;
            document.head.appendChild(script);
        };

        const handleScriptLoad = () => {
            const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
                types: ["geocode"],
                componentRestrictions: { country: "in" },
            });

            autocomplete.setFields(["address_component", "formatted_address", "geometry"]);

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                let formattedAddress = place.formatted_address || '';
                let lat = place.geometry?.location?.lat();
                let lng = place.geometry?.location?.lng();
                if (lat && lng) {
                    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAP_API_KEY}&center=${lat},${lng}&zoom=14`;
                    setMapSrc(mapUrl);
                }
                if (setFieldValueRef.current) {
                    setFieldValueRef.current("location", formattedAddress);
                    // Also set the input value directly if needed
                    if (autocompleteInputRef.current) {
                        autocompleteInputRef.current.value = formattedAddress;
                    }
                }
            });
        };
        if (!window.google) {
            loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`, handleScriptLoad);
        } else {
            handleScriptLoad();
        }
    }, [toggle]);


    return (
        <>
            <div className="container-fluid checkout-section py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="col-12">
                                <div className="address_checkout rounded-2">
                                    <div className="d-flex align-items-center justify-content-between p-3" style={{ borderBottom: "1px solid #000" }}>
                                        <div>
                                            <h5 className="fw-semibold m-0">Address Delivery</h5>
                                        </div>

                                        <div className="check_img">
                                            <img src="/images/address-checkout.png" alt="" className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        {
                                            addresses?.map((item, index) => (
                                                <div className="d-flex align-items-center mb-1" key={index}>
                                                    <input
                                                        className="form-check-input ms-2"
                                                        type="radio"
                                                        name="address"
                                                        id={`flexRadioDefault${index}`}
                                                        value={index}
                                                        onChange={(e) => {
                                                            const selectedAddress = addresses[parseInt(e.target.value)];
                                                            setAddress(selectedAddress);
                                                        }}
                                                    />
                                                    <label
                                                        className="form-check-label ps-2"
                                                        htmlFor={`flexRadioDefault${index}`}
                                                    >
                                                        <div>
                                                            <h6 className="mb-1 fw-semibold">{user?.name}</h6>
                                                            <p>
                                                                {item?.location}
                                                                <a href="#" className="ps-1"><i className="fa-regular fa-pen-to-square text-danger"></i></a>
                                                            </p>
                                                            <p className="">Mobile: {user?.contact}</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <button className="rounded-pill bg-white px-3 py-2 text-success fw-semibold" style={{ border: '2px solid rgb(48 154 32)' }} onClick={() => setToggle(!toggle)}>+ Add new Address</button>
                            </div>
                            {
                                toggle && <div className="col-12 mt-3 main-form rounded-1 p-3">
                                    {
                                        mapSrc && <div className="w-100">
                                            <iframe
                                                src={mapSrc}
                                                width="100%"
                                                height="150"
                                                style={{ border: '0' }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </div>
                                    }
                                    <div className="p-md-5 p-sm-3 p-3">
                                        <div className="col-12 pb-1">
                                            <h4 className='fw-semibold'>Add New Address</h4>
                                        </div>
                                        <Formik
                                            initialValues={{
                                                location: "",
                                                street: "",
                                                address: "",
                                                landmark: "",
                                                alternatephone: "",
                                            }}
                                            validationSchema={Yup.object({
                                                location: Yup.string().required("Location is required"),
                                                street: Yup.string().required("House/Flat Number is required"),
                                                address: Yup.string().required("Society/Colony Name is required"),
                                                landmark: Yup.string().required("Landmark is required"),
                                                alternatephone: Yup.string()
                                                    .matches(/^[0-9]{10}$/, "Alternate Contact No. must be exactly 10 digits")
                                                    .required("Alternate Contact No. is required"),
                                            })}
                                            onSubmit={async (values, { resetForm }) => {
                                                try {
                                                    const res = await axios.post(
                                                        `${BASE_URL}${API_URL.ADD_ADDRESS}${user_id}`,
                                                        values
                                                    );
                                                    const result = res.data;
                                                    const { baseResponse, response } = result;
                                                    if (baseResponse.status == 1) {
                                                        toast.success("Address added successfully");
                                                        dispatch(fetchAddressesAsync(user_id));
                                                        setMapSrc("");
                                                        resetForm();
                                                    } else {
                                                        toast.error(baseResponse.message);
                                                    }
                                                } catch (error) {
                                                    toast.error("Something went wrong");
                                                }
                                            }}
                                        >
                                            {({ setFieldValue }) => {
                                                setFieldValueRef.current = setFieldValue;
                                                return <Form>
                                                    <div className="row gy-3">
                                                        <div className="col-12">
                                                            <div className="user-address-from position-relative">
                                                                <Field
                                                                    type="text"
                                                                    name="location"
                                                                    className="form-control rounded-1"
                                                                    innerRef={autocompleteInputRef}
                                                                    placeholder="Search location..."
                                                                    onChange={(e) => {
                                                                        setFieldValue("location", e.target.value);
                                                                    }}
                                                                />
                                                                <i className="fa fa-map-marker position-absolute" />
                                                                <ErrorMessage name="location" component="div" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="user-address-from position-relative">
                                                                <Field
                                                                    type="text"
                                                                    name="street"
                                                                    className="form-control rounded-1"
                                                                    placeholder="House Number/Flat Number"
                                                                />
                                                                <i className="fa fa-map-marker position-absolute" />
                                                                <ErrorMessage name="street" component="div" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="user-address-from position-relative">
                                                                <Field
                                                                    type="text"
                                                                    name="address"
                                                                    className="form-control rounded-1"
                                                                    placeholder="Society Name/Colony Name"
                                                                />
                                                                <i className="fa fa-map-marker position-absolute" />
                                                                <ErrorMessage name="address" component="div" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="user-address-from position-relative">
                                                                <Field
                                                                    type="text"
                                                                    name="landmark"
                                                                    className="form-control rounded-1"
                                                                    placeholder="landmark"
                                                                />
                                                                <i className="fa fa-map-marker position-absolute" />
                                                                <ErrorMessage name="landmark" component="div" className="text-danger" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="user-address-from position-relative">
                                                                <Field
                                                                    type="text"
                                                                    name="alternatephone"
                                                                    className="form-control rounded-1"
                                                                    placeholder="Alternate Contact No."
                                                                />
                                                                <i className="fa fa-phone position-absolute" />
                                                                <ErrorMessage name="alternatephone" component="div" className="text-danger" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="submit-btn mt-3">
                                                        <button type="submit" className="prim_color_bg text-white btn-effect-1">
                                                            Save
                                                        </button>
                                                    </div>
                                                </Form>
                                            }}
                                        </Formik>
                                    </div>
                                </div>
                            }
                        </div>
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
                                                                {`${item.unit_value} ${item.unit}`} x {item.selQty}
                                                            </div>
                                                            <h6 className="price_txt prim_color fw-semibold">
                                                                Rs {item.price}
                                                            </h6>
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
                                        className="prim_color_bg text-white btn-effect-1"
                                        onClick={handleOrderPlace}
                                    >
                                        Order Place
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
