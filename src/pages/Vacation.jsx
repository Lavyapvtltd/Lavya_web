import React, { useEffect } from 'react';
import { fetchVacationsAsync, setVacations } from '../features/vacationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from "axios";
import { BASE_URL,API_URL } from '../constants/contant';

// Yup validation schema
const VacationSchema = Yup.object().shape({
    start_date: Yup.date()
        .required('Start date is required')
        .max(Yup.ref('end_date'), 'Start date cannot be after the end date'),
    end_date: Yup.date()
        .required('End date is required')
        .min(Yup.ref('start_date'), 'End date cannot be before the start date'),
});

const Vacation = () => {
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.auth.user_id);
    const vacations = useSelector(state => state.vacations.vacations);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
        return formattedDate;
    }

    useEffect(() => {
        dispatch(fetchVacationsAsync(user_id));
    }, [dispatch, user_id]);

    const handleEndVacation = async(vacation_id)=>{
        try {
            const res = await axios.delete(`${BASE_URL}${API_URL.DELETE_VACATION}${vacation_id}`);
            const result = res.data;
            const { baseResponse, response } = result;
            if (baseResponse.status == "1") {
                toast.success('Vacation delete successfully');
                dispatch(fetchVacationsAsync(user_id));
            }
          } catch (error) {
           toast.error("Something went wrong");
          }
    }

    const handleSubmit = async(values,{ resetForm }) => {
        try {
            const res = await axios.post(`${BASE_URL}${API_URL.ADD_VACATIONS}${user_id}`, values);
            const result = res.data;
            const { baseResponse, response } = result;
            if (baseResponse.status==1) {
                dispatch(setVacations(response));
                resetForm();
                toast.success("Vacation added successfully");
            } else {
              toast.error(baseResponse.message);
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    };

    return (
        <>
            <div className="container-fluid contact-form vacation_form py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 col-12">
                            <div className="contact-form-details rounded-2 p-5 bg-white">
                                <h4 className="fw-semibold mb-4 text-center">Vacation Planner</h4>
                                <Formik
                                    initialValues={{ start_date: "", end_date: "" }}
                                    validationSchema={VacationSchema}  // Adding Yup validation
                                    onSubmit={handleSubmit}
                                >
                                    {() => (
                                        <Form>
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-12 mb-4">
                                                    <Field type="date" name="start_date" className="p-3 w-100 position-relative" style={{width:"100% !important",minWidth:"100% !important"}} min={new Date(Date.now()).toISOString().split('T')[0]}/>
                                                    <ErrorMessage name="start_date" component="div" className="text-danger" />
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-12 mb-4">
                                                    <Field type="date" name="end_date" className="p-3 w-100 position-relative" style={{width:"100% !important",minWidth:"100% !important"}} min={new Date(Date.now()).toISOString().split('T')[0]} />
                                                    <ErrorMessage name="end_date" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                            <div className='mt-3 w-100 text-center'>
                                                <button type="submit" className="prim_color_bg text-white btn-effect-1">
                                                    Submit
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8 col-12">
                            <div className="vacation_list">
                                {vacations?.length > 0 ? (
                                    vacations?.map((vacation, index) => (
                                        <ul key={index} className="py-3 px-4 m-0 d-flex align-items-center rounded-2 justify-content-between mb-2">
                                            <li>
                                                <div>
                                                    <h6 className='prim_color'>Start Date</h6>
                                                    <p>{formatDate(vacation.start_date)}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <h6 className='prim_color'>End Date</h6>
                                                    <p>{formatDate(vacation.end_date)}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <button type='button' className='border-0 shadow-none' style={{ background: 'none', color: "red" }} onClick={()=>{handleEndVacation(vacation._id)}}>End Vacation</button>
                                            </li>
                                        </ul>
                                    ))
                                ) : (
                                    <div className="row justify-content-center">
                                        <div className="col-lg-6 col-md-8 col-12">
                                            <img src="/images/vacation.png" alt="No Vacation Found" className="img-fluid w-100" style={{ height: '400px', objectFit: 'contain' }} />
                                            <div className="col-12 text-center mt-2">
                                                <h3 className='fw-semibold'>No Vacation Found</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="submit-btn mt-3 text-center">
                                                    <NavLink to="/" className="prim_color_bg text-white btn-effect-1">
                                                        Back to Home
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Vacation;
