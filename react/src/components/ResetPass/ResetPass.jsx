import React, { Component } from 'react'
import "./ResetPass.css"
import HeaderLogin from '../Header/Header'
import { Link } from 'react-router-dom'

export class ResetPass extends Component {
  render() {
    return (
        <div> 
        <HeaderLogin />
        <div className="parent">
            <div className="login-card">
                <div className="card rounded-4" style={{ width: "30rem" }}>
                    <div className="card-body p-3">
                        <h5 className="card-title logo text-center">MediEye</h5>
                        <h6 className="card-subtitle mb-2 text-dark w-800 text-center">
                        Create New Password
                        </h6>
                        <h3 className='text-center w-400 fs-6 py-4 text-body-secondary opacity-75'>Ensure a strong Password, even a new one to protect your account</h3>
                        <form>
                            <input type="password"
                                className="form-control p-2 my-4"
                                placeholder="New password"
                                id="phone" />
                            <input type="password"
                                className="form-control p-2 my-4"
                                placeholder="confirm new password"
                                id="phone" />
                            <button type="submit" className="btn button mb-1 form-control">
                            <Link to="/login" className=" text-light fw-normal text-decoration-none">
                            Save
                            </Link>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default ResetPass
