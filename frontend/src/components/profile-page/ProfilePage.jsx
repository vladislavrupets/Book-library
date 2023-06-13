import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "../../store/authSlice";
import "./profilePage.css";

const ProfilePage = () => {
  const { authInfo, status, error } = useSelector((state) => state.auth);

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
                <span>{authInfo.full_name}</span>
                <h3>Login:</h3>
                <span>{authInfo.login}</span>
                <h3>Phone number:</h3>
                <span>{authInfo.phone_number}</span>
                {authInfo.category === "reader" && (
                  <>
                    <h3>Trust raiting:</h3>
                    <span>{authInfo.trust_rating}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
