import { useNavigate } from "react-router-dom";

import "./mainBody.css";
import Slider from "../../custom-elements/slider/Slider";

const slides = [
  "https://klike.net/uploads/posts/2019-05/1556708032_1.jpg",
  "https://vjoy.cc/wp-content/uploads/2019/07/13-1.jpg",
  "https://s3-eu-west-1.amazonaws.com/images.linnlive.com/9e2de4846a0d1e1b62ec42ffbea708c6/1993fa45-b1dc-4d44-b1e3-8b6e0cfb4765.jpg",
];

const Body = () => {
  return (
    <div className="main-page-body">
      <Slider slides={slides} />
      {/* <div className="carousel-container">
        <div className="carousel-slide">
          <div className="carousel__small-item"></div>
          <div className="carousel__small-item"></div>
          <div className="carousel__small-item"></div>
          <div className="carousel__small-item"></div>
        </div>
        <div className="carousel-slide">
          <div className="carousel__small-item"></div>
          <div className="carousel__small-item"></div>
          <div className="carousel__small-item"></div>
          <div className="carousel__small-item"></div>
        </div>
      </div>
      <div className="carousel-container">
        <div className="carousel-slide">
          <div className="carousel__large-item"></div>
        </div>
        <div className="carousel-slide">
          <div className="carousel__large-item"></div>
        </div>
        <div className="carousel-slide">
          <div className="carousel__large-item"></div>
        </div>
        <div className="carousel-slide">
          <div className="carousel__large-item"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Body;
