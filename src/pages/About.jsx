import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="container-fluid breadcrumb py-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav
                style={{ "--bs-breadcrumb-divider": "'>'" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb m-0 d-flex justify-content-center">
                  <li className="breadcrumb-item">
                    <NavLink to="/" className="text-decoration-underline">
                      Home
                    </NavLink>
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
                <img
                  src="/images/advertisement/dairy_three.png"
                  alt="About Lavya"
                  className="img-fluid"
                  style={{height:"420px"}}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12 ps-lg-3 pe-lg-5 pt-lg-0 pt-md-4 pt-4">
              <div className="about-content">
                <h6 className="know-more fw-semibold">Know More About LAVYA</h6>
                <h2 className="fw-semibold about-heading">
                  Quality Organic Milk Products You Can Trust
                </h2>
                <div className="about-para ps-4 my-4">
                  LAVYA is a brainchild of Lavya Organic & Technology. It is an
                  initiative of Zhakasindia to let the entire world savour
                  Rajasthani sweets, especially Kalakand.
                </div>
                <p className="mt-4">
                  Our treasure is the "love and support" of our customers. With
                  that, we have created premium sweet products. We maintain
                  extremely high hygiene standards in our production unit
                  situated in Alwar, Rajasthan.
                </p>
                <p className="mt-4">
                  The strategic position of our production unit helps us procure
                  pure organic milk for our delicate sweets. Quality is our
                  highest priority, and all items we produce meet the demands
                  and high expectations of our customers.
                </p>
              </div>
            </div>
            <div className="about-content">
              <div className="col-lg-12 col-md-12 col-12">
                <p className="mt-4">
                  Our sweets are made with pure ghee and organic milk in a
                  completely vegetarian environment. Produced daily, our sweets
                  ensure premium taste and maximum freshness.LAVYA’s handpicked
                  ingredients guarantee that the taste, texture, and appeal of our
                  products are of the highest standard, using age-old recipes from
                  Alwar, Rajasthan. We believe that the niche skill required to
                  make the finest sweets is the pillar of our business. We
                  encourage our workforce to improve daily to attain world-class
                  status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
