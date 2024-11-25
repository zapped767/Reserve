import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Login.css";

function LoginPage() {
  // State to store form input
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve stored user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    // Validation: Check if the entered credentials match the stored user data
    if (
      storedUserData &&
      storedUserData.name === formData.userName &&
      storedUserData.email === formData.email &&
      storedUserData.password === formData.password
    ) {
      alert("Login Successful!");
      // Navigate to the home page
      navigate("/Homepage");
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Log in to your account</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your user name"
              className="form-input"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-input"
              value={formData.email}
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
              placeholder="Enter your password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/Signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
