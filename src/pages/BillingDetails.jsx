import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlybillAsync } from '../features/monthlyBillSlice';

const BillingDetails = () => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [total,setTotal] = useState(0);
    const months = [
        { month: "January", id: 1 },
        { month: "February", id: 2 },
        { month: "March", id: 3 },
        { month: "April", id: 4 },
        { month: "May", id: 5 },
        { month: "June", id: 6 },
        { month: "July", id: 7 },
        { month: "August", id: 8 },
        { month: "September", id: 9 },
        { month: "October", id: 10 },
        { month: "November", id: 11 },
        { month: "December", id: 12 }
    ];
    const user_id = useSelector((state) => state.auth.user_id);
    const user = useSelector((state) => state.auth.user);
    const monthlybill = useSelector((state) => state.monthlybill.monthlybill);
    console.log(monthlybill, "df")

    useEffect(() => {
        dispatch(fetchMonthlybillAsync({ user_id, month, year }));
    }, [month, year]);

    const handleMonthChange = (direction) => {
        let newMonth = month + direction;
        let newYear = year;

        if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        } else if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
        }
        setMonth(newMonth);
        setYear(newYear);
    };
    useEffect(() => {
        if (monthlybill && monthlybill.length > 0) {
            const total = monthlybill.reduce((acc, item) => {
                return acc + (item?.totalQuantity * (item?.product?.price));
            }, 0);
            setTotal(total);
        } else {
            setTotal(0); 
        }
    }, [monthlybill]);

    return (
        <>
            <div className="container-fluid bill_sec py-5">
                <div className="container bg-white p-4 rounded-2" style={{ boxShadow: '0 0 3px #b3b3b3', borderTop: '5px solid #309a20' }}>
                    <div className="row">
                        <div className="col-12 mb-5">
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='border-0' style={{ background: 'none' }} onClick={() => handleMonthChange(-1)}>
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>
                                <h6 className='fw-semibold px-2 m-0'>
                                    {months.find(m => m.id === month)?.month} {year}
                                </h6>
                                <button className='border-0' style={{ background: 'none' }} onClick={() => handleMonthChange(1)}>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-4" style={{ borderBottom: '1px solid rgb(211 211 211)' }}>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div>
                                <h4 className="fw-semibold mb-1">Invoice Details</h4>
                                <p>Time period: <span>{`01/${month.toString().padStart(2, '0')}/${year} to ${new Date(year, month, 0).getDate()}/${month.toString().padStart(2, '0')}/${year}`}</span></p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 mt-md-0 mt-3">
                            <div className='d-flex flex-column align-items-md-end align-items-start'>
                                <div>
                                    <h5 className="fw-semibold mb-1">{user.name}</h5>
                                    <p>{`${user?.more_address[0]?.location}, ${user?.more_address[0]?.alternatephone}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        monthlybill.length > 0 ? (
                            <>
                                <div className="row py-4" style={{ borderBottom: '1px solid rgb(211 211 211)' }}>
                                    <div className='bill_summary'>
                                        <h5 className="fw-semibold">Bill Summary</h5>
                                        <div className="bill_list mt-4">
                                            <ul className="p-0 m-0 d-flex justify-content-between align-items-center">
                                                <li className='px-2 text-center'>
                                                    <div>
                                                        <h6>Rs. {total}</h6>
                                                        <p>Amount Spent</p>
                                                    </div>
                                                </li>
                                                <li className='px-2 text-center'>
                                                    <div>
                                                        <h6>Rs. 0.00</h6>
                                                        <p>Savings</p>
                                                    </div>
                                                </li>
                                                <li className='px-2 text-center'>
                                                    <div>
                                                        <h6>{monthlybill?.length}</h6>
                                                        <p>Total Deliveries</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 pt-4">
                                    <div className="billing_list">
                                        <h5 className="fw-semibold">Dairy Products</h5>
                                        <div className='col-12 table-responsive'>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Item</th>
                                                        <th scope="col">Qty</th>
                                                        <th scope="col">price</th>
                                                        <th scope="col">Total Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        monthlybill.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item?.product?.name}</td>
                                                                <td>{item?.totalQuantity}</td>
                                                                <td>Rs. {item?.product?.price}</td>
                                                                <td>Rs. {item?.totalQuantity * item?.product?.price}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className='text-end mt-3'>
                                        <h5 className='fw-semibold'>Total Rs. <span>{total}</span></h5>
                                    </div>
                                    <div className='mt-2'>
                                        <p className='fst-italic'>Disclaimer: The billed amount is as per the actual weight delivered</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="row py-4" style={{ borderBottom: '1px solid rgb(211 211 211)' }}>
                                    <div className='bill_summary'>
                                        <h5 className="fw-semibold">Bill Summary</h5>
                                        <div className="bill_list mt-4">
                                            <ul className="p-0 m-0 d-flex justify-content-between align-items-center">
                                                <li className='px-2 text-center'>
                                                    <div>
                                                        <h6>Rs. 00</h6>
                                                        <p>Amount Spent</p>
                                                    </div>
                                                </li>
                                                <li className='px-2 text-center'>
                                                    <div>
                                                        <h6>Rs. 0.00</h6>
                                                        <p>Savings</p>
                                                    </div>
                                                </li>
                                                <li className='px-2 text-center'>
                                                    <div>
                                                        <h6>0</h6>
                                                        <p>Total Deliveries</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 pt-4">
                                    <div className="border rounded-2 p-5 w-100 text-center fs-5 fw-semibold fst-italic">
                                        No bill found for {months.find(m => m.id === month)?.month} {year}
                                    </div>
                                    <div className='text-end mt-3'>
                                        <h5 className='fw-semibold'>Total Rs. <span>0.00</span></h5>
                                    </div>
                                    <div className='mt-2'>
                                        <p className='fst-italic'>Disclaimer: The billed amount is as per the actual weight delivered</p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default BillingDetails;
