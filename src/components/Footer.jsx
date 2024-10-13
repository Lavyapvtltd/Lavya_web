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
                  <p className="fs-6">Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum is dummy text of the printing.</p>
                  <div className="footer-address mt-3">
                    <ul className="p-0 m-0">
                      <li className="mb-2">
                        <div className="footer-address-info">
                          <p className="fs-6"><i className="fa fa-map-marker me-2" aria-hidden="true"></i> Brooklyn, New York, United States</p>
                        </div>
                      </li>
                      <li className="mb-2">
                        <div className="footer-address-info">
                          <p className="fs-6"><a href="tel:+0123-456789"><i className="fa fa-phone me-2" aria-hidden="true"></i> +0123-456789</a></p>
                        </div>
                      </li>
                      <li className="mb-2">
                        <div class="footer-address-info">
                          <p className="fs-6"><a href="mailto:example@example.com"><i className="fa fa-envelope-o me-2" aria-hidden="true"></i>example@example.com</a></p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="social-media_links mt-4 mb-md-0 mb-4">
                    <ul className="p-0 m-0 d-flex align-items-center">
                      <li className="me-3 fs-5"><a href="#" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                      <li className="me-3 fs-5"><a href="#" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                      <li className="me-3 fs-5"><a href="#" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
                      <li className="me-3 fs-5"><a href="#" title="Youtube"><i className="fa fa-youtube"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-sm-6 col-6">
                <div className="footer-widget footer-menu-widget clearfix">
                  <h4 className="footer-title fw-semibold">Company</h4>
                  <div className="footer-menu pt-2">
                    <ul className="p-0 m-0">
                      <li><NavLink to="/about">About</NavLink></li>
                      <li><NavLink to="">Blog</NavLink></li>
                      <li><NavLink to="/product-list">All Products</NavLink></li>
                      <li><NavLink to="">Locations Map</NavLink></li>
                      <li><NavLink to="">FAQ</NavLink></li>
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
                      <li><NavLink to="">Order tracking</NavLink></li>
                      <li><NavLink to="">Wish List</NavLink></li>
                      <li><NavLink to="">Login</NavLink></li>
                      <li><NavLink to="/profile">My account</NavLink></li>
                      <li><NavLink to="/term-conditions">Terms &amp; Conditions</NavLink></li>
                      <li><NavLink to="">Promotional Offers</NavLink></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-6 col-sm-12 col-12">
                <div class="footer-widget footer-newsletter-widget">
                  <h4 class="footer-title mb-3 fw-semibold">Newsletter</h4>
                  <p className="fs-6">Subscribe to our weekly Newsletter and receive updates via email.</p>
                  <div class="footer-newsletter mt-4">
                    <form action="#" className="d-flex align-items-center">
                      <input type="email" name="email" placeholder="Email*" className="w-100 rounded-0" />
                      <div className="btn_box">
                        <button className="rounded-0 prim_color_bg text-white btn-effect-1"><i className="fa fa-paper-plane text-white" aria-hidden="true"></i></button>
                      </div>
                    </form>
                  </div>
                  <div className="paying_app">
                    <h5 className="mt-3 footer-title">We Accept</h5>
                    <div className="shadow-lg">
                      <img src="/images/payment-4.png" className="w-100 img-fluid" alt="Payment Image" />
                    </div>
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
                    <li className="text-white me-3"><a href="#">Terms &amp; Conditions</a></li>
                    <li className="text-white me-3"><a href="#">Claim</a></li>
                    <li className="text-white"><a href="#">Privacy &amp; Policy</a></li>
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
