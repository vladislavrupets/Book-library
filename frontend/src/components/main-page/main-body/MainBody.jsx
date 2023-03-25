import { useNavigate } from "react-router-dom";

import "./mainBody.css";
import Slider from "../../custom-elements/slider/Slider";
const items = [
  {
    image:
      "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    title: "test",
    description: "Test1 Test2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    title: "test",
    description: "Test1 Test2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    title: "test",
    description: "Test1 Test2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    title: "test",
    description: "Test1 Test2",
  },
];

const MainBody = () => {
  return (
    <div className="main-body">
      <div className="main-body__item">
        <div className="main-body__slider">
          <Slider items={items} type={"small"} />
        </div>
      </div>
      <div className="main-body__item">
        <div className="main-body__slider">
          <Slider items={items} type={"medium"} />
        </div>
      </div>
      <div className="main-body__item">
        <div className="main-body__slider">
          <Slider items={items} type={"large"} />
        </div>
      </div>
    </div>
  );
};

export default MainBody;
