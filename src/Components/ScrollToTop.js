import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showTopBtn) return "";

  return (
    <div
      style={{
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "40px",
        backgroundColor: "var(--base-color-pink)",
        position: "fixed",
        bottom: "0",
        right: "0",
        marginRight: "32px",
        marginBottom: "32px",
        cursor: "pointer",
      }}
    >
      <i
        className="fa-solid fa-arrow-up"
        onClick={goToTop}
        style={{
          color: "white",
          fontSize: "32px",
        }}
      ></i>
    </div>
  );
};
export default ScrollToTop;
