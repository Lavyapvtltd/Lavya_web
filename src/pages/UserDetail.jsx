import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BASE_URL, API_URL } from '../constants/contant';
import { toast } from 'react-toastify';
import { setUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const initialValues = { name: '', email: '', dob: '' };
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        dob: Yup.string().required('Date of birth is required'),
    });

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = async (values) => {
        try {
            if(!user.contact)
            {
                return toast.error("something went wrong");
            }
            values.contact = user.contact;
            values.dob = formatDate(values.dob);
            const res = await axios.post(`${BASE_URL}${API_URL.ADD_USER_DETAILS}`, values);
            const result = res.data;
            const { baseResponse, response } = result;
            if (baseResponse.status == "1") {
                dispatch(setUser(response));
                navigate("/");
            } else {
                toast.error(baseResponse.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-8 col-12">
                        <div className="user_form rounded-2 shadow-lg p-5 text-center">
                            <h5 className="text-center text-dark fw-semibold pb-2">Enter Essential Details</h5>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {() => (
                                    <Form>
                                        <div className="col-12 mb-3">
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Enter your name"
                                                className="w-100 position-relative"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>

                                        <div className="col-12 mb-3">
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className="w-100 position-relative"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>

                                        <div className="col-12 mb-3">
                                            <Field
                                                type="date"
                                                name="dob"
                                                className="w-100 custom-date-input text-secondary date-input"
                                            />
                                            <ErrorMessage name="dob" component="div" className="text-danger" />
                                        </div>
                                        <div className="btn_wrapper text-center">
                                            <button type="submit" className="prim_color_bg text-white btn-effect-1">
                                                Add details
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
