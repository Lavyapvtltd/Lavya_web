import React from "react";

const FreeDeliveryProgress = ({ subTotal, freeDeliveryAmount }) => {
  const remainingAmount = freeDeliveryAmount - subTotal;
  const progress = Math.min((subTotal / freeDeliveryAmount) * 100, 100);
  const isQualified = subTotal >= freeDeliveryAmount;

  return (
    <div
      className="mt-2 p-3"
      style={{
        border: "1px solid #309a20",
        borderRadius: "8px",
        backgroundColor: "#e8f5e9",
        color: "#309a20",
        fontSize: "14px",
        fontWeight: "500",
      }}
    >
      {isQualified ? (
        // 🎉 Show Congratulations Message when offer is unlocked 🎉
        <div style={{ textAlign: "center", fontSize: "16px", fontWeight: "bold", color: "#2c7c1a" }}>
          🎉 Congratulations! You have unlocked **Free Delivery!** 🎉
        </div>
      ) : (
        <>
          {/* Free Delivery Message with Icon */}
          <div className="mb-2" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            Add items worth ₹{remainingAmount} more to enjoy free delivery!
            <img 
              src="/images/free.png" 
              alt="Free Delivery" 
              style={{ height: "24px", width: "24px" }}
            />
          </div>

          {/* Progress Bar & Price in the Same Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Progress Bar */}
            <div
              style={{
                flex: 1,
                height: "10px",
                backgroundColor: "#d4edda",
                borderRadius: "5px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#309a20",
                  transition: "width 0.5s ease-in-out",
                }}
              ></div>
            </div>

            {/* Price on the Right */}
            <div style={{ color: "#309a20", fontWeight: "bold", minWidth: "60px" }}>
              ₹{subTotal} / ₹{freeDeliveryAmount}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FreeDeliveryProgress;
