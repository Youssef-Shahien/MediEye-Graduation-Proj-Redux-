import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function HeaderLogin() {
  const navigate = useNavigate();

  const HomeButtonHandler = () => {
    localStorage.clear(); // Clear all items from localStorage
    navigate("/"); // Redirect to home
    window.location.reload(); // Refresh the page
  };

  return (
    <div>
      <nav className="navbar bg-secondary bg-opacity-10">
        <div className="container-fluid">
          <div className="navbar-brand fw-bold logo ps-5">
            <img src={logo} alt="Logo" />
          </div>
          <div className="pe-5">
            <button className="btn button" onClick={HomeButtonHandler}>
              Home
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HeaderLogin;
