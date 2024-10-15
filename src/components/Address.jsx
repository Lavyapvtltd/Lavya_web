import React from 'react'
import { useSelector } from 'react-redux';
const Address = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <>
            <div className="address-para px-4 py-3">
                <p className="mb-0">
                    The following addresses will be used on the checkout page by
                    default.
                </p>
            </div>
            <div className="row pt-5">
                <div className="col-lg-6 col-sm-12 col-12 address">
                    <h5 className="mb-4 fw-semibold">
                        Address{" "}
                        {/* <span>
                            {" "}
                            <a href=""><i className="fa fa-pencil-square-o fs-5 prim_color" aria-hidden="true"></i></a>
                        </span> */}
                    </h5>
                    <h6 className="mb-3 fw-semibold">{user?.name}</h6>
                    <p>{user?.more_address[0]?.location}</p>
                    <p>Mobile: {user?.contact}</p>
                </div>
            </div>
        </>
    )
}

export default Address
