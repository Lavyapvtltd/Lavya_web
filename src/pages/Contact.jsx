import React from 'react'
import { NavLink } from 'react-router-dom'

const Contact = () => {
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
                    <p className="mb-1">info@webmail.com</p>
                    <p className="mb-0">jobs@webexample.com</p>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="details-box text-center rounded-1">
                    <div>
                      <img src="/images/call.png" className="img-fluid" style={{ height: '56px' }} alt="" />
                    </div>
                    <h6 className="my-2 fw-semibold">Email Address</h6>
                    <p className="mb-1">info@webmail.com</p>
                    <p className="mb-0">jobs@webexample.com</p>
                  </div>
                </div>
                <div className="col-md-4 col-12">
                  <div className="details-box text-center rounded-1">
                    <div>
                      <img src="/images/location.png" className="img-fluid" style={{ height: '56px' }} alt="" />
                    </div>
                    <h6 className="my-2 fw-semibold">Email Address</h6>
                    <p className="mb-1">info@webmail.com</p>
                    <p className="mb-0">jobs@webexample.com</p>
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

                <form action="#">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12 mb-4">
                      <input type="text" placeholder="Enter your name" className=" input-name p-3 w-100 position-relative" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 mb-4">
                      <input type="text" placeholder="Enter email address" className=" input-name p-3 w-100 position-relative" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 mb-4">
                      <select className="form-select p-3 rounded-2" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 mb-4">
                      <input type="text" placeholder="Enter phone number" className=" input-name p-3 w-100 position-relative" />
                    </div>
                    <div className="form-group">
                      <textarea className="form-control rounded-2" placeholder="Enter Message" rows="5" id="comment"></textarea>
                    </div>

                    <div className="form-check my-4 d-flex">
                      <input className="form-check-input mt-0 me-2" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Save my name, email, and website in this browser for the next time I comment.
                      </label>
                    </div>
                    <div className='mt-3 text-md-start text-center'>
                      <button className="prim_color_bg text-white btn-effect-1">Get An Free Service</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
