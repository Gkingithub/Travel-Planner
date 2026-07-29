import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );


  // User not logged in
  if (!user) {

    if(role === "Admin"){
      return <Navigate to="/admin/login" replace />;
    }

    return <Navigate to="/login" replace />;
  }


  // Wrong role
  if(role && user.userType !== role){

    if(user.userType === "Admin"){
      return <Navigate to="/admin/dashboard" replace />;
    }

    if(user.userType === "User"){
      return <Navigate to="/dashboard" replace />;
    }

  }


  return children;
}

export default ProtectedRoute;