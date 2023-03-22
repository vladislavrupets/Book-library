import { useNavigate } from "react-router-dom";

import "./body.css";

const Body = () => {
  return (
    <div className="main-page-body">
      <div className="carousel-container">
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
      </div>
    </div>
  );
};

export default Body;
