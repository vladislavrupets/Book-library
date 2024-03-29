import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  PermIdentity,
  Logout,
  CollectionsBookmarkOutlined,
} from "@mui/icons-material";

import "./naviBar.css";
import { logout } from "../../../store/authSlice";
import Input from "../../custom-elements/input/Input";

const Header = () => {
  const dispatch = useDispatch();
  const { authInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/login");
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
        <button
          className="link-button approve visible"
          onClick={() => navigate("/")}
        >
          <span>Library</span>
        </button>
      </div>
      <div className="navi-bar__items-container">
        <Input visibility={true} placeholder="Search" />
      </div>
      {authInfo?.category === "guest" ? (
        <div className="navi-bar__items-container">
          <div className="navi-bar__item" onClick={() => navigate("/login")}>
            Login
          </div>
        </div>
      ) : (
        <div className="navi-bar__items-container">
          <button
            className="link-button approve visible"
            onClick={() => navigate(`/borrowings-list/${authInfo?.login}`)}
          >
            <CollectionsBookmarkOutlined />
            <span>My Borrowings</span>
          </button>
          <button
            className="link-button approve visible"
            onClick={() => navigate("/profile")}
          >
            <PermIdentity />
            <span>My profile</span>
          </button>

          <button className="link-button cancel visible" onClick={handleLogout}>
            <Logout />
            <span>Log out</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
