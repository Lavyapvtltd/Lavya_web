import React from "react";
import { ShimmerDiv } from "shimmer-effects-react";

const SliderShimmer = () => {
  return (
    <div id="carouselExampleCaptions" className="main_slider carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {[...Array(3)].map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {[...Array(3)].map((_, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <div 
              className="d-flex justify-content-center align-items-center" 
              style={{width:"100%"}}
            >
              <ShimmerDiv height={500} width="100%" mode="light" className="d-none d-lg-block" />
              <ShimmerDiv height={350} width="100%" mode="light" className="d-none d-md-block d-lg-none" />
              <ShimmerDiv height={200} width="100%" mode="light" className="d-block d-md-none" />
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default SliderShimmer;
