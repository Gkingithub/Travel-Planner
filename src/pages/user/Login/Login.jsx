import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

import { login } from "../../../service/authSerive";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reusable Enter key handler
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);

      // Move to next input
      if (form.elements[index + 1]) {
        form.elements[index + 1].focus();
      } else {
        // Submit if it's the last field
        form.requestSubmit();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all fields",
      });
      return;
    }

    try {
      const result = await login(email, password);

      localStorage.setItem("token", result.data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>YatriQ</h2>
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
              onKeyDown={handleEnter}
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
                onKeyDown={handleEnter}
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