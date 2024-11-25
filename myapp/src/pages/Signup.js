import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Signup.css";

function SignupPage() {
  // State to store form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Validation: Ensure all fields are filled
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }

    // Validation: Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulate saving the data (could be replaced with an API call)
    localStorage.setItem("userData", JSON.stringify(formData));

    alert("Sign Up Successful!");

    // Navigate to the login page
    navigate("/Login");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">Fill in your details below</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="form-input"
              value={formData.name}
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
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="signup-footer">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
