import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
function SignUpFormThree() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Getting the dispatch function

  //
  let validationSchema = Yup.object({
    company_name: Yup.string().required("Company Name is Required"),
    company_phone: Yup.string().required("Company Phone is Required"),
    delivary_area: Yup.string().required("Derlivery Area is RequireD"),
    company_working_hours: Yup.string().required(
      "Company Working Hours is Required"
    ),
    company_manager_name: Yup.string().required("Company Manager Name is Required"),
    company_manager_phone: Yup.string().required(
      "Company Manager Phone is Required"
    ),
  });
  //
  let formik = useFormik({
    initialValues: {
      company_name: "",
      company_phone: "",
      delivary_area: "",
      company_working_hours: "",
      company_manager_name: "",
      company_manager_phone: "",
    },
    validationSchema,
    onSubmit: handelRegisteration,
  });
  //
  function handelRegisteration(values) {
    let ms = "error";
    if (
      formik.errors.company_name == null &&
      formik.errors.company_phone == null &&
      formik.errors.delivary_area == null &&
      formik.errors.company_working_hours == null &&
      formik.errors.company_manager_name == null &&
      formik.errors.company_manager_phone == null
    ) {
      ms = "success";
      dispatch({ type: "Add_User_info", payload: values });
    }
    if (ms === "success") {
      navigate("/signupFour");
      console.log(values);
      dispatch({ type: "Add_User_info", payload: values });
    }
    dispatch({ type: "Add_User_info", payload: values });
  }
  const handleGoBack = () => {
    navigate("/signupTwo");
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
                  placeholder="Company Name"
                  id="company_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.company_name}
                />
                {formik.errors.company_name && formik.touched.company_name ? (
                  <div className="error">{formik.errors.company_name}</div>
                ) : (
                  ""
                )}
                <input
                  type="company_phone"
                  className="form-control mb-3"
                  placeholder="Company Phone"
                  id="company_phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.company_phone}
                />
                {formik.errors.company_phone && formik.touched.company_phone ? (
                  <div className="error">{formik.errors.company_phone}</div>
                ) : (
                  ""
                )}
                <input
                  type="delivary_area"
                  className="form-control mb-3"
                  placeholder="Derlivery Area"
                  id="delivary_area"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.delivary_area}
                />
                {formik.errors.delivary_area && formik.touched.delivary_area ? (
                  <div className="error">{formik.errors.delivary_area}</div>
                ) : (
                  ""
                )}

                <input
                  type="company_working_hours"
                  className="form-control mb-3"
                  placeholder="Company Working Hours"
                  id="company_working_hours"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.company_working_hours}
                />
                {formik.errors.company_working_hours &&
                formik.touched.company_working_hours ? (
                  <div className="error">
                    {formik.errors.company_working_hours}
                  </div>
                ) : (
                  ""
                )}
                <input
                  type="company_manager_name"
                  className="form-control mb-3"
                  placeholder="Company Manager Name"
                  id="company_manager_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.company_manager_name}
                />
                {formik.errors.company_manager_name &&
                formik.touched.company_manager_name ? (
                  <div className="error">
                    {formik.errors.company_manager_name}
                  </div>
                ) : (
                  ""
                )}
                <input
                  type="company_manager_phone"
                  className="form-control mb-3"
                  placeholder="Company Manager Phone"
                  id="company_manager_phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.company_manager_phone}
                />
                {formik.errors.company_manager_phone &&
                formik.touched.company_manager_phone ? (
                  <div className="error">
                    {formik.errors.company_manager_phone}
                  </div>
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

export default SignUpFormThree;
