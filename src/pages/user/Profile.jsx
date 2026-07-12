import React, { useState } from "react";
import "./Dashboard/Dashboard.css";
import Modal from "../../components/modal";

function Profile({ user }) {
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: "98XXXXXXXX",
    address: "Kathmandu, Nepal",
  });

  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    // Later you can call your backend API here
    setShowModal(false);
  };

  return (
    <div className="page">
      <h1 className="page-title">My Profile</h1>

      <div className="profile-card">
        <div className="profile-header">
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
            <span>Phone</span>
            <h4>{profile.phone}</h4>
          </div>

          <div className="profile-row">
            <span>Address</span>
            <h4>{profile.address}</h4>
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

          <label>Phone</label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
          />

          <label>Address</label>
          <input
            type="text"
            value={profile.address}
            onChange={(e) =>
              setProfile({
                ...profile,
                address: e.target.value,
              })
            }
          />
        </Modal>
      )}
    </div>
  );
}

export default Profile;