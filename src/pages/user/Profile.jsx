import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Dashboard/Dashboard.css";
import Modal from "../../components/modal";

import {
  getProfile,
  updateProfile,
} from "../../service/profileService";

import { getDashboard } from "../../service/dashboardService";

const API_URL = "http://localhost:5055"; // Change if your API uses a different port

function Profile() {
  const [profile, setProfile] = useState({
    userId: 0,
    name: "",
    email: "",
    profileImage: "",
    imageFile: null,
    createdAt: "",
  });

  const [dashboard, setDashboard] = useState({
    totalTrips: 0,
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProfile();
    loadDashboard();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();

      if (response.success) {
        setProfile({
          userId: response.data.userId,
          name: response.data.name,
          email: response.data.email,
          profileImage: response.data.profileImage || "",
          imageFile: null,
          createdAt: response.data.createdAt,
        });
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch {
      Swal.fire("Error", "Unable to load profile.", "error");
    }
  };

  const loadDashboard = async () => {
    try {
      const response = await getDashboard();

      if (response.success) {
        setDashboard(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("FullName", profile.name);
      formData.append("Email", profile.email);

      if (profile.imageFile) {
        formData.append("ProfileImage", profile.imageFile);
      }

      const response = await updateProfile(formData);

      if (response.success) {
        Swal.fire(
          "Success",
          "Profile updated successfully.",
          "success"
        );

        setShowModal(false);
        loadProfile();
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Unable to update profile.",
        "error"
      );
    }
  };

  return (
    <div className="page">

      <h1 className="page-title">My Profile</h1>

      <div className="profile-card">

        <div className="profile-header">

          <img
            src={
              profile.profileImage
                ? `${API_URL}${profile.profileImage}`
                : "/default-avatar.png"
            }
            alt="Profile"
            className="profile-image"
          />

          <div>
            <h2>{profile.name}</h2>
            <p className="member-text">
              Travel Enthusiast
            </p>
          </div>

        </div>

        <div className="profile-details">

          <div className="profile-row">
            <span>Name</span>
            <h4>{profile.name}</h4>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <h4>{profile.email}</h4>
          </div>

          <div className="profile-row">
            <span>Member Since</span>
            <h4>
              {profile.createdAt
                ? new Date(profile.createdAt).getFullYear()
                : "-"}
            </h4>
          </div>

          <div className="profile-row">
            <span>Total Trips</span>
            <h4>{dashboard.totalTrips}</h4>
          </div>

        </div>

        <button
          className="edit-btn"
          onClick={() => setShowModal(true)}
        >
          Edit Profile
        </button>

      </div>

      {showModal && (
        <Modal
          title="Edit Profile"
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        >

          <label>Name</label>

          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
          />

          <label>Email</label>

          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
          />

          <label>Profile Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfile({
                ...profile,
                imageFile: e.target.files[0],
              })
            }
          />

          {profile.imageFile && (
            <img
              src={URL.createObjectURL(profile.imageFile)}
              alt="Preview"
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: "50%",
                marginTop: 15,
              }}
            />
          )}

        </Modal>
      )}

    </div>
  );
}

export default Profile;