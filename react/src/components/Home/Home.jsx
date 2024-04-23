import React, { useState } from "react";
import "./Home.module.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src="/src/assets/images/ques.gif" className="qu" alt="" />
      <div className="py-2">
        <h3>
          Hello To Our<span className="small fs-1 fst-italic"> MediEye</span>
        </h3>
      </div>
    </div>
  );
}
