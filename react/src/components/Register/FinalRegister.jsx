import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/Header";
import { register } from "../../store/AuthSlice";

function FinalRegister() {
  const { isLoading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  console.log(userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(userInfo));
    navigate("/login");
  };
  const handleGoBack = () => {
    navigate("/signupFour");
  };
  return (
    <>
      <HeaderLogin />
      <div className="parent">
        <div className="login-card my-3 ">
          <div className="card" style={{ width: "30rem" }}>
            <div className="card-body">
              <h5 className="card-title logo text-center">MediMatch</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary text-center fw-bold">
                Sign Up
              </h6>
              <p className="card-subtitle my-2 text-dark text-start fw-bold">
                Verify Your Data
              </p>
              <form className="" onSubmit={submitHandler}>
                <div className="d-flex flex-column gap-2">
                  <button className="btn button" type="submit">
                    SignUp
                  </button>
                  <button className="btn button" onClick={handleGoBack}>
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FinalRegister;
