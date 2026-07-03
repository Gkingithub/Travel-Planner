import React from "react";
import {
  FaHome,
  FaSuitcase,
  FaMapMarkedAlt,
  FaHotel,
  FaWallet,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ active, setActive, logout }) {
  return (
    <div className="sidebar">

      <div className="logo">
        <h2>AI Travel Planner</h2>
      </div>

      <ul>

        <li
          className={active === "dashboard" ? "active" : ""}
          onClick={() => setActive("dashboard")}
        >
          <FaHome />
          <span>Dashboard</span>
        </li>

        <li
          className={active === "trips" ? "active" : ""}
          onClick={() => setActive("trips")}
        >
          <FaSuitcase />
          <span>My Trips</span>
        </li>

        <li
          className={active === "destinations" ? "active" : ""}
          onClick={() => setActive("destinations")}
        >
          <FaMapMarkedAlt />
          <span>Destinations</span>
        </li>

        <li
          className={active === "hotels" ? "active" : ""}
          onClick={() => setActive("hotels")}
        >
          <FaHotel />
          <span>Hotels</span>
        </li>

        <li
          className={active === "budget" ? "active" : ""}
          onClick={() => setActive("budget")}
        >
          <FaWallet />
          <span>Budget Planner</span>
        </li>

        <li
          className={active === "profile" ? "active" : ""}
          onClick={() => setActive("profile")}
        >
          <FaUser />
          <span>Profile</span>
        </li>

      </ul>

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;