import React from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../Header/Header";

function SignUpFormFour() {
  return (<>
    <HeaderLogin />
    <div className="parent">
        <div className="login-card">
          <div className="card" style={{ width: "22rem" }}>
          <div className="card-body">
            <h5 className="card-title logo text-center">MediMatch</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary text-center fw-bold">
              Sign Up
            </h6>
            <p className="card-subtitle my-2 text-dark text-start fw-bold">
              Official Company Data
            </p>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Commercial register
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company Name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Tax Card
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Company Phone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Company license
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Derlivery Area"
                />
              </div>
    
              <div className="d-flex flex-column gap-2">
                <Link to="/login" type="submit" className="btn button">
                  Sign Up
                </Link>
                <Link to="/signup" type="submit" className="btn button">
                Back
                </Link>
              </div>
            </form>
          </div>
          </div>
        </div>
    </div>    
    </>
  );
}

export default SignUpFormFour;
