import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";

import Sidebar from "../../../components/Sidebar";

import DashboardHome from "./DashboardHome";
import MyTrips from "../MyTrips";
import Destinations from "../Destinations";
import Hotels from "../Hotels";
import Profile from "../Profile";
import Notifications from "../Notification/Notification";
import Recommendation from "../Recommendation/Recommendation";
import Payment from "../Payment/Payment";
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

           <Route path="Notifications" element={<Notifications />} />

          <Route path="recommendation" element={<Recommendation />} />
<Route path="payment" element={<Payment />} />
          <Route path="profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;