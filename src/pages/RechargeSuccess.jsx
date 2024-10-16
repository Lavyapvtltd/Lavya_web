import React, { useEffect } from 'react'
import { NavLink,useNavigate,useSearchParams  } from 'react-router-dom'
import { API_URL, BASE_URL } from '../constants/contant';
import axios from "axios";
import { toast } from 'react-toastify';
import { walletAmountAddition } from '../features/authSlice';
import { useDispatch,useSelector } from 'react-redux';

const RechargeSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.auth.user_id);
    const [searchParams, setSearchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');
    // const getPaymentIdByOrderId = async(order_id)=>{
    //     try{
    //         const res = await axios.get(
    //             `${BASE_URL}${API_URL.GET_PAYMENT_ID_BY_ORDER_ID}${order_id}`,
    //         );
    //         const result = res.data;
    //         const { status,error,orderDetails } = result;
    //         if (status == "OK") {
    //             const data = {
    //                 amount: 10
    //             }
    //             dispatch(walletAmountAddition({ user_id, data }));
    //             toast.success("Your balance has been updated successfully. Please check your wallet for updated balance.");
    //             setTimeout(()=>{
    //                 navigate("/")
    //             },500)
    //         }else{
    //             toast.error(error);
    //         }
    //     }catch(error){
    //         toast.error("Something went wrong");
    //     }
    // }
    // useEffect(()=>{
    //     if(orderId){
    //         getPaymentIdByOrderId(orderId);
    //     }
    // },[orderId])
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
                        <h4 className='prim_color fw-semibold'>Recharge success</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, sunt nesciunt minus fugiat, corrupti odit velit necessitatibus rem modi explicabo quo praesentium vel commodi cum magnam temporibus error illum magni.</p>
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

export default RechargeSuccess
