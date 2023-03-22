import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./naviBar.css";
import { logout } from "../../../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navi-bar">
      <div className="navi-bar__items-container">
        <div className="navi-bar__logo">Book Library</div>
        <div className="navi-bar__item">Library</div>
        <div className="navi-bar__item">Top books</div>
      </div>
      <div>Search books</div>

      {user?.category === "guest" ? (
        <div className="navi-bar__items-container">
          <div className="navi-bar__item" onClick={() => navigate("/login")}>
            Login
          </div>
        </div>
      ) : (
        <div className="navi-bar__items-container">
          <div className="navi-bar__item">Account</div>
          <div className="navi-bar__item" onClick={handleLogout}>
            Log out
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
