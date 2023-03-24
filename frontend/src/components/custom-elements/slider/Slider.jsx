// import React, { useState } from "react";

// import "./slider.css";

// const Slider = ({ slides, title }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const handleNextSlide = () => {
//     setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
//   };

//   const handlePrevSlide = () => {
//     setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
//   };

//   return (
//     <div className="slider">
//       <h2 className="slider__title">{title}</h2>
//       <div className="slider-container">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`slide ${currentSlide === index ? "active" : ""} ${
//               currentSlide < index ? "next" : ""
//             } ${currentSlide > index ? "prev" : ""}`}
//             style={{ backgroundImage: `url(${slide})` }}
//           />
//         ))}
//       </div>
//       <button className="prev" onClick={handlePrevSlide}>
//         &#10094;
//       </button>
//       <button className="next" onClick={handleNextSlide}>
//         &#10095;
//       </button>
//     </div>
//   );
// };

// export default Slider;
// import React, { useState } from "react";
// import "./slider.css";

// const Slider = ({ slides, title }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const handleNextSlide = () => {
//     setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
//   };

//   const handlePrevSlide = () => {
//     setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
//   };

//   return (
//     <div className="slider">
//       <h2 className="slider__title">{title}</h2>
//       <div className="slider-container">
//         {slides.map((slidePair, index) => (
//           <div
//             key={index}
//             className={`slide ${currentSlide === index ? "active" : ""} ${
//               currentSlide < index ? "next" : ""
//             } ${currentSlide > index ? "prev" : ""}`}
//           >
//             <div
//               className="slide-image"
//               style={{ backgroundImage: `url(${slidePair[0]})` }}
//             />
//             <div
//               className="slide-image"
//               style={{ backgroundImage: `url(${slidePair[1]})` }}
//             />
//           </div>
//         ))}
//       </div>
//       <button className="prev" onClick={handlePrevSlide}>
//         &#10094;
//       </button>
//       <button className="next" onClick={handleNextSlide}>
//         &#10095;
//       </button>
//     </div>
//   );
// };

// export default Slider;

import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./slider.css";
import { Image } from "semantic-ui-react";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 3,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

const images = [
  "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
];

const Slider = ({ slides }) => {
  const [loadedImages, setLoadedImages] = useState(0);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return (
    <>
      <Carousel
        deviceType="desktop"
        itemClass="image-item"
        responsive={responsive}
      >
        {images.map((image) => {
          return (
            <Image
              style={{ width: "100%", height: "100%" }}
              src={image}
              alt="slide"
              onLoad={handleImageLoad}
            />
          );
        })}
      </Carousel>
      {loadedImages !== images.length && <div>Loading...</div>}
    </>
  );
};

export default Slider;
