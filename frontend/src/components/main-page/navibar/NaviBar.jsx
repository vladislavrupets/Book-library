import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PermIdentity, Logout } from "@mui/icons-material";

import "./naviBar.css";
import { logout } from "../../../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
        <div className="navi-bar__logo" onClick={() => navigate("/")}>
          Book Library
        </div>
        <button className="link-button approve">
          <span className="link-button__content">Library</span>
        </button>
        <button className="link-button approve">
          <span className="link-button__content">Top books</span>
        </button>
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
          <button
            className="link-button approve"
            onClick={() => navigate("/profile")}
          >
            <PermIdentity />
            <span className="link-button__content">My profile</span>
          </button>
          <button className="link-button cancel" onClick={handleLogout}>
            <Logout />
            <span className="link-button__content">Log out</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
