import React from "react";

const ScrollToTrialPack = () => {
  const scrollToSection = () => {
    const section = document.getElementById("milk-trial-pack");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToSection}
      style={{
        position: "fixed",
        left: "20px",
        bottom: "3%",
        backgroundColor: "#309a20",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "25px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.3s ease",
        zIndex: "999",
      }}
      onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    >
      <span role="img" aria-label="milk">🥛</span> Milk Trial Pack
    </button>
  );
};

export default ScrollToTrialPack;
