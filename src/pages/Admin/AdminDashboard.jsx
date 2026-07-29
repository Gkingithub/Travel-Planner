import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "../../components/AdminSidebar";
import { getAdminDashboard } from "../../service/adminDashboardService";

function AdminDashboard() {

  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalTrips: 0,
    totalDestinations: 0,
    totalHotels: 0,
    totalActivities: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getAdminDashboard();

      if (response.success) {
        setDashboard(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        <h1>Admin Dashboard</h1>

        <div className="dashboard-cards">

          <div className="card">
            <h2>{dashboard.totalUsers}</h2>
            <p>Total Users</p>
          </div>

          <div className="card">
            <h2>{dashboard.totalTrips}</h2>
            <p>Total Trips</p>
          </div>

          <div className="card">
            <h2>{dashboard.totalDestinations}</h2>
            <p>Total Destinations</p>
          </div>

          <div className="card">
            <h2>{dashboard.totalHotels}</h2>
            <p>Total Hotels</p>
          </div>

          <div className="card">
            <h2>{dashboard.totalActivities}</h2>
            <p>Total Activities</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;