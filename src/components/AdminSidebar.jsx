import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../pages/Admin/Admin.css";
import { FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaMapMarkedAlt,
  FaMagic,
  FaRunning,
  FaHotel,
  FaCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";
function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser"); // if you use this key anywhere

    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>

      <ul>
        <li>
          <NavLink to="/admin/dashboard">
            <FaTachometerAlt className="menu-icon" />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/users">
            <FaUsers className="menu-icon" />
            Manage Users
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/trips">
            <FaMapMarkedAlt className="menu-icon" />
            Manage Trips
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/recommendation">
            <FaMagic className="menu-icon" />
            Recommendation
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/activities">
            <FaRunning className="menu-icon" />
            Manage Activities
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/hotels">
            <FaHotel className="menu-icon" />
            Manage Hotels
          </NavLink>
        </li>

        {/* <li>
          <NavLink to="/admin/feedback">
            <FaCommentDots className="menu-icon" />
            Feedback
          </NavLink>
        </li> */}
        <li>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="menu-icon" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
