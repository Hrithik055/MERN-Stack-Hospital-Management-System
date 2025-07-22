import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
  Heart,
  UserPlus,
  ArrowLeft,
  Shield,
  Clock,
  HeadphonesIcon,
} from "lucide-react";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://mern-stack-hospital-management-system-61cw.onrender.com/api/v1/user/patient/register",
          { firstName, lastName, email, phone, nic, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
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
      <div className="register">
        <Link to="/" className="back-home-link">
          <ArrowLeft className="back-icon" />
          Back to Home
        </Link>

        <div className="register-container">
          {/* Header */}
          <div className="register-header">
            <div className="header-icon">
              <Heart className="heart-icon" />
            </div>
            <h1 className="header-title">MediCare System</h1>
            <p className="header-subtitle">Hospital Management Platform</p>
          </div>

          {/* Register Card */}
          <div className="register-card">
            <div className="register-card-header">
              <h2 className="register-card-title">
                <UserPlus className="icon" />
                Create Your Account
              </h2>
              <p className="card-description">
                Join our hospital management platform
              </p>
            </div>

            <form onSubmit={handleRegistration} className="register-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    // required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    // required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    // required
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile Number"
                    // required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>NIC *</label>
                  <input
                    type="text"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    placeholder="NIC"
                    // required
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    // required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    // required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    // required
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="form-terms checkbox-row">
                <input
                  type="checkbox"
                  id="terms"
                  // required
                  className="checkbox"
                />
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the{" "}
                  <Link to="/terms" className="link">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="link">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button type="submit" className="submit-btn">
                Create Account
              </button>

              <div className="login-redirect">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="link">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Feature Cards */}
          <div className="feature-cards">
            <div className="feature-card">
              <Shield className="feature-icon" />
              <div className="feature-title">Secure</div>
              <div className="feature-description">HIPAA Compliant</div>
            </div>
            <div className="feature-card">
              <Clock className="feature-icon" />
              <div className="feature-title">24/7</div>
              <div className="feature-description">Always Available</div>
            </div>
            <div className="feature-card">
              <HeadphonesIcon className="feature-icon" />
              <div className="feature-title">Support</div>
              <div className="feature-description">Expert Help</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
