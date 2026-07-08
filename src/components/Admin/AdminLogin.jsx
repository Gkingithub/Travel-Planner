import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Swal from "sweetalert2";
import { loginAdmin } from "../../service/authSerive";
function AdminLogin() {

const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login button clicked");

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Missing Fields",
            text: "Please fill all fields",
        });
        return;
    }

    console.log("Calling login API...");

    try {
        const result = await loginAdmin(email, password);

        console.log(result);

        localStorage.setItem("token", result.data.token);

        Swal.fire({
            icon: "success",
            title: "Login Successful"
        });

        navigate("/admin/dashboard");

    } catch (error) {
        console.error(error);

        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid email or password."
        });
    }
};

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;