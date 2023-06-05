import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PermIdentity, Logout } from "@mui/icons-material";

import "./naviBar.css";
import { logout } from "../../../store/authSlice";
import Input from "../../custom-elements/input/Input";

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
        <button className="link-button approve visible">
          <span>Library</span>
        </button>
        <button className="link-button approve visible">
          <span>Top books</span>
        </button>
      </div>
      <Input visibility={true} placeholder="Search" />

      {user?.category === "guest" ? (
        <div className="navi-bar__items-container">
          <div className="navi-bar__item" onClick={() => navigate("/login")}>
            Login
          </div>
        </div>
      ) : (
        <div className="navi-bar__items-container">
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
