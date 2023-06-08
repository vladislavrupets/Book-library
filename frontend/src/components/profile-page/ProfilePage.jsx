import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "../../store/authSlice";
import "./profilePage.css";

const ProfilePage = () => {
  const { user, status, error } = useSelector((state) => state.auth);

  return (
    <div className="content-container">
      <div className="content-container__header">
        <h2 className="content-container__header-title">My Profile</h2>
      </div>
      <div className="content-container__item">
        <div className="card">
          <div className="card__body">
            <div className="card__body-container--item">
              <div className="card__body-container">
                <h3>Name:</h3>
                <span>{user.full_name}</span>
                <h3>Login:</h3>
                <span>{user.login}</span>
                <h3>Phone number:</h3>
                <span>{user.phone_number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
