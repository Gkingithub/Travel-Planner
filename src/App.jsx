import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageUsers from "./components/Admin/ManageUsers";
import ManageTrips from "./components/Admin/ManageTrips";
import ManageHotels from "./components/Admin/ManageHotels";
import ManageActivities from "./components/Admin/ManageActivities";
import Recommendation from "./components/Recommendation";
import ManageRecommendations from "./components/Admin/ManageRecommendation";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";

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