import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersAsync } from '../features/orderSlice';
import { API_URL, BASE_URL, IMAGE_BASE_URL } from '../constants/contant';
import { toast } from 'react-toastify';
import axios from "axios";
import moment from 'moment';
import Spinner from '../components/Spinner';

const Orders = () => {
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.auth.user_id);
    const { orders, status } = useSelector(state => state.orders);
    const [reason, setReason] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleCancel = async () => {
        if (!reason) {
            toast.error("Please Select Reason")
        }
        try {
            const data = {
                status: "CANCELLEDBYCUSTOMER",
                reason: reason
            }
            const res = await axios.put(
                `${BASE_URL}${API_URL.CANCEL_ORDER}${selectedOrder._id}`,
                data
            );
            const result = res.data;
            const { baseResponse, response } = result;
            if (baseResponse.status == 1) {
                toast.success("Order Cancel Successfully");
                setSelectedOrder(null);
                setReason("");
                dispatch(fetchOrdersAsync(user_id));
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    useEffect(() => {
        dispatch(fetchOrdersAsync(user_id));
    }, [])
    return (
        <>
            <div className="container-fluid order_history_sec py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-3">
                            <h4 className="fw-semibold">Order History</h4>
                        </div>
                    </div>
                    <div className="row gy-4 justify-content-center">
                        <div className="col-lg-12 col-md-8 col-12">
                            <div className="row gy-4">
                                {

                                    status === "loading" ? (
                                        <Spinner />
                                    ) : (
                                        orders?.length > 0 ? (
                                            orders?.map((order) => (
                                                <div>
                                                    {
                                                        order?.product?.map((product) => (
                                                            <div className="col-lg-12 col-md-12 col-12">
                                                                <div className="d-flex align-items-center border rounded-1 p-3">
                                                                    <div className="rounded-1 p-1 overflow-hidden position-relative">
                                                                        <img
                                                                            src={`${IMAGE_BASE_URL}${product.icon}`}
                                                                            className="img-fluid"
                                                                            alt="..."
                                                                            style={{ width: '200px', height: '200px', objectFit: 'contain', aspectRatio: '1/1' }}
                                                                        />
                                                                    </div>
                                                                    <div className="ps-3 w-100">
                                                                        <div className='w-100 d-flex align-items-center justify-content-between'>
                                                                            <h6 className="text_clip_head fw-semibold mb-1">{product.name}</h6>
                                                                            <div className=' ms-2'>
                                                                                <p>{moment(order.createdAt).format("DD MMM YY")}</p>
                                                                                <p className='fw-semibold prim_color'>{order.order_no}</p>
                                                                            </div>
                                                                        </div>
                                                                        <p className="fw-semibold">{`${product.unitValue} ${product.unit}`}</p>
                                                                        <p className='my-3'><span className="quantity mt-1 fw-semibold">{`${order.deliveryType} Qty: ${product.selQty}`}</span></p>
                                                                        <p className="mt-1 fw-semibold">Payment: <span>{order.paymentOption}</span></p>
                                                                        <p className="mt-1 fw-semibold">Status: <span>{order.status}</span></p>
                                                                        <div className='w-100 d-flex justify-content-between'>
                                                                            <p className="mt-1 fw-semibold d-flex align-items-center">Price: <span className='px-1'><i class="fa fa-inr" aria-hidden="true"></i> {product.price}</span></p>
                                                                            {
                                                                                order.status != "CANCELLEDBYCUSTOMER" &&
                                                                                <>
                                                                                    <div className='mt-1'>
                                                                                        <button className="prim_color_bg py-2 px-3 text-white btn-effect-1" style={{ fontSize: "14px" }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" onClick={() => { setSelectedOrder(order) }}>Cancel</button>
                                                                                    </div>
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
                                                                                                            <button className="prim_color_bg py-2 px-3 text-white btn-effect-1" onClick={handleCancel}>Cancel</button>
                                                                                                            <button className="ms-3 prim_color_bg py-2 px-3 text-white btn-effect-1" data-bs-dismiss="offcanvas" aria-label="Close">Don't cancel</button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                        <p class="d-flex align-items-center text-secondary">You are saving  <span class="currency-symbol text-secondary px-1"><i class="fa fa-inr" aria-hidden="true"></i></span> {(product.regularPrice - product.price).toFixed(2)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        ) : (
                                            <div>
                                                <img src="/images/no-product-found.png" alt="" className='w-100 img-fluid' />
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Orders
