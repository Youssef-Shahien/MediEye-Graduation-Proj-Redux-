import React, { useState } from "react";
import "./Home.module.css";
import { NavLink } from 'react-router-dom';

export default function Home() {
  let [pass,setPass]=useState("");
  
  function setadmin() {
    try {
      console.log("Password value:", pass);
      localStorage.setItem("admin", pass);
      console.log("Value set in localStorage");
    } catch (error) {
      console.error("Error setting value in localStorage:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");
    setadmin();
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src="/src/assets/images/ques.gif" className="qu" alt="" />
      <div className="py-2">
        <h3>Are You Admin ? <span className="small fs-6 fst-italic">if you are pleasle enter the password</span></h3>
        <form onSubmit={handleSubmit}>
        <input
        type="password"
        className="w-100 my-2"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        />
          <div className="d-flex justify-content-between py-2">
            <NavLink to="/layout/product">
              <button className="btn btn-outline-danger">I'am not Admain</button>
            </NavLink>
            <NavLink to="/layout/product">
            <button type="submit" className="btn btn-outline-info" >Check Password</button>
            </NavLink>
          </div>
        </form>
      </div>
      </div>
  );

}
