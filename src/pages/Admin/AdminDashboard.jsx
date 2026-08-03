import React, { useEffect, useState } from "react";
import "./Admin.css";
import AdminSidebar from "../../components/AdminSidebar";
import { getAdminDashboard } from "../../service/adminDashboardService";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalTrips: 0,
    totalBookings: 0,
    totalDestinations: 0,
    totalHotels: 0,
    totalActivities: 0,

    totalRevenue: 0,

    monthlyBookings: [],
    popularDestinations: [],
    tripStatusStats: [],

    latestUsers: [],
    recentBookings: [],
    topHotels: [],
    mostViewedDestinations: [],
  });

  const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  useEffect(() => {
    loadDashboard();
  }, []);

  // const loadDashboard = async () => {
  //   try {

  //     const data = await getAdminDashboard();

  //     console.log("Dashboard:", data);

  //     setDashboard({
  //       totalUsers: data.totalUsers ?? 0,
  //       totalTrips: data.totalTrips ?? 0,
  //       totalBookings: data.totalBookings ?? 0,
  //       totalDestinations: data.totalDestinations ?? 0,
  //       totalHotels: data.totalHotels ?? 0,
  //       totalActivities: data.totalActivities ?? 0,

  //       totalRevenue: data.totalRevenue ?? 0,

  //       monthlyBookings: data.monthlyBookings ?? [],
  //       popularDestinations: data.popularDestinations ?? [],
  //       tripStatusStats: data.tripStatusStats ?? [],

  //       latestUsers: data.latestUsers ?? [],
  //       recentBookings: data.recentBookings ?? [],
  //       topHotels: data.topHotels ?? [],
  //       mostViewedDestinations: data.mostViewedDestinations ?? [],
  //     });

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const loadDashboard = async () => {
    try {
      const data = await getAdminDashboard();

      console.log("Dashboard:", data);

      setDashboard({
        totalUsers: data.totalUsers,
        totalTrips: data.totalTrips,
        totalBookings: data.totalBookings,
        totalDestinations: data.totalDestinations,
        totalHotels: data.totalHotels,
        totalActivities: data.totalActivities,

        totalRevenue: data.totalRevenue,

        monthlyBookings: data.monthlyBookings,
        popularDestinations: data.popularDestinations,
        tripStatusStats: data.tripStatusStats,

        latestUsers: data.latestUsers,
        recentBookings: data.recentBookings,
        topHotels: data.topHotels,
        mostViewedDestinations: data.mostViewedDestinations,
      });
    } catch (err) {
      console.log(err);
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
            <h2>{dashboard.totalBookings}</h2>
            <p>Total Bookings</p>
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

          <div className="card revenue-card">
            <h2>Rs. {dashboard.totalRevenue}</h2>
            <p>Total Revenue</p>
          </div>
        </div>{" "}
        {/* ========================= CHARTS ========================= */}
        <div className="dashboard-charts">
          {/* Monthly Bookings */}

          <div className="chart-card">
            <h3>Monthly Bookings</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboard.monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Popular Destinations */}

          <div className="chart-card">
            <h3>Top Destinations</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboard.popularDestinations || []}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="destination"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={90}
                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="trips" fill="#10b981" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* ========================= TOP HOTELS ========================= */}
        <div className="chart-card">
          <h3>Top Rated Hotels</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Hotel</th>

                <th>Category</th>

                <th>Rating</th>
              </tr>
            </thead>

            <tbody>
              {(dashboard.topHotels || []).map((hotel, index) => (
                <tr key={index}>
                  <td>{hotel.hotelName}</td>

                  <td>{hotel.category}</td>

                  <td>{hotel.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{" "}
        {/* ========================= LATEST USERS ========================= */}
        <div className="chart-card">
          <h3>Latest Users</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {(dashboard.latestUsers || []).map((user, index) => (
                <tr key={index}>
                  <td>{user.fullName}</td>

                  <td>{user.email}</td>

                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ========================= RECENT BOOKINGS ========================= */}
        {
          <div className="chart-card">
            <h3>Recent Bookings</h3>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {(dashboard.recentBookings || []).map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>

                    <td>{booking.user}</td>

                    <td>
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`status ${(booking.status || "").toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

export default AdminDashboard;
