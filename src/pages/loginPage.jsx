import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "../pages/loginRegister.css";
import AuroraBackground from "../components/auroraBackground.jsx";

export default function Login({ setAuth }) {
  const navigate = useNavigate();

  // store form data and error message
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // hardcoded values for the prototype
  const users = [
    { email: "manager@make-it-all.co.uk", password: "admin123" },
    { email: "employee@make-it-all.co.uk", password: "user123" },
  ];

  // handling input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // login logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // clear old errors

    const foundUser = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (foundUser) {
      alert(`Welcome back, ${foundUser.email}!`);

      // store authentication status in localStorage
      localStorage.setItem("isAuthenticated", "true");

      // update App state (so routes re-render immediately)
      if (setAuth) setAuth(true);

      // redirect to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  // rendering of the login form
  return (
    <AuroraBackground>
    <div className="auth-page login-page main-container">
      <div className="welcome-message">
        <h1>Welcome</h1>
        <p>Please log in to continue</p>
      </div>

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p style={{ color: "rgba(240,71,71,0.9)", textAlign: "center" }}>
              {error}
            </p>
          )}

          <button type="submit">Login</button>

          <div className="forgot-password" style={{ marginTop: "1rem" }}>
            <Link to="/register">No account? Register</Link>
          </div>
        </form>
      </div>
    </div>
      </AuroraBackground>
  );
}
