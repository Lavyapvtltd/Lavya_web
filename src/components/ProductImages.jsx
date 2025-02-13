import React, { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../constants/contant";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const ProductImages = ({ images = [{ filename: "" }] }) => {
  const [open, setOpen] = useState(false);
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

  const slides = images.map((img) => ({
    src: `${IMAGE_BASE_URL}${img.filename}`,
  }));

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
          src={slides[currentIndex]?.src}
          alt="mainimage"
          width={330}
          height={330}
          className="img-fluid side_main_img w-100 rounded-2"
          onClick={() => setOpen(true)}
        />
        <button
          onClick={handlePrev}
          className="btn bg-white position-absolute start-0 shadow rounded-circle p-2 d-flex align-items-center justify-content-center"
          style={{
            zIndex: 3,
            height: "40px",
            width: "40px",
            top: "50%",
            transform: "translateY(-50%)", 
          }}
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="btn bg-white position-absolute end-0 shadow rounded-circle p-2 d-flex align-items-center justify-content-center"
          style={{
            zIndex: 3,
            height: "40px",
            width: "40px",
            top: "50%",
            transform: "translateY(-50%)", 
          }}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides} 
          index={currentIndex} 
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 3, 
            zoomInMultiplier: 2, 
          }}
        />
      )}
    </div>
  );
};

export default ProductImages;
