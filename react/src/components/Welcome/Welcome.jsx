import React from "react";
import style from "./Welcome.module.css";
import { Link} from "react-router-dom";

function Welcome() {

  return (
      <div className={`${style.welcome} d-flex justify-content-center align-items-center`}>
      <div className={`card text-center ${style.wel_card}`} style={{ width: "21rem" }}>
        <div className="card-body d-flex flex-column gap-4 p-4 ">
          <h5 className="card-title">Welcome To MediEye</h5>
          <div>
            <Link to='login' className="btn button" >Login</Link>
            <Link to='signup' className="btn button ms-5">SignUp</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
