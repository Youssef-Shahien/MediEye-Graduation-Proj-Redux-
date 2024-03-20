import React, { useState } from "react";
import "./Login.css";
import { Link, json, useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/Header";

export default function Login() {
  let item = JSON.parse(localStorage.getItem('phar'))
  let err=''
  const navigate = useNavigate()
  let [email,setEmail]=useState('');
  let [pass,setPass]=useState('');
// console.log(item.email,email)
  
  return (
    <div>
      <HeaderLogin />
      <div className="parent">
        <div className="login-card">
        <div className="card rounded-4" style={{ width: "25rem" }}>
        <div className="card-body">
          <h5 className="card-title logo text-center">MediEye</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary text-center">
            Login into Your Account
          </h6>
          <form onSubmit={()=>handelLogin({email},{pass})}>
            
              <input
                type="email"
                className="form-control p-2 my-4"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            
              <input
                type="password"
                className="form-control p-2 mb-1"
                placeholder="Paswword"
                id="pass"
                value={pass}
                onChange={(e)=> setPass(e.target.value)}
                />
            
              <Link to="/forgetPass" className="text-danger text-small d-flex justify-content-end small text-decoration-none mb-3">forget the password?</Link>
              <div>{err}</div>
              <button type="submit" className="btn button mb-1 form-control">
                Log In
              </button>
              
              <p>
                You don't have account yet ?
                <Link to="/signup" className="text-decoration-underline   ms-2">
                  Sign up
                </Link>
              </p>
            
          </form>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
  function handelLogin(email,pass){
    if(email.email == JSON.parse(localStorage.getItem('phar')).email && pass.pass == JSON.parse(localStorage.getItem('phar')).password){
      navigate("/layout")
    }else{
        err = `<p className='error'>Email Or Password is wrong</p>`
        console.log(email, JSON.parse(localStorage.getItem('phar')).email,pass, JSON.parse(localStorage.getItem('phar')).password)
      }
  }

}
