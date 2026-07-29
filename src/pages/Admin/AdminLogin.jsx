import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginAdmin } from "../../service/authSerive";
function AdminLogin() {

const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

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
Swal.fire({
    icon:"success",
    title:"Login Successful"
}).then(()=>{
    navigate("/admin/dashboard");
});

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
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
</div>

          <button type="submit">Login</button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;