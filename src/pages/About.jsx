import React from 'react'
import { NavLink } from 'react-router-dom';

const About = () => {
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
                    About
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid about-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="img_hover rounded-2">
                <img src="/images/about.jpg" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12 ps-lg-3 pe-lg-5 pt-lg-0 pt-md-4 pt-4">
              <div className="about-content">
                <h6 className="know-more fw-semibold">Know More About Shop</h6>
                <h2 className="fw-semibold about-heading ">Trusted Organic Food Store</h2>
                <div className="about-para ps-4 my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                </div>
                <p className="mt-4">sellers who aspire to be good, do good, and spread goodness. We democratic, self-sustaining, two-sided marketplace which thrives on trust and is built on community and quality content.</p>
                <h5>Jerry henson</h5>
                <p >/Shop Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default About;
