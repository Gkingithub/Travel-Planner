import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";

import Sidebar from "../../../components/Sidebar";

import DashboardHome from "./DashboardHome";
import MyTrips from "../MyTrips";
import Destinations from "../Destinations";
import Hotels from "../Hotels";
import Profile from "../Profile";
import Recommendation from "../Recommendation/Recommendation";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) || {
      name: "",
      email: "",
    };

  const logout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedInUser");
        navigate("/");
      }
    });
  };

  return (
    <div className="dashboard-container">
      <Sidebar logout={logout} />

      <div className="dashboard-content">
        <Routes>
          <Route index element={<DashboardHome user={user} />} />

          <Route path="trips" element={<MyTrips />} />

          <Route path="destinations" element={<Destinations />} />

          <Route path="hotels" element={<Hotels />} />

          

          <Route path="recommendation" element={<Recommendation />} />

          <Route path="profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;