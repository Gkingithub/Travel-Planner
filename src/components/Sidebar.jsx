import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSuitcase,
  FaMapMarkedAlt,
  FaHotel,
  FaUser,
  FaSignOutAlt,
  FaRobot,
} from "react-icons/fa";

function Sidebar({ logout }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>YATRIQ</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FaHome className="menu-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/trips"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FaSuitcase className="menu-icon" />
            <span>My Trips</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/destinations"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FaMapMarkedAlt className="menu-icon" />
            <span>Destinations</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/hotels"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FaHotel className="menu-icon" />
            <span>Hotels</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/recommendation"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FaRobot className="menu-icon" />
            <span>Recommendation</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FaUser className="menu-icon" />
            <span>Profile</span>
          </NavLink>
        </li>

        <li>
          <button className="sidebar-link logout-btn" onClick={logout}>
            <FaSignOutAlt className="menu-icon" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;