import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css';

function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials validation
    if (credentials.name === "kishan" && credentials.password === "8874") {
      alert("Login Successful!");
      navigate("/AllItems"); // Navigate to the Admin Page
    } else {
      alert("Invalid Admin Name or Password. Please try again.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="adminlogin-container">
        <h1 className="adminlogin-title">Admin Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Admin Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter admin name"
              className="form-input"
              value={credentials.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter admin password"
              className="form-input"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
          <a className="login-footer" href="/Homepage">Back to Homepage</a>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
