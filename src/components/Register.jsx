import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all fields",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Passwords do not match",
      });
      return;
    }

    // Save user in localStorage
    const user = {
  name,
  email,
  password,
};

localStorage.setItem("registeredUser", JSON.stringify(user));

Swal.fire({
  icon: "success",
  title: "Account Created",
  text: "You have successfully registered!",
}).then(() => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  navigate("/dashboard");
});
  
    // Success alert and redirect
    Swal.fire({
      icon: "success",
      title: "Account Created",
      text: "You have successfully registered!",
      confirmButtonText: "Continue",
    }).then(() => {
      navigate("/dashboard");
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p>Join Yatriq</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Register</button>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;