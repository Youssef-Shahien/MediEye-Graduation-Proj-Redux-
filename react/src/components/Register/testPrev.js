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
    companyName: Yup.string().required("companyName is Required"),
    companyPhone: Yup.string().required("companyPhone is Required"),
    derliveryArea: Yup.string().required("derliveryArea is Required"),
    companyWorkingHours: Yup.string().required(
      "companyWorkingHours is Required"
    ),
    companyManagerName: Yup.string().required("companyManagerName is Required"),
    companyManagerPhone: Yup.string().required(
      "companyManagerPhone is Required"
    ),
  });
  //
  let formik = useFormik({
    initialValues: {
      companyName: "",
      companyPhone: "",
      derliveryArea: "",
      companyWorkingHours: "",
      companyManagerName: "",
      companyManagerPhone: "",
    },
    validationSchema,
    onSubmit: handelRegisteration,
  });
  //
  function handelRegisteration(values) {
    let ms = "error";
    if (
      formik.errors.companyName == null &&
      formik.errors.companyPhone == null &&
      formik.errors.derliveryArea == null &&
      formik.errors.companyWorkingHours == null &&
      formik.errors.companyManagerName == null &&
      formik.errors.companyManagerPhone == null
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
                  placeholder="Username"
                  id="companyName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                />
                {formik.errors.companyName && formik.touched.companyName ? (
                  <div className="error">{formik.errors.companyName}</div>
                ) : (
                  ""
                )}
                <input
                  type="derliveryArea"
                  className="form-control mb-3"
                  placeholder="Email Adress"
                  id="derliveryArea"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.derliveryArea}
                />
                {formik.errors.derliveryArea && formik.touched.derliveryArea ? (
                  <div className="error">{formik.errors.derliveryArea}</div>
                ) : (
                  ""
                )}
                <input
                  type="companyPhone"
                  className="form-control mb-3"
                  placeholder="Password"
                  id="companyPhone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.companyPhone}
                />
                {formik.errors.companyPhone && formik.touched.companyPhone ? (
                  <div className="error">{formik.errors.companyPhone}</div>
                ) : (
                  ""
                )}

                <input
                  type="companyWorkingHours"
                  className="form-control mb-3"
                  placeholder="Password"
                  id="companyWorkingHours"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.companyWorkingHours}
                />
                {formik.errors.companyWorkingHours &&
                formik.touched.companyWorkingHours ? (
                  <div className="error">
                    {formik.errors.companyWorkingHours}
                  </div>
                ) : (
                  ""
                )}
                <input
                  type="companyManagerName"
                  className="form-control mb-3"
                  placeholder="Password"
                  id="companyManagerName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.companyManagerName}
                />
                {formik.errors.companyManagerName &&
                formik.touched.companyManagerName ? (
                  <div className="error">
                    {formik.errors.companyManagerName}
                  </div>
                ) : (
                  ""
                )}
                <input
                  type="companyManagerPhone"
                  className="form-control mb-3"
                  placeholder="Password"
                  id="companyManagerPhone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.companyManagerPhone}
                />
                {formik.errors.companyManagerPhone &&
                formik.touched.companyManagerPhone ? (
                  <div className="error">
                    {formik.errors.companyManagerPhone}
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

export default SignUpFormTwo;
////////////////////////////////////////////////////////

// import React, { useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import HeaderLogin from "../Header/Header";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// function SignUpFormTwo() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state) => state.auth);
//   const companyName = useRef();
//   const derliveryArea = useRef();
//   const companyPhone = useRef();
//   //
//   const handleSubmitForm = (e) => {
//     e.preventDefault();
//     const userDataInfo = {
//       companyName: companyName.current.value,
//       derliveryArea: derliveryArea.current.value,
//       companyPhone: companyPhone.current.value,
//     };
//     const isAnyInputEmpty = Object.keys(userDataInfo).some((key) => {
//       if (key === "id") {
//         return false; // Skip checking the 'id' field
//       }
//       return userDataInfo[key].trim() === "";
//     });

//     if (isAnyInputEmpty) {
//       // Display an error message or handle the empty input case
//       Swal.fire({
//         icon: "error",
//         title: "Please fill in all fields.",
//         text: "Error",
//       });
//       return;
//     }
//     dispatch({ type: "Add_User_info", payload: userDataInfo });
//     navigate("/signupThree");
//   };

//   const handleGoBack = () => {
//     navigate("/signup");
//   };
//   return (
//     <>
//       <HeaderLogin />
//       <div className="parent">
//         <div className="login-card">
//           <div className="card" style={{ width: "352px" }}>
//             <div className="card-body">
//               <h5 className="card-title logo text-center">MediEye</h5>
//               <h6 className="card-subtitle mb-2 text-body-secondary text-center fw-bold">
//                 Sign Up
//               </h6>

//               <form onSubmit={handleSubmitForm}>
//                 <input
//                   type="text"
//                   className="form-control mb-3"
//                   placeholder="Username"
//                   id="companyName"
//                   ref={companyName}
//                 />

//                 <input
//                   type="derliveryArea"
//                   className="form-control mb-3"
//                   placeholder="Email Adress"
//                   id="derliveryArea"
//                   ref={derliveryArea}
//                 />

//                 <input
//                   type="companyPhone"
//                   className="form-control mb-3"
//                   placeholder="Password"
//                   id="companyPhone"
//                   ref={companyPhone}
//                 />
//                 <div className="d-flex flex-column gap-2">
//                   <button className="btn button" type="submit">
//                     Next to Create account
//                   </button>
//                   <button className="btn button" onClick={handleGoBack}>
//                     Back
//                   </button>
//                   <p>
//                     Already have account ?{" "}
//                     <Link to="/login" className="">
//                       Login
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SignUpFormTwo;

// companyName: Yup.string()
// .required("Name is Required")
// .min(8, "Name must be more than 8 letter")
// .max(25, "Name must be less than 25 letter"),
// companyPhone: Yup.string()
// .required("Password is Required")
// .matches(/^[A-Z]/, "Password must be start with capital letter")
// .min(8, "Password must be at least 8 characters")
// .max(25, "Password must be at most 25 characters"),
// derliveryArea: Yup.string()
// .required("Email is Required")
// .derliveryArea("Enter Avalid Email"),
