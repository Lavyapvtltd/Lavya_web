import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

const RechargeFailed = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const amount = searchParams.get('amount');
    const message = searchParams.get('message');
    return (
        <>
            <div className="container-fluid order_success py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-7 col-12">
                            <div className="success_box rounded-2 bg-white p-4 text-center">
                                <div>
                                    <img src="/images/cross-mark.png" className='w-25' alt="" />
                                </div>
                                <h4 className='prim_color fw-semibold'>Recharge Failed</h4>
                                <p>{message}</p>
                                <p>Amount {amount}</p>
                                <div className='mt-3'>
                                    <NavLink to="/" className="prim_color_bg text-white btn-effect-1" >Go To Home</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RechargeFailed
