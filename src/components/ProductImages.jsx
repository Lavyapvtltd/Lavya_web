import React, { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../constants/contant";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductImages = ({ images = [{ filename: "" }] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="d-flex product_detail_img_bx position-relative align-items-center">
      <div className="d-flex flex-md-column gap-3 flex-row me-2 justify-content-md-start justify-content-center product_detail_sideImg mb-md-0 mb-5">
        {images.map((curElm, index) => (
          <button
            type="button"
            key={index}
            className={`border border-transparent p-0 shadow-none mb-2 overflow-hidden rounded-2 ${
              index === currentIndex ? "border-primary" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={`${IMAGE_BASE_URL}${curElm.filename}`}
              alt="thumbnail"
              width={70}
              height={70}
              className="rounded-2 img-fluid"
            />
          </button>
        ))}
      </div>
      <div className="main_side_screen position-relative w-100 h-100 overflow-hidden rounded-2 mb-md-0 mb-3">
    
        <img
          src={`${IMAGE_BASE_URL}${images[currentIndex]?.filename}`}
          alt="mainimage"
          width={330}
          height={330}
          className="img-fluid side_main_img w-100 rounded-2"
        />

        <div className="position-absolute top-0 h-100 w-100 d-flex justify-content-between align-items-center">
        <button
          onClick={handlePrev}
          className="btn bg-white shadow rounded-circle p-2 d-flex align-items-center justify-content-center"
          style={{ zIndex: 3,height:'40px',width:'40px' }}
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="btn bg-white shadow rounded-circle p-2 d-flex align-items-center justify-content-center"
          style={{ zIndex: 3,height:'40px',width:'40px' }}
        >
          <FaChevronRight size={20} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
