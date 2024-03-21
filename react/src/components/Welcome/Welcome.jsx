import React from "react";
import style from "./Welcome.module.css";
import { Link} from "react-router-dom";

function Welcome() {

  return (
      <div className={`${style.welcome} d-flex ps-5  align-items-center`}>
        <div className="w-50 text-light">
          <h3 className="mb-4 fw-bolder">This text is meant to be treated as sample output from a computer program.</h3>
          <p className="mb-5">This text is meant to be treated as sample output from a computer program.This text is meant to be treated as sample output from a computer program.</p>
          <div>
            <Link to='login' className="btn button px-5" >Login</Link>
            <Link to='signup' className="btn btn-light text-info fw-bold ms-4 px-5 ">SignUp</Link>
          </div>
        </div>
      </div>
  );
}

export default Welcome;


// <div className={`card text-center ${style.wel_card}`} style={{ width: "21rem" }}>
//         <div className="card-body d-flex flex-column gap-4 p-4 ">
//           <h5 className="card-title">Welcome To MediMatch</h5>
//           <div>
//             <Link to='login' className="btn button" >Login</Link>
//             <Link to='signup' className="btn button ms-5">SignUp</Link>
//           </div>
//         </div>
//       </div>