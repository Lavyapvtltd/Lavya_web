import React, { useEffect, useReducer, useState } from 'react'
import { fetchRechagresAsync } from '../features/rechargeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, BASE_URL, RAZORPAY_KEY_ID } from '../constants/contant';
import { useLocation, useNavigate } from 'react-router-dom';
import { walletAmountAddition } from '../features/authSlice';
const Recharge = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data,trial } = location.state || {};
    const dispatch = useDispatch();
    const recharges = useSelector(state => state.recharges.recharges);
    const { user_id, user } = useSelector((state) => state.auth);
    const [amount, setAmount] = useState(500);
    console.log(amount, "amount")
    const [selectedRecharge, setSelectedRecharge] = useState("");
    console.log(selectedRecharge, "selectedRecharge")
    const [paymentOption, setPaymentOption] = useState("setup autopay");
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        if (data) {
            if (paymentOption == "payViaCash") {
                try {
                    setLoading(true);
                    const via_cash_data = { ...data, paymentOption: "payViaCash", amountToCollect: data.amount, recharge_amount_via_cash: amount, viaCash: false }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.CREATE_SUBSCRIPTION_ORDER}`,
                        via_cash_data
                    );
                    const result = res.data;
                    const { baseResponse, response } = result;
                    if (baseResponse.status == 1) {
                        setLoading(false);
                        toast.success("Order Subscribed Successfully");
                        setTimeout(() => {
                            navigate(`/order-success?transactionId=${response.order_no}`)
                        }, 1000)
                    } else {
                        setLoading(false);
                        toast.error(baseResponse.message);
                    }
                } catch (error) {
                    setLoading(false);
                    toast.error("Something went wrong");
                }
            } else {
                // try {
                //     setLoading(true);
                //     const data = {
                //         amount: amount,
                //         currency: "INR",
                //         notes: "Recharge Wallet",
                //         type: "web"
                //     }
                //     const res = await axios.post(
                //         `${BASE_URL}${API_URL.WALLET_RECHARGE}${user_id}`,
                //         data
                //     );
                //     const result = res.data;
                //     const { baseResponse, order } = result;
                //     if (baseResponse.status == 1) {
                //         setLoading(false);
                //         const options = {
                //             key: RAZORPAY_KEY_ID,
                //             amount: order.amount,
                //             currency: order.currency,
                //             name: 'Lavya Organic Foods',
                //             description: '',
                //             order_id: order.id,
                //             handler: async function (response) {
                //                 try {
                //                     let payment = 0;
                //                     if (amount == selectedRecharge?.value) {
                //                         payment = Number(amount) + Number(selectedRecharge.cashback)
                //                     } else {
                //                         payment = Number(amount)
                //                     }
                //                     const data = {
                //                         amount: payment
                //                     }
                //                     dispatch(walletAmountAddition({ user_id, data }));
                //                     navigate(`/recharge-success?id=${order.id}`)
                //                 } catch (error) {
                //                     toast.error("Something went wrong");
                //                 }
                //             },
                //             prefill: {
                //                 name: user.name,
                //                 email: user.email,
                //                 contact: user.phone
                //             },
                //             notes: {
                //                 address: "Lavya Organic Foods Corporate Office"
                //             },
                //             theme: {
                //                 color: "#3399cc"
                //             },
                //             modal: {
                //                 ondismiss: async function () {
                //                     toast.error("Transaction cancelled")
                //                 }
                //             }
                //         };
                //         console.log(options)
                //         const rzp = new window.Razorpay(options);
                //         rzp.open();
                //     }
                // } catch (error) {
                //     setLoading(false);
                //     toast.error("Something went wrong");
                // }
                try {
                    setLoading(true);
                    let payment = 0;
                    if (amount == selectedRecharge.value) {
                        payment = Number(amount) + Number(selectedRecharge.cashback)
                    } else {
                        payment = Number(amount)
                    }
                    const data = {
                        amount: amount,
                        cashback:amount==payment ? 0 : selectedRecharge.cashback,
                        addedamount:payment
                    }
                    const res = await axios.post(
                        `${BASE_URL}${API_URL.WALLET_RECHARGE}${user_id}`,
                        data
                    );
                    const result = res.data;
                    const { baseResponse,response } = result;
                    if (baseResponse.status == 1) {
                        setLoading(false);
                        window.location.href = response?.data?.instrumentResponse?.redirectInfo?.url;
                    }
                } catch (error) {
                    setLoading(false);
                    toast.error("Something went wrong");
                }
            }
        }
        else {
            // try {
            //     setLoading(true);
            //     const data = {
            //         amount: amount,
            //         currency: "INR",
            //         notes: "Recharge Wallet",
            //         type: "web"
            //     }
            //     const res = await axios.post(
            //         `${BASE_URL}${API_URL.WALLET_RECHARGE}${user_id}`,
            //         data
            //     );
            //     const result = res.data;
            //     const { baseResponse, order } = result;
            //     if (baseResponse.status == 1) {
            //         setLoading(false);
            //         const options = {
            //             key: RAZORPAY_KEY_ID,
            //             amount: order.amount,
            //             currency: order.currency,
            //             name: 'Lavya Organic Foods',
            //             description: '',
            //             order_id: order.id,
            //             handler: async function (response) {
            //                 try {
            //                     let payment = 0;
            //                     if (amount == selectedRecharge?.value) {
            //                         payment = Number(amount) + Number(selectedRecharge.cashback)
            //                     } else {
            //                         payment = Number(amount)
            //                     }
            //                     const data = {
            //                         amount: payment
            //                     }
            //                     dispatch(walletAmountAddition({ user_id, data }));
            //                     navigate(`/recharge-success?id=${order.id}`)
            //                 } catch (error) {
            //                     toast.error("Something went wrong");
            //                 }
            //             },
            //             prefill: {
            //                 name: user.name,
            //                 email: user.email,
            //                 contact: user.phone
            //             },
            //             notes: {
            //                 address: "Lavya Organic Foods Corporate Office"
            //             },
            //             theme: {
            //                 color: "#3399cc"
            //             },
            //             modal: {
            //                 ondismiss: async function () {
            //                     toast.error("Transaction cancelled")
            //                 }
            //             }
            //         };
            //         console.log(options)
            //         const rzp = new window.Razorpay(options);
            //         rzp.open();
            //     }
            // } catch (error) {
            //     setLoading(false);
            //     toast.error("Something went wrong");
            // }
            try {
                setLoading(true);
                let payment = 0;
                if (amount == selectedRecharge.value) {
                    payment = Number(amount) + Number(selectedRecharge.cashback)
                } else {
                    payment = Number(amount)
                }
                const data = {
                    amount: amount,
                    cashback:amount==payment ? 0 : selectedRecharge.cashback,
                    addedamount:payment
                }
                const res = await axios.post(
                    `${BASE_URL}${API_URL.WALLET_RECHARGE}${user_id}`,
                    data
                );
                const result = res.data;
                const { baseResponse,response } = result;
                if (baseResponse.status == 1) {
                    setLoading(false);
                    window.location.href = response?.data?.instrumentResponse?.redirectInfo?.url;
                }
            } catch (error) {
                setLoading(false);
                toast.error("Something went wrong");
            }
        }
    }
    const handleChange = (e) => {
        if(Object.keys(trial || {}).length > 0){
            toast.error("You cannot modify the amount while using a trial product.");
            return;
        } 
        setAmount(e.target.value);
    }
    const handleAmountClick = (amount) => {
        if(Object.keys(trial || {}).length > 0){
            toast.error("You cannot modify the amount while using a trial product.");
            return;
        }
        setAmount(amount);
    }
    const handleRechargeClick = (recharge) => {
        const { cashback, value } = recharge;
        handleAmountClick(Number(value));
        setSelectedRecharge(recharge);
        Swal.fire({
            html: `For a recharge of ₹ ${value}, you will receive ₹ ${Number(value) + Number(cashback)}.<br>
            If you do not spend this amount within the validity period, your cashback amount will be automatically deducted.<br><br>
            ₹ ${value} के रिचार्ज के लिए, आपको ₹ ${Number(value) + Number(cashback)} प्राप्त होगा।<br>
            यदि आप वैधता अवधि के भीतर यह राशि खर्च नहीं करते हैं, तो आपकी कैशबैक राशि स्वचालित रूप से काट ली जाएगी।`,
        })

    }
    const handlePayViaCash = () => {
        if (data) {
            Swal.fire({
                html: "Note: You have to pay the selected amount to our delivery partner.<br>Then only your wallet balance will be updated.<br><br>आपको हमारे डिलीवरी पार्टनर को चयनित राशि का भुगतान करना होगा।<br>तभी आपका वॉलेट बैलेंस अपडेट किया जाएगा।",
            })
        } else {
            Swal.fire({
                title: "Alert",
                text: "Please Select The Any Subscription Product then select pay via cash",
                icon: "error",
            })
        }
    }
    useEffect(() => {
        if (data) {
            setAmount(data.amount);
        }
    }, [data])
    useEffect(() => {
        dispatch(fetchRechagresAsync());
    }, [])
    return (
        <>
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-9 col-12">
                            <div className="row wallet_sec gy-lg-0 gy-md-3 gy-3">
                                <div className="col-lg-12 col-md-12 col-12 mb-3" onClick={() => {
                                    document.getElementById(`walletRadio1`).checked = true;
                                }}>
                                    <div className="wallet_box rounded-2">
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button bg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        <input class="form-check-input" type="radio" name="paymentoption" id="walletRadio1" value="setup autopay" onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setPaymentOption(e.target.value);
                                                            }
                                                        }} checked={Object.keys(trial || {}).length == 0} />
                                                        <label class="form-check-label d-flex ms-2" for="walletRadio1">Setup Autopay</label>
                                                    </button>
                                                </h2>

                                                <div id="collapseOne" className={`accordion-collapse collapse ${Object.keys(trial || {}).length == 0 ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control rounded-1"
                                                                id="exampleFormControlInput1"
                                                                value={amount}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="amount_list">
                                                            <ul className='p-0 m-0'>
                                                                <li className='d-inline-block me-2'>
                                                                    <button type='button' className='bg-white fw-semibold' onClick={() => handleAmountClick(1000)}>1000</button>
                                                                </li>
                                                                <li className='d-inline-block me-2'>
                                                                    <button type='button' className='bg-white fw-semibold' onClick={() => handleAmountClick(3000)}>3000</button>
                                                                </li>
                                                                <li className='d-inline-block me-2'>
                                                                    <button type='button' className='bg-white fw-semibold' onClick={() => handleAmountClick(5000)}>5000</button>
                                                                </li>
                                                                <li className='d-inline-block me-2'>
                                                                    <button type='button' className='bg-white fw-semibold' onClick={() => handleAmountClick(10000)}>10000</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-12 mb-3" onClick={() => {
                                    document.getElementById(`walletRadio2`).checked = true;
                                }}>
                                    <div className="wallet_box rounded-2">
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingTwo">
                                                    <button className="accordion-button bg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                        <input class="form-check-input" type="radio" name="paymentoption" id="walletRadio2" value="recharge once" onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setPaymentOption(e.target.value);
                                                            }
                                                        }} checked={Object.keys(trial || {}).length > 0}/>
                                                        <label class="form-check-label d-flex ms-2" for="walletRadio2">Recharge Once</label>
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" className={`accordion-collapse collapse ${Object.keys(trial || {}).length > 0 ? 'show' : ''}`} aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control rounded-1"
                                                                id="exampleFormControlInput1"
                                                                value={amount}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="amount_list">
                                                            <ul className='p-0 m-0'>
                                                                {
                                                                    recharges?.map((recharge, index) => (
                                                                        <li className='d-inline-block me-2' key={index}>
                                                                            <button type='button' className='bg-white fw-semibold' onClick={() => {
                                                                                if(Object.keys(trial || {}).length > 0){
                                                                                    toast.error("You cannot modify the amount while using a trial product.");
                                                                                    return;
                                                                                }
                                                                                document.getElementById(`priceCheck${index}`).checked = true;
                                                                                handleRechargeClick(recharge)
                                                                            }}>{recharge?.value}</button>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>

                                                        <div className="wallet_about_box mt-2">
                                                            {
                                                                recharges?.map((recharge, index) => (
                                                                    <div key={index} className="wallet_list_price_tab mb-2" onClick={() => {
                                                                        if(Object.keys(trial || {}).length > 0){
                                                                            toast.error("You cannot modify the amount while using a trial product.");
                                                                            return;
                                                                        }
                                                                        document.getElementById(`priceCheck${index}`).checked = true;
                                                                        handleRechargeClick(recharge)
                                                                    }}>
                                                                        <input className="form-check-input d-none position-absolute" name="flexRadioDefault" type="radio" id={`priceCheck${index}`} />
                                                                        <label className="form-check-label wallet_price_box position-relative d-flex w-100" htmlFor={`priceCheck${index}`}>
                                                                            <ul className="p-0 m-0 d-flex align-items-center w-100 justify-content-between">
                                                                                <li className="pe-1 text-center">
                                                                                    <div className="fw-semibold price_txt">Cost Price</div>
                                                                                    <p>{recharge?.value}</p>
                                                                                </li>
                                                                                <li className="pe-1 text-center">
                                                                                    <div className="fw-semibold price_txt">Cashback</div>
                                                                                    <p>{recharge?.cashback}</p>
                                                                                </li>
                                                                                <li className="text-center">
                                                                                    <div className="fw-semibold price_txt">Validity</div>
                                                                                    <p>{recharge?.validity}</p>
                                                                                </li>
                                                                                <li className="ps-1 text-center">
                                                                                    <button type="button" className="border-0" style={{ background: 'none' }}>
                                                                                        <i className="fa-solid fa-xmark"></i>
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                        </label>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12 col-12 mb-3" onClick={() => {
                                    if (data && typeof data === 'object') {
                                        document.getElementById(`walletRadio3`).checked = true;
                                    }
                                }}>
                                    <div className="wallet_box rounded-2">
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingThree">
                                                    <button className="accordion-button bg-none" onClick={() => handlePayViaCash()} type="button"
                                                        data-bs-toggle={data && typeof data === 'object' ? "collapse" : ""}
                                                        data-bs-target="#collapseThree"
                                                        aria-expanded="true"
                                                        aria-controls="collapseThree"
                                                    >
                                                        <input class="form-check-input" type="radio" name="paymentoption" id="walletRadio3" value="payViaCash" onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setPaymentOption(e.target.value);
                                                            }
                                                        }} />
                                                        <label class="form-check-label d-flex ms-2" for="walletRadio3">Pay Via Cash</label>
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control rounded-1"
                                                                id="exampleFormControlInput1"
                                                                value={amount}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="amount_list">
                                                            <ul className='p-0 m-0'>
                                                                <li className='d-inline-block me-2'>
                                                                    <button type='button' className='bg-white fw-semibold' onClick={() => handleAmountClick(1000)}>1000</button>
                                                                </li>
                                                                <li className='d-inline-block me-2'>
                                                                    <button type='button' className='bg-white fw-semibold' onClick={() => handleAmountClick(3000)}>3000</button>
                                                                </li>
                                                                <li className='d-inline-block me-2'>
                                                                    <button type='button' className='bg-white fw-semibold' onClick={() => handleAmountClick(5000)}>5000</button>
                                                                </li>
                                                                <li className='d-inline-block me-2'>
                                                                    <button type='button' className='bg-white fw-semibold' onClick={() => handleAmountClick(10000)}>10000</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='.col-12 mt-2 text-center'>
                                    <button type='button' disabled={loading} className='prim_color_bg text-white btn-effect-1' onClick={handlePay}>
                                        {loading && <div className="spinner-border me-2" style={{ borderWidth: '3px', height: '1rem', width: '1rem' }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}Pay ₹ {amount}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recharge
