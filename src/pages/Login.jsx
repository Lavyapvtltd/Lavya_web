import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL, API_URL } from '../constants/contant';
import OtpPage from '../components/Otp';

const Login = () => {
  const [toggleReferralCode, setToggleReferralCode] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [user,setUser] = useState({});
  const [status,setStatus] = useState("EXISTS");

  const formik = useFormik({
    initialValues: {
      contact: '',
      referral_code: '',
    },
    validationSchema: Yup.object({
      contact: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
      referral_code: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${BASE_URL}${API_URL.OTP_BY_CONTACT}`, values);
        const result = res.data;
        const { baseResponse, response } = result;
        if (baseResponse.status) {
          setUser(response);
          console.log(baseResponse.status)
          setStatus(baseResponse.status);
          setShowOtpInput(true); 
        } else {
          toast.error('Failed to log in');
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleContactChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      formik.setFieldValue('contact', value);
    }
  };

  const handleToggleReferralCode = () => {
    setToggleReferralCode(!toggleReferralCode);
  };

  return (
    <>
      {!showOtpInput ? (
        <div className="container-fluid login_form py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h1>
                    Sign In <br />
                    To Your Account
                  </h1>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
                    Sit aliquid, Non distinctio vel iste.
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-5 col-md-6 col-12">
                <div className="side_img">
                  <img
                    src="/images/delivery-login-img.webp"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-12">
                <div className="account-login-inner">
                  <form onSubmit={formik.handleSubmit} className="ltn__form-box contact-form-box">
                  <div className="mb-3">
                    <div className="flag_input d-flex mb-1 align-items-center">
                      <div className="flag_img me-2">
                        <img src="/images/flag.webp" alt="flag" className="img-fluid" />
                      </div>
                      <input
                        type="text"
                        name="contact"
                        placeholder="Phone"
                        className="w-100 border-0"
                        value={formik.values.contact}
                        onChange={handleContactChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.contact && formik.errors.contact ? (
                        <div className="error text-danger fs-6">{formik.errors.contact}</div>
                      ) : null}

                  </div>

                    {toggleReferralCode && (
                      <div className="mb-3">
                        <input
                          type="text"
                          name="referral_code"
                          placeholder="Referral Code (optional)"
                          className="w-100"
                          value={formik.values.referral_code}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    )}

                    <div className="col-12 referal_code text-center">
                      <div 
                        className="text-decoration-underline prim_color"
                        onClick={handleToggleReferralCode}
                      >
                        {toggleReferralCode ? 'Hide referral code' : 'Have a referral code?'}
                      </div>
                    </div>

                    <div className="col-12 mt-3">
                      <button
                        type="submit"
                        className="btn-effect-1 theme-btn-1 prim_color_bg text-white w-100 rounded-2 py-2"
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <p className="#000">
                        By Signing in you agree to <br />{" "}
                        <a href="#" className="fw-bold">
                          Tnc
                        </a>{" "}
                        and{" "}
                        <a href="#" className="fw-bold">
                          Privacy &amp; Policy
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="otp-container">
         <OtpPage user={user} numDigits={6} mobile={user.contact} status={status}/>
        </div>
      )}
    </>
  );
};

export default Login;
