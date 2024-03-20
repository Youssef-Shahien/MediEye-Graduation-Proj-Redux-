import React from 'react'
import "./ForgetPass.css";
import HeaderLogin from "../Header/Header";
import { Link } from 'react-router-dom';

const ForgetPass = () => {
  return (
    <div> 
        <HeaderLogin />
        <div className="parent">
            <div className="login-card">
                <div className="card rounded-4" style={{ width: "25rem" }}>
                    <div className="card-body p-3">
                        <h5 className="card-title logo text-center">MediEye</h5>
                        <h6 className="card-subtitle mb-2 text-dark w-800 text-center">
                        Forget your Password
                        </h6>
                        <h3 className='text-center w-400 fs-6 py-4 text-body-secondary opacity-75'>please enter your phone to recive averification</h3>
                        <form>
                            <input type="tel"
                                className="form-control p-2 my-4"
                                placeholder="Phone"
                                id="phone" />
                            <button type="submit" className="btn button mb-1 form-control">
                                Send
                            </button>
                            <p className='py-2'>
                                Already have an account 
                                <Link to="/signup" className="text-decoration-none fs-5   ms-2">
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

export default ForgetPass
