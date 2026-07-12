import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { register } from "../../../service/authSerive";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Reusable Enter key handler
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form.elements, e.target);

      // Move to the next field
      if (form.elements[index + 1]) {
        form.elements[index + 1].focus();
      } else {
        // Submit if this is the last field
        form.requestSubmit();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);

      Swal.fire({
        icon: "success",
        title: "Account Created",
      });

      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p>Join YatriQ</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleEnter}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEnter}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleEnter}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={handleEnter}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

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