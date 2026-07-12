import Home from "./pages/user/Home/Home";
import Login from "./pages/user/Login/Login";
import Register from "./pages/user/Register/Register";
import Dashboard from "./pages/user/Dashboard/Dashboard";
import DashboardHome from "./pages/user/Dashboard/DashboardHome";
import Recommendation from "./pages/user/Recommendation/Recommendation";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageTrips from "./pages/Admin/ManageTrips";
import ManageHotels from "./pages/Admin/ManageHotels";
import ManageActivities from "./pages/Admin/ManageActivities";
import ManageRecommendations from "./pages/Admin/ManageRecommendation";
import AdminLogin from "./pages/Admin/AdminLogin";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/recommendation" element={<Recommendation />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/login" element={<AdminLogin/>}/>
      
      <Route path="/admin/users" element={<ManageUsers />} />
      
      <Route path="/admin/trips" element={<ManageTrips />} />

      <Route path="/admin/hotels" element={<ManageHotels />} />

      <Route path="/admin/activities"element={<ManageActivities />}/>

      <Route path="/admin/recommendation"element={<ManageRecommendations />}/>

      

      
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;