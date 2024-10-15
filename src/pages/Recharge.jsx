import React, { useEffect, useReducer, useState } from 'react'
import { fetchRechagresAsync } from '../features/rechargeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, BASE_URL } from '../constants/contant';
import { useLocation, useNavigate } from 'react-router-dom';
const Recharge = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);
    const dispatch = useDispatch();
    const recharges = useSelector(state => state.recharges.recharges);
    const { user_id } = useSelector((state) => state.auth);
    const [amount, setAmount] = useState(500);
    const [selectedRecharge, setSelectedRecharge] = useState("");
    const [paymentOption, setPaymentOption] = useState("setup autopay");

    console.log(selectedRecharge)
    const handlePay = async () => {
        if (data && paymentOption == "payViaCash") {
            const via_cash_data = { ...data, paymentOption: "payViaCash", amountToCollect: data.amount, recharge_amount_via_cash: data.amount, viaCash: false }
            const res = await axios.post(
                `${BASE_URL}${API_URL.CREATE_SUBSCRIPTION_ORDER}`,
                via_cash_data
            );
            const result = res.data;
            const { baseResponse, response } = result;
            if (baseResponse.status == 1) {
                toast.success("Order Subscribed Successfully");
                setTimeout(() => {
                    navigate("/order-success")
                }, 1000)
            } else {
                toast.error(baseResponse.message);
            }
        }
        else {
            try {
                const data = {
                    amount: amount,
                    currency: "INR",
                    notes: "Recharge Wallet",
                }
                const res = await axios.post(
                    `${BASE_URL}${API_URL.WALLET_RECHARGE}${user_id}`,
                    data
                );
                const result = res.data;
                const { orderDetails, checkout } = result;
                if (orderDetails) {
                    const newTab = window.open();
                    newTab.document.write(checkout);
                    newTab.document.close();
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    }
    const handleAmountClick = (amount) => {
        setAmount(amount);
    }
    const handleRechargeClick = (recharge) => {
        const { cashback, value } = recharge;
        handleAmountClick(Number(value));
        setSelectedRecharge(recharge);
        Swal.fire({
            text: `For a recharge of ₹ ${value},you will receive ₹ ${Number(value) + Number(cashback)}.
            if you do not spend this amount within the validity period,so your cashback amount it will be automatically deducted `,
        })
    }
    const handlePayViaCash = () => {
        if (data) {
            Swal.fire({
                text: "Note:-Youn have to pay selected amount to our delivery partner.Then only your wallet balance will be updated",
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
                                <div className="col-lg-12 col-md-12 col-12 mb-3">
                                    <div className="wallet_box rounded-2">
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button bg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        <input class="form-check-input" type="radio" name="paymentoption" id="walletRadio1" value="setup autopay" onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setPaymentOption(e.target.value);
                                                            }
                                                        }} checked />
                                                        <label class="form-check-label d-flex ms-2" for="walletRadio1">Setup Autopay</label>
                                                    </button>
                                                </h2>

                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control rounded-1"
                                                                id="exampleFormControlInput1"
                                                                value={amount}
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
                                <div className="col-lg-12 col-md-12 col-12 mb-3">
                                    <div className="wallet_box rounded-2">
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingTwo">
                                                    <button className="accordion-button bg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                        <input class="form-check-input" type="radio" name="paymentoption" id="walletRadio2" value="recharge once" onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setPaymentOption(e.target.value);
                                                            }
                                                        }} />
                                                        <label class="form-check-label d-flex ms-2" for="walletRadio2">Recharge Once</label>
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control rounded-1"
                                                                id="exampleFormControlInput1"
                                                                value={amount}
                                                            />
                                                        </div>
                                                        <div className="amount_list">
                                                            <ul className='p-0 m-0'>
                                                                {
                                                                    recharges?.map((recharge) => (
                                                                        <li className='d-inline-block me-2'>
                                                                            <button type='button' className='bg-white fw-semibold' onClick={() => handleRechargeClick(recharge)}>{recharge?.value}</button>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>

                                                        <div className="wallet_about_box mt-2">
                                                            {
                                                                recharges?.map((recharge, index) => (
                                                                    <div key={index} className="wallet_list_price_tab mb-2" onClick={() => {
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
                                <div className="col-lg-12 col-md-12 col-12 mb-3">
                                    <div className="wallet_box rounded-2">
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingThree">
                                                    <button className="accordion-button bg-none" onClick={() => handlePayViaCash()} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                        <input class="form-check-input" type="radio" name="paymentoption" id="walletRadio3" value="payViaCash" onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setPaymentOption(e.target.value);
                                                            }
                                                        }} />
                                                        <label class="form-check-label d-flex ms-2" for="walletRadio3">Pay Via Cash</label>
                                                    </button>
                                                </h2>
                                                {/* <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                              <div className="accordion-body">
                              </div>
                            </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='.col-12 mt-2 text-center'>
                                    <button type='button' className='prim_color_bg text-white btn-effect-1' onClick={handlePay}>Pay ₹ {amount}</button>
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
