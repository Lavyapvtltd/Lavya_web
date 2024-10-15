import React from 'react'
import { NavLink } from 'react-router-dom'

const OrderSuccess = () => {
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
                                <h4 className='prim_color fw-semibold'>Thankyou for ordering</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sunt nesciunt minus fugiat, corrupti odit velit necessitatibus rem modi explicabo quo praesentium vel commodi cum magnam temporibus error illum magni.</p>
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
