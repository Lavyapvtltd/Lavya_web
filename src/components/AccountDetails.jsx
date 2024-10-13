import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_URL, BASE_URL } from '../constants/contant';
import { toast } from 'react-toastify';
import { setUser } from '../features/authSlice';
import axios from 'axios';

const AccountDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
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

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="">
                        <div className="profile_avtar position-relative">
                            <img src="/images/avtar.png" alt="profile" className="img-fluid" />
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
                        onSubmit={async(values) => {
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
