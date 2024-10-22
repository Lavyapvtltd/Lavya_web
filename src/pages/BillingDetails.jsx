import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlybillAsync } from '../features/monthlyBillSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BillingDetails = () => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [total, setTotal] = useState(0);
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

    useEffect(() => {
        dispatch(fetchMonthlybillAsync({ user_id, month, year }));
    }, [month, year]);

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
    const downloadPDF = () => {
        const input = document.getElementById('billDetails');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;  // A4 width in mm
            const pageHeight = 297;  // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
    
            let position = 0;
    
            // Add header
            pdf.setFontSize(22);
            pdf.text("Billing Details", 105, 20, null, null, 'center');
            pdf.setFontSize(12);
            pdf.text(`Month: ${months.find(m => m.id === month)?.month} ${year}`, 105, 30, null, null, 'center');
            
            // Add image
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
    
            // Add watermark
            pdf.setFontSize(40);
            pdf.setTextColor(200, 200, 200); // Light gray color for the watermark
            pdf.text("mylavya.com", 105, 150, null, null, 'center', { angle: 45 });
    
            // Add footer
            pdf.setFontSize(10);
            pdf.setTextColor(0, 0, 0); // Reset to black color for footer
            pdf.text("Generated on: " + new Date().toLocaleDateString(), 10, pdf.internal.pageSize.getHeight() - 10);
    
            // Save PDF
            pdf.save(`${months.find(m => m.id === month)?.month}_${year}_bill.pdf`);
        });
    };
    

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

                    {/* Bill details section */}
                    <div id="billDetails" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6' }}>
                        <div className="row pb-4" style={{ borderBottom: '1px solid #d3d3d3', marginBottom: '20px' }}>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div>
                                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Invoice Details</h4>
                                    <p>Time period: <span>{`01/${month.toString().padStart(2, '0')}/${year} to ${new Date(year, month, 0).getDate()}/${month.toString().padStart(2, '0')}/${year}`}</span></p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12 mt-md-0 mt-3">
                                <div className='d-flex flex-column align-items-md-end align-items-start'>
                                    <div>
                                        <h5 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{user.name}</h5>
                                        <p>{user?.more_address[0]?.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            monthlybill?.length > 0 ? (
                                <>
                                    <div className="row py-4" style={{ borderBottom: '1px solid #d3d3d3', marginBottom: '20px' }}>
                                        <div className='bill_summary'>
                                            <h5 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Bill Summary</h5>
                                            <div className="bill_list mt-4">
                                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                                                    <li style={{ textAlign: 'center' }}>
                                                        <div>
                                                            <h6 style={{ fontSize: '14px' }}>Rs. {total}</h6>
                                                            <p style={{ fontSize: '12px' }}>Amount Spent</p>
                                                        </div>
                                                    </li>
                                                    <li style={{ textAlign: 'center' }}>
                                                        <div>
                                                            <h6 style={{ fontSize: '14px' }}>Rs. 0.00</h6>
                                                            <p style={{ fontSize: '12px' }}>Savings</p>
                                                        </div>
                                                    </li>
                                                    <li style={{ textAlign: 'center' }}>
                                                        <div>
                                                            <h6 style={{ fontSize: '14px' }}>{monthlybill?.length}</h6>
                                                            <p style={{ fontSize: '12px' }}>Total Deliveries</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="billing_list">
                                            <h5 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Dairy Products</h5>
                                            <div className='col-12 table-responsive'>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ borderBottom: '2px solid #333', padding: '10px', textAlign: 'left' }}>Item</th>
                                                            <th style={{ borderBottom: '2px solid #333', padding: '10px', textAlign: 'center' }}>Qty</th>
                                                            <th style={{ borderBottom: '2px solid #333', padding: '10px', textAlign: 'center' }}>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            monthlybill.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td style={{ borderBottom: '1px solid #d3d3d3', padding: '10px' }}>{item.product.name}</td>
                                                                    <td style={{ borderBottom: '1px solid #d3d3d3', padding: '10px', textAlign: 'center' }}>{item.totalQuantity}</td>
                                                                    <td style={{ borderBottom: '1px solid #d3d3d3', padding: '10px', textAlign: 'center' }}>Rs. {item.product.price}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='text-end mt-3'>
                                        <h5 className='fw-semibold'>Total Rs. <span>{total}</span></h5>
                                    </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <h4 className='text-center' style={{ marginTop: '40px', fontSize: '18px', color: '#999' }}>No Billing Data Found</h4>
                            )
                        }
                    </div>
                    {
                        monthlybill?.length > 0 &&   <div className='text-center mt-4'>
                        <button className="btn btn-primary" style={{background:"#309a20"}} onClick={downloadPDF}>Download PDF</button>
                    </div>
                    }
                </div>
            </div>
        </>
    );
};

export default BillingDetails;
