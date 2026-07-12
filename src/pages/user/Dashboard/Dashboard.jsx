import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Sidebar from "../../../components/Sidebar";
import DashboardHome from "./DashboardHome";
import MyTrips from "../MyTrips";
import Destinations from "../Destinations";
import Hotels from "../Hotels";
import BudgetPlanner from "../BudgetPlanner";
import Profile from "../Profile";
import Recommendation from "../Recommendation/Recommendation";

import { Link } from "react-router-dom";
import "./Dashboard.css";


function Dashboard() {
  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");

  const user =
    JSON.parse(localStorage.getItem("loggedInUser")) || {
      name: "Guest",
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

      <Sidebar
        active={active}
        setActive={setActive}
        logout={logout}
      />

      <div className="dashboard-content">

        {active === "dashboard" && (
          <DashboardHome user={user} />
        )}

        {active === "trips" && (
          <MyTrips />
        )}

        {active === "destinations" && (
          <Destinations />
        )}

        {active === "hotels" && (
          <Hotels />
        )}

        {active === "budget" && (
          <BudgetPlanner />
        )}

        {active === "profile" && (
          <Profile user={user} />
        )}

         {active === "recommendation" && (
          <Recommendation />
        )}


        

      </div>

    </div>
  );
}

export default Dashboard;