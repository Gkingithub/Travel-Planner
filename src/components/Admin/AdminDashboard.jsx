import React from "react";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {
  return (
  <div className="admin-layout">

    <AdminSidebar />

    <div className="admin-content">

      <h1>Admin Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card">
          <h2>120</h2>
          <p>Total Users</p>
        </div>

        <div className="card">
          <h2>45</h2>
          <p>Total Trips</p>
        </div>

        <div className="card">
          <h2>30</h2>
          <p>Total Bookings</p>
        </div>

        <div className="card">
          <h2>15</h2>
          <p>Feedbacks</p>
        </div>

      </div>

      <div className="recent-section">

        <h2>Recent Activities</h2>

        <table>

          <thead>
            <tr>
              <th>User</th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Ram Sharma</td>
              <td>Pokhara</td>
              <td>Booked</td>
            </tr>

            <tr>
              <td>Sita Rai</td>
              <td>Chitwan</td>
              <td>Completed</td>
            </tr>

            <tr>
              <td>Hari Karki</td>
              <td>Mustang</td>
              <td>Pending</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>
);
}

export default AdminDashboard;