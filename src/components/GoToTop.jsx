import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    let heightToHidden = 20;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          className="btn btn-upper-top btn-success rounded-circle position-fixed"
          style={{
            width: "40px",
            height: "40px",
            bottom: "100px",
            right: "28px",
            zIndex: "999",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "gototop 1.2s linear infinite alternate-reverse",
            backgroundColor:"#309a20"
          }}
          onClick={goToBtn}
        >
          <FaArrowUp />
        </button>
      )}

      <style>
        {`
          @keyframes gototop {
            0% {
              transform: translateY(-0.5rem);
            }
            100% {
              transform: translateY(1rem);
            }
          }
          
          @media (max-width: 576px) {
            .btn-upper-top {
              right: 0;
            }
          }
        `}
      </style>
    </>
  );
};

export default GoToTop;
