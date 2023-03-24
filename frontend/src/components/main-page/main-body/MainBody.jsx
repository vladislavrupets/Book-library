import { useNavigate } from "react-router-dom";

import "./mainBody.css";
import Slider from "../../custom-elements/slider/Slider";

const slides = [
  "https://klike.net/uploads/posts/2019-05/1556708032_1.jpg",
  "https://vjoy.cc/wp-content/uploads/2019/07/13-1.jpg",
  "https://s3-eu-west-1.amazonaws.com/images.linnlive.com/9e2de4846a0d1e1b62ec42ffbea708c6/1993fa45-b1dc-4d44-b1e3-8b6e0cfb4765.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrTuyVvRpS-lz4Rg4jVaT9P7iKAx3T2vK5Q&usqp=CAU",
];

const Body = () => {
  return (
    <div className="main-body">
      <div className="main-body__item">
        <div className="main-body__slider">
          <Slider slides={slides} title={"Test"} />
        </div>
      </div>
    </div>
  );
};

export default Body;
