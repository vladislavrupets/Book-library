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
        <div className="link-button approve">
          <span className="link-button__content">Library</span>
        </div>
        <div className="link-button approve">
          <span className="link-button__content">Top books</span>
        </div>
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
          <div className="link-button approve">
            <PermIdentity />
            <span
              className="link-button__content"
              onClick={() => navigate("/profile")}
            >
              My profile
            </span>
          </div>
          <div className="link-button cancel" onClick={handleLogout}>
            <Logout />
            <span className="link-button__content">Log out</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
