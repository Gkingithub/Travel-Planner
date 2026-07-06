import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (!savedUser) {
    Swal.fire({
      icon: "error",
      title: "No Account Found",
      text: "Please register first.",
    });
    return;
  }

  if (
    savedUser.email !== email ||
    savedUser.password !== password
  ) {
    Swal.fire({
      icon: "error",
      title: "Invalid Credentials",
      text: "Incorrect email or password.",
    });
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(savedUser));

  await Swal.fire({
    icon: "success",
    title: "Login Successful",
    text: `Welcome ${savedUser.name}!`,
    timer: 1500,
    showConfirmButton: false,
  });

  navigate("/dashboard");
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