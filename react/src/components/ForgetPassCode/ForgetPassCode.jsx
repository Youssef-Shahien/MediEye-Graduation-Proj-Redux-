import React, { Component } from 'react'
import HeaderLogin from '../Header/Header'
import { Link } from 'react-router-dom'
import "./ForgetPassCode.css";

export class ForgetPassCode extends Component {
  render() {
    return (
        <div> 
        <HeaderLogin />
        <div className="parent">
            <div className="login-card">
                <div className="card rounded-4" style={{ width: "27rem" }}>
                    <div className="card-body p-3">
                        <h5 className="card-title logo text-center">MediEye</h5>
                        <h6 className="card-subtitle mb-2 text-dark w-800 text-center">
                        Forget your Password
                        </h6>
                        <h3 className='text-center w-400 fs-6 py-4 text-body-secondary opacity-75'>please enter the digit code send to<br/> 012222222222 </h3>
                        <form className='text-center g-1 m-auto'>
                            <input type="number"
                                className="mb-2 text-center me-3 m-auto w-15 border-end-0 border-top-0 border-start-0"
                                placeholder="#"
                                id="" />
                                <input type="number"
                                className="mb-2 text-center me-3 m-auto w-15 border-end-0 border-top-0 border-start-0"
                                placeholder="#"
                                id="" />
                                <input type="number"
                                className="mb-2 text-center me-3 m-auto w-15 border-end-0 border-top-0 border-start-0"
                                placeholder="#"
                                id="" />
                                <input type="number"
                                className=" mb-2 text-center me-3 m-auto w-15 border-end-0 border-top-0 border-start-0"
                                placeholder="#"
                                id="" />
                                <input type="number"
                                className="mb-2 text-center  w-15 border-end-0 border-top-0 border-start-0"
                                placeholder="#"
                                id="" />
                            <button type="submit" className="btn button my-3 form-control">
                            <Link to="/ResetPass" className=" text-light text-decoration-none">
                            Check
                            </Link>
                            </button>
                            <i className='fas fa-clock fa-1x'><span className='small ms-1'>0:59</span></i>
                            <p className='py-2'>
                                Already have an account 
                                <Link to="/signup" className="text-decoration-none fw-bold fs-5   ms-2">
                                Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default ForgetPassCode
