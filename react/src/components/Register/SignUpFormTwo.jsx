import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignUpFormTwo() {
  let validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Name is Required")
      .min(8, "Name must be more than 8 letter")
      .max(25, "Name must be less than 25 letter"),
    password: Yup.string()
      .required("Password is Required")
      .matches(/^[A-Z]/, "Password must be start with capital letter")
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password must be at most 25 characters"),
    email: Yup.string()
      .required("Email is Required")
      .email("Enter Avalid Email"),
  });

  let formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelRegisteration,
  });
  let navigate = useNavigate();

  function handelRegisteration(values) {
    let ms = "error";
    if (
      formik.errors.fullName == null &&
      formik.errors.email == null &&
      formik.errors.password == null
    ) {
      ms = "success";
    }
    if (ms === "success") {
      navigate("/login");
      console.log(values);
      localStorage.setItem("phar", JSON.stringify(values));
    }
  }

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
                  id="fullName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                />
                {formik.errors.fullName && formik.touched.fullName ? (
                  <div className="error">{formik.errors.fullName}</div>
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
                    Create account
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
