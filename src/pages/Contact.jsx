import React from 'react'
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_URL, BASE_URL } from '../constants/contant';
import axios from "axios";

const Contact = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .min(10, 'Phone number should be at least 10 digits')
      .required('Phone number is required'),
    message: Yup.string().required('Message is required'),
  });
  return (
    <>
      <div className="container-fluid breadcrumb py-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                <ol className="breadcrumb m-0 d-flex justify-content-center">
                  <li className="breadcrumb-item">
                    <NavLink to="/" className='text-decoration-underline'>Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0 py-3">
        <div className="col-12">
          <div className="w-100">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16946.52956521223!2d76.61337156756933!3d27.53268690527922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39729b517cdc9839%3A0xa586c6902a59e9aa!2sD%20Mart!5e0!3m2!1sen!2sin!4v1726296470995!5m2!1sen!2sin" width="100%" height="450" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>

      <div className="container-fluid contact-details py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-12">
              <div className="row gy-4">
                <div className="col-md-4 col-12">
                  <div className="details-box text-center rounded-1">
                    <div>
                      <img src="/images/mail.png" className="img-fluid" style={{ height: '56px' }} alt="" />
                    </div>
                    <h6 className="my-2 fw-semibold">Email Address</h6>
                    <p className="mb-1 text_clip_para_1">info@mylavya.com</p>
                    {/* <p className="mb-0">jobs@webexample.com</p> */}
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="details-box text-center rounded-1">
                    <div>
                      <img src="/images/call.png" className="img-fluid" style={{ height: '56px' }} alt="" />
                    </div>
                    <h6 className="my-2 fw-semibold">Contact Number</h6>
                    <p className="mb-1">+91 7665153666</p>
                    {/* <p className="mb-0">jobs@webexample.com</p> */}
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="details-box text-center rounded-1">
                    <div>
                      <img src="/images/location.png" className="img-fluid" style={{ height: '56px' }} alt="" />
                    </div>
                    <h6 className="my-2 fw-semibold">Address</h6>
                    <p className="mb-1 text_clip_para_1">Lavya Organic and Technology Village Tinkiruri Teh MUNDAWAR District Alwar Rajasthan</p>
                    {/* <p className="mb-0">jobs@webexample.com</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="container-fluid contact-form py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-form-details rounded-2 p-md-5 p-3">
                <h4 className="fw-semibold mb-3">Get A Quote</h4>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    saveInfo: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values,{resetForm}) => {
                    try {
                      const res = await axios.post(
                        `${BASE_URL}${API_URL.CONTACT_FORM}`,
                        values
                      );
                      const result = res.data;
                      const { baseResponse, response } = result;
                      if (baseResponse.status == 1) {
                        toast.success("Form submit successfully");
                        resetForm();
                      }
                      else {
                        toast.error(baseResponse.message);
                      }
                    } catch (error) {
                      toast.error("Something went wrong");
                    }
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-12 mb-4">
                          <Field
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="input-name p-3 w-100 position-relative"
                          />
                          <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>

                        <div className="col-lg-6 col-md-6 col-12 mb-4">
                          <Field
                            type="text"
                            name="email"
                            placeholder="Enter email address"
                            className="input-name p-3 w-100 position-relative"
                          />
                          <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <div className="col-lg-12 col-md-12 col-12 mb-4">
                          <Field
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            className="input-name p-3 w-100 position-relative"
                          />
                          <ErrorMessage name="phone" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                          <Field
                            as="textarea"
                            name="message"
                            placeholder="Enter Message"
                            className="form-control rounded-2"
                            rows="5"
                          />
                          <ErrorMessage name="message" component="div" className="text-danger" />
                        </div>

                        <div className="form-check my-4 d-flex">
                          <Field
                            type="checkbox"
                            name="saveInfo"
                            className="form-check-input mt-0 me-2"
                          />
                          <label className="form-check-label" htmlFor="saveInfo">
                            Save my name, email, and website in this browser for the next time I comment.
                          </label>
                        </div>

                        <div className="mt-3 text-md-start text-center">
                          <button type="submit" className="prim_color_bg text-white btn-effect-1">
                            Get A Free Service
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
