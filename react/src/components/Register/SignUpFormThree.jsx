import React from 'react'
import { Link } from 'react-router-dom'
import HeaderLogin from '../Header/Header'

function SignUpFormThree() {
  return (<>
    <HeaderLogin />
    <div className="parent">
        <div className="login-card">
        <div className="card" style={{ width: "22rem" }}>
        <div className="card-body">
          <h5 className="card-title logo text-center">MediEye</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary text-center fw-bold">
            Sign Up
          </h6>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Company Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Company Phone"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Derlivery Area"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Company Working hours"
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Company Manager Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Company Manager Phone"
              />
            </div>
            <div className="d-flex flex-column gap-2">
              <Link to="/login" type="submit" className="btn button">
                Next
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
  )
}

export default SignUpFormThree