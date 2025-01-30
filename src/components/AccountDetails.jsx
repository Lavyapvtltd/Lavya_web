import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_URL, BASE_URL } from '../constants/contant';
import { toast } from 'react-toastify';
import { fetchUserAsync, setUser } from '../features/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AccountDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,user_id} = useSelector((state) => state.auth);
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        contact: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
    });

    useEffect(()=>{
        if(user_id){
            dispatch(fetchUserAsync(user_id));
        }
    },[])

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="profile_avtar position-relative">
                            <img src="/images/avtar.png" alt="profile" className="img-fluid" />
                        </div>
                        <div className="position-relative">
                            <span className="wallet_icon" onClick={()=>{navigate("/recharge")}}>
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="20" height="20" viewBox="0 0 458.5 458.5" fill="currentColor"><path d="M336.7 344c-22 0-39.9-18-39.9-39.9V238c0-22 18-39.8 39.9-39.8h105.7v-65.9c0-17-13.8-30.7-30.7-30.7h-381c-17 0-30.7 13.7-30.7 30.7v277.6c0 17 13.8 30.8 30.7 30.8h381c17 0 30.7-13.8 30.7-30.8V344H336.7z"></path><path d="M440.5 220H336.7c-10 0-18 8-18 18V304c0 10 8 18 18 18h103.8c10 0 18-8 18-18V238c0-10-8-18-18-18zm-68 77a26 26 0 1 1 0-52 26 26 0 0 1 0 52zM358.2 45.2A39.7 39.7 0 0 0 308 20L152 71.6h214.9l-8.7-26.4z"></path></svg>
                            </span>
                            <div className="score_rupee position-relative"><span className="pe-1"><i class="fa fa-inr" aria-hidden="true"></i></span>{user.walletBalance}</div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12 col-md-12 mt-4">
                    <Formik
                        initialValues={{
                            name: user.name || '',
                            email: user.email || '',
                            contact: user.contact || '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            try {
                                const res = await axios.post(`${BASE_URL}${API_URL.EDIT_USER_DETAILS}${user._id}`, values);
                                const result = res.data;
                                const { baseResponse, response } = result;
                                if (baseResponse.status == "1") {
                                    var objectModify = { ...response, verfiyStatus: true };
                                    dispatch(setUser(objectModify));
                                } else {
                                    toast.error(baseResponse.message);
                                }
                            } catch (error) {
                                console.error(error);
                                toast.error('Something went wrong');
                            }
                        }}
                        enableReinitialize
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-12">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <Field
                                                type="text"
                                                className="form-control rounded-0"
                                                name="name"
                                                placeholder="Enter your name"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-12">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <Field
                                                type="email"
                                                className="form-control rounded-0"
                                                name="email"
                                                placeholder="Enter your email"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-12">
                                        <div className="mb-3">
                                            <label htmlFor="contact" className="form-label">Phone Number</label>
                                            <Field
                                                type="tel"
                                                className="form-control rounded-0"
                                                name="contact"
                                                placeholder="Phone Number"
                                                disabled="true"
                                            />
                                            <ErrorMessage name="contact" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                </div>

                                <div className="btn_wrapper mt-3">
                                    <button
                                        type="submit"
                                        className="prim_color_bg text-white btn-effect-1"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}

export default AccountDetails;
