import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
function HeaderLogin() {
  return (
    <div>
      <nav className="navbar bg-secondary bg-opacity-10 ">
        <div className="container-fluid">
          <a href="/" className="navbar-brand fw-bold logo ps-5">
            <img src={logo} />
          </a>
          <div className="pe-5">
            <Link to="/" className="btn button" type="submit">
              Home
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HeaderLogin;
