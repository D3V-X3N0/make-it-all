import { Link } from "react-router-dom";
import React from "react";
import "../pages/loginRegister.css";
import AuroraBackground from "../components/auroraBackground.jsx";

export default function Register() {
  return (
    <AuroraBackground>
    <div className="auth-page registration-page main-container">
      <div className="welcome-message">
        <h1>Create your account</h1>
        <p>Fill the form to get started.</p>
      </div>

      <div className="login-container">
        <h2>Register</h2>
        <form onSubmit={(e)=>{e.preventDefault();}}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input id="confirm" name="confirm" type="password" required />
          </div>
          <button type="submit">Create account</button>

          <div className="forgot-password" style={{marginTop:"1rem"}}>
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
      </AuroraBackground>
  );
}
