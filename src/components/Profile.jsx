import React from "react";
import "./Dashboard.css";

function Profile({ user }) {
  return (
    <div className="page">

      <h1 className="page-title">My Profile</h1>

      <div className="profile-card">

        <div className="profile-header">

          

          <div>
            <h2>{user.name}</h2>
            <p className="member-text">
              Travel Enthusiast 
            </p>
          </div>

        </div>

        <div className="profile-details">

          <div className="profile-row">
            <span>Name</span>
            <h4>{user.name}</h4>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <h4>{user.email}</h4>
          </div>

          <div className="profile-row">
            <span>Member Since</span>
            <h4>2026</h4>
          </div>

          <div className="profile-row">
            <span>Total Trips</span>
            <h4>12</h4>
          </div>

        </div>

        <button className="edit-btn">
          Edit Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;