import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, setUser } from '../features/authSlice';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const OtpPage = ({ numDigits, mobile, user, status }) => {
  const [otp, setOtp] = useState(new Array(numDigits).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(45);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleResendOtpClick = () => {
    setTimer(45);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    setErrorMessage('');
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputsRef.current[index - 1].focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length != numDigits) {
      setErrorMessage(`Please enter a valid ${numDigits}-digit OTP`);
      return;
    }
    else if (user.otp != otpValue) {
      setErrorMessage(`Invalid OTP`);
      return;
    }
    else {
      toast.success("Login successfully");
      if (status == "EXISTS") {
        if (user.name) {
          dispatch(setUserId(user._id));
          const objectModify = { ...user, verfiyStatus:true };
          dispatch(setUser(objectModify));
          setTimeout(() => {
            navigate("/");
          }, 500)
        } else {
          dispatch(setUserId(user._id));
          const objectModify = { ...user, verfiyStatus:false };
          dispatch(setUser(objectModify));
          setTimeout(() => {
            navigate("/user-detail");
          }, 500)
        }
      } else {
        dispatch(setUserId(user._id));
        const objectModify = { ...user, verfiyStatus:false };
        dispatch(setUser(objectModify));
        setTimeout(() => {
          navigate("/user-detail");
        }, 500)
      }
    }
  };

  return (
    <>
      <div className="container-fluid otp_sec bg-light py-lg-0 py-md-0 py-5">
        <div className="container">
          <div className="row otp_row align-items-center justify-content-center">
            <div className="col-lg-6 col-md-8 col-12 text-center shadow-lg rounded-3 p-5 bg-white">
              <div className="">
                <img src="/images/logo.png" alt="" className="img-fluid" />
              </div>
              <p className="fs-6 pt-2">We have sent an otp to +91 {mobile} <span><i class="fa fa-pencil-square-o ms-1" aria-hidden="true"></i></span></p>
              <div className="mt-4 d-flex align-items-center justify-content-center mx-auto">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    style={{
                      width: '40px',
                      height: '40px',
                      fontSize: '18px',
                      textAlign: 'center',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                    }}
                    className="me-2"
                  />
                ))}

              </div>
              {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
                  {errorMessage}
                </div>
              )}

              <button
                onClick={handleVerifyOtp}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px' }}
              >
                Verify OTP
              </button>
              {timer > 0 ? (
                <p style={{ marginTop: '20px' }}>Resend OTP in {timer} seconds</p>
              ) : (
                <button
                  onClick={handleResendOtpClick} className="ms-2"
                  style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#FF5722', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px' }}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
