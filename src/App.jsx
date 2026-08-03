import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// User Pages
import Home from "./pages/user/Home/Home";
import Login from "./pages/user/Login/Login";
import Register from "./pages/user/Register/Register";
import Dashboard from "./pages/user/Dashboard/Dashboard";
import Notifications from "./pages/user/Notification/Notification";
import Payment from "./pages/user/Payment/Payment";
// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageTrips from "./pages/Admin/ManageTrips";
import ManageHotels from "./pages/Admin/ManageHotels";
import ManageActivities from "./pages/Admin/ManageActivities";
import ManageRecommendations from "./pages/Admin/ManageRecommendation";
import ManageBookings from "./pages/Admin/ManageBooking";
import BookingHistory from "./pages/Admin/BookingHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* User Dashboard (Nested Routes) */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute role="User">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute role="Admin">
              <ManageBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="Admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trips"
          element={
            <ProtectedRoute role="Admin">
              <ManageTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hotels"
          element={
            <ProtectedRoute role="Admin">
              <ManageHotels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/activities"
          element={
            <ProtectedRoute role="Admin">
              <ManageActivities />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/booking-history"
          element={
            <ProtectedRoute role="Admin">
              <BookingHistory />
            </ProtectedRoute>
          }
        />
        <Route
    path="notifications"
    element={<Notifications />}
/>
        <Route
          path="/admin/recommendation"
          element={
            <ProtectedRoute role="Admin">
              <ManageRecommendations />
            </ProtectedRoute>
          }
        />
        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
