import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux';
import { API_URL, BASE_URL } from '../constants/contant';
import axios from "axios";
import { toast } from 'react-toastify';
import { fetchRatingAsync } from '../features/ratingSlice';
import moment from 'moment/moment';
import Spinner from './Spinner';


const RatingReview = ({ product_id, order_id }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.auth.user_id);
    const { ratings, status } = useSelector((state) => state.ratings);
    const avg_rating = ratings.length > 0
        ? (ratings.reduce((total, item) => total + item.rating, 0) / ratings.length).toFixed(1)
        : 0;
    const initialValues = {
        rating: '',
        description: '',
        saveInfo: false,
    };

    const validationSchema = Yup.object({
        rating: Yup.string().required('Rating is required'),
        description: Yup.string().required('Description is required'),
    });

    const onSubmit = async (values,{ resetForm }) => {
        values.user_id = user_id;
        values.order_id = order_id;
        try {
            setLoading(true);
            const res = await axios.post(
                `${BASE_URL}${API_URL.ADD_RATING}${product_id}`,
                values
            );
            const result = res.data;
            const { baseResponse, response } = result;
            if (baseResponse.status == 1) {
                setLoading(false);
                toast.success(baseResponse.message);
                dispatch(fetchRatingAsync(product_id));
                resetForm();
            } else {
                setLoading(false);
                toast.error("Something went wrong");
            }
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong");
        }
    };
    useEffect(() => {
        dispatch(fetchRatingAsync(product_id));
    }, [])
    return (
        <>
            <div className="col-12">
                <div className="reviews_box">
                    <div className="head_rewis pb-4">
                        <h6 className="fw-semibold">Customer reviews</h6>
                        <div className="product-ratting">
                            <ul className="d-flex align-items-center p-0 m-0">
                                {
                                    [...Array(Math.floor(avg_rating))].map((_, i) => (
                                        <li className="me-1" key={i}>
                                            <a href="#" tabIndex="0">
                                                <i className="fa fa-star"></i>
                                            </a>
                                        </li>
                                    ))
                                }
                                {
                                    avg_rating % 1 !== 0 && (
                                        <li className="me-1">
                                            <a href="#" tabIndex="0">
                                                <i className="fa fa-star-half"></i>
                                            </a>
                                        </li>
                                    )
                                }
                                <span className='ms-1 prim_color'>({avg_rating} reviews)</span>
                            </ul>
                        </div>

                    </div>
                    <div className="client_reviews pt-4">
                        <div className="row gy-5">
                            <div className="col-lg-6">
                                {
                                    status == "loading" ? (
                                        <Spinner />
                                    ) : (
                                        ratings?.length > 0 ? (
                                            ratings?.map((item, index) => (
                                                <div className="client_sec d-flex align-items-center pt-4" key={index}>
                                                    <div className='col-3 client_img overflow-hidden'>
                                                        <a href="">
                                                            <img src="/images/dummy-image.jpg" alt="" className="img-fluid" />
                                                        </a>
                                                    </div>
                                                    <div className="client_content ms-3">
                                                        <div className='d-md-flex align-items-center justify-content-between'>
                                                            <a href="#" className='fw-semibood'><h6 className='mb-1'>{item?.user?.name}</h6></a>
                                                            <div className='my-md-0 my-3'><span className='border px-3 py-2 rounded-pill date_review'>{moment(item.createdAt).format("Do MMM YY")}</span></div>
                                                        </div>
                                                        <div className="product-ratting">
                                                            <ul className="d-flex align-items-center p-0 m-0">
                                                                {
                                                                    [...Array(Math.floor(item.rating))].map((_, i) => (
                                                                        <li className="me-1" key={i}>
                                                                            <a href="#" tabIndex="0">
                                                                                <i className="fa fa-star"></i>
                                                                            </a>
                                                                        </li>
                                                                    ))
                                                                }
                                                                {
                                                                    item.rating % 1 !== 0 && (
                                                                        <li className="me-1">
                                                                            <a href="#" tabIndex="0">
                                                                                <i className="fa fa-star-half"></i>
                                                                            </a>
                                                                        </li>
                                                                    )
                                                                }
                                                            </ul>
                                                        </div>
                                                        <p className='text_clip_para'>{item.description}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div>
                                                <p>Rating & Review not found</p>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                            {
                                order_id && <div className="col-lg-6">
                                    <div className="review_form">
                                        <div className="review-details rounded-2 p-5">
                                            <h4 className="fw-bold mb-2">Add Your Review</h4>
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={validationSchema}
                                                onSubmit={onSubmit}
                                            >
                                                {({ values, setFieldValue }) => (
                                                    <Form className="mt-4">
                                                        <div className="product-ratting d-flex align-items-center">
                                                            <p className="text-dark me-2">Your rating:</p>
                                                            <ul className="d-flex align-items-center p-0 m-0">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <li className="me-1" key={star}>
                                                                        <div
                                                                            onClick={() => setFieldValue('rating', star)}
                                                                            tabindex="0"
                                                                        >
                                                                            <i
                                                                                className={`fa fa-star${star <= values.rating ? '' : '-o'
                                                                                    }`}
                                                                            ></i>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <ErrorMessage name="rating" component="div" className="text-danger" />
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="form-group mb-4">
                                                                    <Field
                                                                        as="textarea"
                                                                        className="form-control border-0 rounded-2"
                                                                        placeholder="Type Something here.."
                                                                        name="description"
                                                                        rows="5"
                                                                        id="comment"
                                                                    />
                                                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            <div className="form-check my-4 d-flex align-items-center">
                                                                <Field
                                                                    className="form-check-input mt-0 me-2"
                                                                    type="checkbox"
                                                                    name="saveInfo"
                                                                    id="flexCheckDefault"
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    style={{ fontSize: '14px' }}
                                                                    htmlFor="flexCheckDefault"
                                                                >
                                                                    Save my name, email, and website in this browser for the next time I comment.
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <button disabled={loading} type="submit" className="prim_color_bg text-white btn-effect-1">
                                                                    {loading && <div className="spinner-border me-2" style={{ borderWidth: '3px', height: '1rem', width: '1rem' }} role="status">
                                                                        <span className="visually-hidden">Loading...</span>
                                                                    </div>}Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RatingReview;
