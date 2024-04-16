import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/Header";
import { login } from "../../store/AuthSlice";

export default function Login() {
  // let item = JSON.parse(localStorage.getItem("phar"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [error, setError] = useState("");


  //Handle Login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      // Dispatch the login action with email and password
      await dispatch(login({ email, password }));
      // Clear the form fields after successful login
      setEmail("");
      setPassword("");
      setError("");
      // Navigate to the dashboard or other page upon successful login if needed
      // const { isAuthenticated } = useSelector((state) => state.auth);
      // useEffect(() => {
      //   if (isAuthenticated) {
      // Navigate to the dashboard or other page upon successful login if needed
      navigate("/layout");
      // }
      // }, [isAuthenticated, navigate]);
    } catch (error) {
      setError("Login failed. Please check your credentials."); // Set error message
    }
  };
  return (
    <div>
      <HeaderLogin />
      <div className="parent">
        <div className="login-card">
          <div className="card rounded-4" style={{ width: "26rem" }}>
            <div className="card-body">
              <h5 className="card-title logo text-center">MediEye</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary text-center">
                Login into Your Account
              </h6>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  className="form-control p-2 my-4"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control p-2 mb-1"
                  placeholder="Paswword"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Link
                  to="/forgetPass"
                  className="text-danger text-small d-flex justify-content-end small text-decoration-none mb-3"
                >
                  forget the password?
                </Link>
                <div>{error}</div>
                <button type="submit" className="btn button mb-1 form-control">
                  Log In
                </button>

                <p>
                  You don't have account yet ?
                  <Link
                    to="/signup"
                    className="text-decoration-underline   ms-2"
                  >
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
}


  // function handelLogin(email,password){
  //   if(email.email == JSON.parse(localStorage.getItem('phar')).email && password.password == JSON.parse(localStorage.getItem('phar')).password){
  //     navigate("/layout")
  //   }else{
  //       err = `<p className='error'>Email Or Password is wrong</p>`
  //       console.log(email, JSON.parse(localStorage.getItem('phar')).email,password, JSON.parse(localStorage.getItem('phar')).password)
  //     }
  // }

// <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         className="form-control p-2 my-4"
//         placeholder="Email"
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)} // Update email state on change
//         required
//       />

//       <input
//         type="password"
//         className="form-control p-2 mb-1"
//         placeholder="Password"
//         id="pass"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)} // Update password state on change
//         required
//       />

//       <Link to="/forgetPass" className="text-danger text-small d-flex justify-content-end small text-decoration-none mb-3">
//         Forgot your password?
//       </Link>

//       <div>{error}</div>

//       <button type="submit" className="btn button mb-1 form-control">
//         Log In
//       </button>

//       <p>
//         Don't have an account yet?
//         <Link to="/signup" className="text-decoration-underline ms-2">
//           Sign up
//         </Link>
//       </p>
//     </form>
