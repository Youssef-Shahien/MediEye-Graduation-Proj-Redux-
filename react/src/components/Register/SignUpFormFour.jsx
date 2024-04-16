import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLogin from "../Header/Header";
import "./SignUpFormFour.css";
import { useDispatch } from "react-redux";

// Define handleFileUpload outside of the FileUpload component

function SignUpFormFour() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const commercial_register = useRef();
  const tax_card = useRef();
  const company_license = useRef();

  //Handle Upload Files (PDF)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (!file) {
      console.log("No file selected");
      return;
    }

    // Check if the file type is PDF
    if (file.type !== "application/pdf") {
      console.log("Please select a PDF file");
      // You can display an error message to the user
      return;
    }

    // Check if the file size is within the limit
    if (file.size <= 10485760) {
      // 10MB in bytes
      // File size is within the limit
      console.log("File uploaded:", file);
      // Add your file upload logic here
    } else {
      // File size exceeds the limit
      console.log("File size exceeds the limit (10MB)");
      // You can display an error message to the user
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      commercial_register: commercial_register.current.value,
      tax_card: tax_card.current.value,
      company_license: company_license.current.value,
    };

    dispatch({ type: "Add_User_info", payload: data });

    commercial_register.current.value = null;
    tax_card.current.value = null;
    company_license.current.value = null;
    // navigate("/login");
  };
  const handleGoBack = () => {
    navigate("/signupThree");
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
                Official Company Data
              </p>
              <form className="" onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Commercial register
                  </label>
                  <div className="p-3 border border-1 text-center rounded-3">
                    <label
                      htmlFor="Commercial register"
                      className="fs-6 fw-bold"
                      role="button"
                    >
                      Click here to select a file or drag it
                      <i className="fas fa-up-right-from-square mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="Commercial register"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                      ref={commercial_register}
                    />
                    <p className="text-secondary my-2">Allowed size 10MB</p>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Tax Card
                  </label>
                  <div className="p-3 border border-1 text-center rounded-3">
                    <label
                      htmlFor="tax Card"
                      className="fs-6 fw-bold"
                      role="button"
                    >
                      Click here to select a file or drag it
                      <i className="fas fa-up-right-from-square mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="tax Card"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                      ref={tax_card}
                    />
                    <p className="text-secondary my-2">Allowed size 10MB</p>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Company license
                  </label>
                  <div className="p-3 border border-1 text-center rounded-3">
                    <label
                      htmlFor="Company license"
                      className="fs-6 fw-bold"
                      role="button"
                    >
                      Click here to select a file or drag it
                      <i className="fas fa-up-right-from-square mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="Company license"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                      ref={company_license}
                    />
                    <p className="text-secondary my-2">Allowed size 10MB</p>
                  </div>
                </div>

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

export default SignUpFormFour;
