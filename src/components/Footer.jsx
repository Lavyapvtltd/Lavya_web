import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, BASE_URL } from '../constants/contant';


const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscibe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return toast.error("Please fill in the email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email");
    }
    try {
      const data = {
        email: email
      }
      const res = await axios.post(
        `${BASE_URL}${API_URL.SUBSCRIBE_USER}`,
        data
      );
      const result = res.data;
      const { baseResponse, response } = result;
      if (baseResponse.status == 1) {
        toast.success(baseResponse.message);
        setEmail("");
      } else {
        toast.error(baseResponse.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <div className="container-fluid bg-dark newsletter-section my-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="newsletter-content mx-auto">
                <div className="text-white text-center">
                  <h2 className="newsletter-heading mb-3 fw-semibold">We make your inbox better</h2>
                  <p className="mb-4">Sign up to our newsletter to receive grooming tips, style inspiration,
                    exclusive access to pre-launch product pricing and more.</p>

                </div>
                <form action="#">
                  <div className="d-flex align-items-center">
                    <input type="email" className="form-control p-3 rounded-0 border-0" style={{ borderRadius: '4px 0 0 4px' }} name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn prim_color_bg text-white p-3" style={{ borderRadius: '0 4px 4px 0' }} type="button" onClick={handleSubscibe}>SUBSCRIBE</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-5">
        <div className="container-fluid footer_upper py-5">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-sm-6 col-12">
                <div className="footer-widget footer-about-widget">
                  <div className="footer-logo mb-2">
                    <div className="site-logo">
                      <img src="/images/logo.png" alt="Logo" />
                    </div>
                  </div>
                  <p className="fs-6">Discover a world of purity and taste at our premium dairy store, where we offer a wide range of fresh and high-quality milk products, made from the finest ingredients.</p>

                  <div className="social-media_links mt-3 mb-md-0 mb-4">
                    <ul className="p-0 m-0 d-flex align-items-center">
                      <li className="me-3 fs-5"><NavLink to="https://www.facebook.com/profile.php?id=61564893940430&mibextid=ZbWKwL" title="Facebook" target="_blank"><i className="fa fa-facebook"></i></NavLink></li>
                      <li className="me-3 fs-5"><NavLink to="https://www.instagram.com/lavyaorganic?igsh=enNsaWVmOTlzMmlk" title="Instagram" target="_blank"><i className="fa fa-instagram"></i></NavLink></li>
                      <li className="me-3 fs-5"><NavLink to="https://youtube.com/@lavyaorganic?si=b4NzYkazmtnOnLEt" title="Youtube" target="_blank"><i className="fa fa-youtube"></i></NavLink></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-sm-6 col-6">
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title fw-semibold">Company</h4>
                  <div className="footer-menu pt-2">
                    <ul className="p-0 m-0">
                      <li><NavLink to="/">Home</NavLink></li>
                      <li><NavLink to="/about">About</NavLink></li>
                      <li><NavLink to="/product-list">All Products</NavLink></li>
                      <li><NavLink to="/contact">Contact us</NavLink></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-sm-6 col-6">
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title fw-semibold">Services</h4>
                  <div className="footer-menu pt-2">
                    <ul className="p-0 m-0">
                      <li><NavLink to="/order-history">Order tracking</NavLink></li>
                      <li><NavLink to="/login">Login</NavLink></li>
                      <li><NavLink to="/profile">My account</NavLink></li>
                      <li><NavLink to="/term-conditions">Terms &amp; Conditions</NavLink></li>
                      <li><NavLink to="">Promotional Offers</NavLink></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-6 col-sm-12 col-12">
                <div class="footer-widget footer-newsletter-widget">
                  <h4 class="footer-title mb-3 fw-semibold">We Accept</h4>
                  <div className="paying_app">
                    <div className="shadow-lg">
                      <img src="/images/payment-4.png" className="w-100 img-fluid" alt="Payment Image" />
                    </div>
                  </div>
                  <div className="footer-address mt-3">
                    <ul className="p-0 m-0">
                      <li className="mb-2">
                        <div className="footer-address-info">
                          <p className="fs-6"><i className="fa fa-map-marker me-2" aria-hidden="true"></i>Lavya Organic and Technology Village Tinkiruri Teh MUNDAWAR District Alwar Rajasthan</p>
                        </div>
                      </li>
                      <li className="mb-2">
                        <div className="footer-address-info">
                          <p className="fs-6"><a href="tel:+0123-456789"><i className="fa fa-phone me-2" aria-hidden="true"></i> +91 7665153666</a></p>
                        </div>
                      </li>
                      <li className="mb-2">
                        <div class="footer-address-info">
                          <p className="fs-6"><a href="mailto:example@example.com"><i className="fa fa-envelope-o me-2" aria-hidden="true"></i>info@mylavya.com</a></p>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid copyRight_box prim_color_bg py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="copyright_txt clearfix text-md-start text-center">
                  <p className="fs-6 text-white">All Rights Reserved @ Company <span class="current-year">{new Date().getFullYear()}</span></p>
                </div>
              </div>
              <div className="col-md-6 col-12 align-self-center d-flex justify-content-md-end justify-content-center">
                <div className="services_btm">
                  <ul className="p-0 m-0 d-flex align-items-center">
                    <li className="text-white me-3"><NavLink to="/term-conditions">Terms &amp; Conditions</NavLink></li>
                    <li className="text-white me-3"><NavLink to="/term-conditions">Claim</NavLink></li>
                    <li className="text-white"><NavLink to="/term-conditions">Privacy &amp; Policy</NavLink></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer
