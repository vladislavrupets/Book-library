import React from "react";

import "./profilePage.css";

const ProfilePage = () => {
  return (
    <div className="content-container">
      <div className="content-container__item">
        <div className="page-header">
          <h3>My profile</h3>
        </div>
      </div>
      <div className="content-container__item">
        <div className="user-info">
          <div className="info-container">
            <p>Full name</p>
            <p>test</p>
          </div>
          <div className="info-container">
            <p>Login</p>
            <p>test</p>
          </div>
          <div className="info-container">
            <p>Phone</p>
            <p>1111</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
