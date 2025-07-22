import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  User,
  Shield,
  Clock,
  HeadphonesIcon,
} from "lucide-react";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://mern-stack-hospital-management-system-61cw.onrender.com/api/v1/user/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="login-page">
        <Link to="/" className="back-link">
          <ArrowLeft className="back-icon" />
          Back to Home
        </Link>

        <div className="login-container">
          <div className="login-header">
            <div className="login-logo">
              <Heart className="logo-icon" />
            </div>
            <h1 className="system-title">MediCare System</h1>
            <p className="system-subtitle">Hospital Management Platform</p>
          </div>

          <div className="login-card">
            <div className="card-header">
              <div className="card-title">
                <User className="title-icon" />
                Welcome Back
              </div>
              <div className="card-description">
                Sign in to access your hospital dashboard
              </div>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="doctor@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  // required
                />
              </div>

              <button type="submit" className="submit-btn">
                Sign In
              </button>

              <div className="form-links">
                <Link to="/forgot-password" className="link">
                  Forgot your password?
                </Link>
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" className="link">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="feature-cards">
            <div className="feature-card">
              <Shield className="feature-icon" />
              <div className="feature-title">Secure</div>
              <div className="feature-desc">HIPAA Compliant</div>
            </div>
            <div className="feature-card">
              <Clock className="feature-icon" />
              <div className="feature-title">24/7</div>
              <div className="feature-desc">Always Available</div>
            </div>
            <div className="feature-card">
              <HeadphonesIcon className="feature-icon" />
              <div className="feature-title">Support</div>
              <div className="feature-desc">Expert Help</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
