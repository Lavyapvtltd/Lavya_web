import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'


const OrderSuccess = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const transactionId = searchParams.get('transactionId');
    return (
        <>
            <div className="container-fluid order_success py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-7 col-12">
                            <div className="success_box rounded-2 bg-white p-4 text-center">
                                <div>
                                    <img src="/images/check-mark.png" className='w-25' alt="" />
                                </div>
                                <h4 className='prim_color fw-semibold'>Order placed, thank you!</h4>
                                <p>Your Transaction Id Is {transactionId}</p>
                                <div className='mt-3'>
                                    <NavLink to="/order-history" className="btn-ordr bg-white border-2 btn-effect-1 me-md-3 mb-lg-0 mb-md-0 mb-3  prim_color">View Order</NavLink>
                                    <NavLink to="/" className="prim_color_bg text-white btn-effect-1" >Continue Shopping</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSuccess
