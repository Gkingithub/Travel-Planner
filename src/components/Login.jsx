import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

import{login} from "../service/authSerive";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e) => {
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
        const result = await login(email, password);
        localStorage.setItem("token", result.data.token);
        console.log(result);

        Swal.fire({
            icon: "success",
            title: "Login Successful"
        });

        navigate("/dashboard");
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
    <div className="login-container">
      <div className="login-card">
        <h2>Yatriq</h2>
        <p>Plan your perfect journey</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-group password-group">
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <button type="submit">Login</button>

          <p className="register">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>

          <p className="register">
            <Link to="/">← Back to Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
}


export default Login;