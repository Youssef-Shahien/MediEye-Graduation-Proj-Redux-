import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/Header";
import { login } from "../../store/AuthSlice";
import "./Login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, userToken, error: authError } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && userToken) {
      navigate("/layout");
    }
    if (authError) {
      setError(authError);
    }
  }, [isLoading, userToken, authError, navigate]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link
                  to="/forgetPass"
                  className="text-danger text-small d-flex justify-content-end small text-decoration-none mb-3"
                >
                  Forget the password?
                </Link>
                {error && <div className="text-danger">{error}</div>}
                <button type="submit" className="btn button mb-1 form-control" disabled={isLoading}>
                  Log In
                </button>
                <p>
                  You don't have an account yet?
                  <Link to="/signup" className="text-decoration-underline ms-2">
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
