import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; // Importing useDispatch hook

function SignUpFormTwo() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Getting the dispatch function

  //
  let validationSchema = Yup.object({
    user_name: Yup.string()
      .required("Name is Required")
      .min(8, "Name must be more than 8 letter")
      .max(25, "Name must be less than 25 letter"),
    password: Yup.string()
      .required("Password is Required")
      .matches(/^[A-Z]/, "Password must be start with capital letter")
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password must be at most 25 characters"),
    phone: Yup.string()
    .required("Phone is Required")
    .matches(
      /^(?:\+\d{1,2}\s?)?(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/,
      "Enter a valid Phone number"
    ),
    email: Yup.string()
      .required("Email is Required")
      .email("Enter Avalid Email"),
  });
  //
  let formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelRegisteration,
  });
  //
  function handelRegisteration(values) {
    let ms = "error";
    if (
      formik.errors.user_name == null &&
      formik.errors.email == null &&
      formik.errors.password == null
    ) {
      ms = "success";
      dispatch({ type: "Add_User_info", payload: values });
    }
    if (ms === "success") {
      navigate("/signupThree");
      dispatch({ type: "Add_User_info", payload: values });
    }
    dispatch({ type: "Add_User_info", payload: values });
  }
  const handleGoBack = () => {
    navigate("/signup");
  };
  return (
    <>
      <HeaderLogin />
      <div className="parent">
        <div className="login-card">
          <div className="card" style={{ width: "352px" }}>
            <div className="card-body">
              <h5 className="card-title logo text-center">MediEye</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary text-center fw-bold">
                Sign Up
              </h6>
              <form onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Username"
                  id="user_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.user_name}
                />
                {formik.errors.user_name && formik.touched.user_name ? (
                  <div className="error">{formik.errors.user_name}</div>
                ) : (
                  ""
                )}
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email Adress"
                  id="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : (
                  ""
                )}
                <input
                  type="phone"
                  className="form-control mb-3"
                  placeholder="Phone"
                  id="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="error">{formik.errors.phone}</div>
                ) : (
                  ""
                )}
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  id="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : (
                  ""
                )}
                <div className="d-flex flex-column gap-2">
                  <button className="btn button" type="submit">
                    Next to Create account
                  </button>
                  <button className="btn button" onClick={handleGoBack}>
                    Back
                  </button>
                  <p>
                    Already have account ?{" "}
                    <Link to="/login" className="">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpFormTwo;
