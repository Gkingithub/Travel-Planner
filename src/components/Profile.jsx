import React from "react";
import "./Dashboard.css";

function Profile({ user }) {
  return (
    <div className="page">

      <h1>My Profile</h1>

      <div className="profile-card">

       {/* <img
          src="/profile.png"
          alt="Profile"
          className="profile-image"
        />
        */}
      

        <div className="profile-info">

          <h2>{user.name}</h2><br></br>

          <p>
            <strong>Email:</strong> {user.email}
          </p><br></br>

          <p>
            <strong>Member Since:</strong> 2026
          </p>

          <button className="edit-btn">
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;