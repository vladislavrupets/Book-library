import React, { useState } from "react";

import "./slider.css";

const Slider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div className="slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${currentSlide === index ? "active" : ""} ${
              currentSlide < index ? "next" : ""
            } ${currentSlide > index ? "prev" : ""}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </div>
      <button className="prev" onClick={handlePrevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={handleNextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
