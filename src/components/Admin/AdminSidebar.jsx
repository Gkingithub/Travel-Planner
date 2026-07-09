import React from "react";
import { Link ,NavLink} from "react-router-dom";
import "./Admin.css";
import { FaRobot } from "react-icons/fa";
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

        <li>
          <NavLink to="/admin/feedback">
            <FaCommentDots className="menu-icon" />
            Feedback
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/login">
            <FaSignOutAlt className="menu-icon" />
            Logout
          </NavLink>
        </li>
      </ul>

    </div>
  );
}

export default AdminSidebar;