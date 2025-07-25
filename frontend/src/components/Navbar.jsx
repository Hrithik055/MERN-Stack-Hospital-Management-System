import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

//
import { Heart, User } from "lucide-react";
//
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get(
        "https://mern-stack-hospital-management-system-61cw.onrender.com/api/v1/user/patient/logout",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo">
              <Heart className="logo-icon-Medicare" />
              <span className="logo-text">MediCare Hospital</span>
            </div>
            <div className={show ? "navLinks showmenu" : "navLinks"}>
              <nav className="nav">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"/"}
                  onClick={() => setShow(!show)}
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/services"
                  onClick={() => setShow(!show)}
                >
                  Services
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"/doctors"}
                  onClick={() => setShow(!show)}
                >
                  Doctors
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"/appointment"}
                  onClick={() => setShow(!show)}
                >
                  Appointments
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"/about"}
                  onClick={() => setShow(!show)}
                >
                  About
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"/contact"}
                  onClick={() => setShow(!show)}
                >
                  Contact
                </NavLink>
                <div className="login-section">
                  <User className="login-icon" />
                  {/* <span className="login-text">NameABC</span> */}

                  {isAuthenticated ? (
                    <span className="login-text" onClick={handleLogout}>
                      LOGOUT
                    </span>
                  ) : (
                    <span className="login-text" onClick={goToLogin}>
                      LOGIN
                    </span>
                  )}
                </div>
                {/* </div> */}

                <button asChild className="btn-Appointment">
                  <a href="/appointment">Book Appointment</a>
                </button>
              </nav>
            </div>
            <div className="hamburger" onClick={() => setShow(!show)}>
              <GiHamburgerMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
