import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubsciptionOrdersAsync } from '../features/orderSlice';
import { IMAGE_BASE_URL } from '../constants/contant';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const SubscriptionProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.auth.user_id);
    const { subscription_orders, subscription_status } = useSelector(state => state.orders);
    console.log("orders", subscription_orders)
    const handleEdit = (order) => {
        navigate(`/product-list/${order?.product[0]?.id}`)
    }
    useEffect(() => {
        dispatch(fetchSubsciptionOrdersAsync(user_id));
    }, [])
    return (
        <>
            <div className="container-fluid order_history_sec py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-3">
                            <h4 className="fw-semibold">My Subscriptions</h4>
                        </div>
                    </div>
                    <div className="row gy-4 justify-content-center">
                        <div className="col-lg-12 col-md-8 col-12">
                            <div className="row gy-4">
                                {
                                    subscription_status === "loading" ? (
                                        <Spinner />
                                    ) : (
                                        subscription_orders?.length > 0 ? (
                                            subscription_orders.map((order, index) => (
                                                <div className="col-lg-12 col-md-12 col-12" key={index}>
                                                    <div className="d-flex align-items-center border rounded-1 p-3">
                                                        <div className="rounded-1 p-1 overflow-hidden position-relative">
                                                            <img
                                                                src={`${IMAGE_BASE_URL}${order?.product[0]?.icon}`}
                                                                className="img-fluid"
                                                                alt="..."
                                                                style={{ width: '200px', height: '200px', objectFit: 'contain', aspectRatio: '1/1' }}
                                                            />
                                                        </div>
                                                        <div className="ps-3 w-100">
                                                            <div className='w-100 d-flex align-items-center justify-content-between'>
                                                                <h6 className="text_clip_head fw-semibold mb-1">{order?.product[0]?.name}</h6>
                                                                <div className='ms-2'>
                                                                    <p>{order.deliveryDate}</p>
                                                                    <p className='fw-semibold prim_color'>{order.order_no}</p>
                                                                </div>
                                                            </div>
                                                            <p className="fw-semibold">{`${order?.product[0]?.unitValue} ${order?.product[0]?.unit}`}</p>
                                                            <p className='my-3'>
                                                                <span className="quantity mt-1 fw-semibold">{`${order.deliveryType} Qty: ${order?.product[0]?.selQty}`}</span>
                                                            </p>
                                                            <p className="mt-1 fw-semibold">Payment: <span>{order.paymentOption}</span></p>
                                                            <p className="mt-1 fw-semibold">Status: <span>{order.status}</span></p>
                                                            <div className='w-100 d-flex justify-content-between'>
                                                                <p className="mt-1 fw-semibold d-flex align-items-center">
                                                                    Price: <span className='px-1'><i className="fa fa-inr" aria-hidden="true"></i> {order?.product[0]?.price}</span>
                                                                </p>
                                                                {order.status !== "CANCELLEDBYCUSTOMER" && (
                                                                    <div className='mt-1'>
                                                                        <button
                                                                            className="prim_color_bg py-2 px-3 text-white btn-effect-1"
                                                                            style={{ fontSize: "14px" }}
                                                                            onClick={() => handleEdit(order)}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <p className="d-flex align-items-center text-secondary">
                                                                You are saving <span className="currency-symbol text-secondary px-1">
                                                                    <i className="fa fa-inr" aria-hidden="true"></i></span>
                                                                {(order?.product[0]?.regularPrice - order?.product[0]?.price).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
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

export default SubscriptionProducts
