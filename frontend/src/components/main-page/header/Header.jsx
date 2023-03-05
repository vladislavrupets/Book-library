import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return <div onClick={handleLogout}>Logout</div>;
};

export default Header;
