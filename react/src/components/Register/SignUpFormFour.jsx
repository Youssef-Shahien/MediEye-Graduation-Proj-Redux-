import React from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../Header/Header";
import "./SignUpFormFour.css";

// Define handleFileUpload outside of the FileUpload component
const handleFileUpload = (e) => {
  const file = e.target.files[0];
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

function SignUpFormFour() {
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
              <form className="">
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-light"
                  >
                    Commercial register
                  </label>
                  <div className="p-3 border border-1 text-center rounded-3">
                    <label
                      htmlFor="file-upload"
                      className="fs-6 fw-bold"
                      role="button"
                    >
                      Click here to select a file or drag it
                      <i className="fas fa-up-right-from-square mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
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
                      htmlFor="file-upload"
                      className="fs-6 fw-bold"
                      role="button"
                    >
                      Click here to select a file or drag it
                      <i className="fas fa-up-right-from-square mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
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
                      htmlFor="file-upload"
                      className="fs-6 fw-bold"
                      role="button"
                    >
                      Click here to select a file or drag it
                      <i className="fas fa-up-right-from-square mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                    <p className="text-secondary my-2">Allowed size 10MB</p>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  <Link to="/login" type="submit" className="btn button">
                    Sign Up
                  </Link>
                  <Link to="/signup" type="submit" className="btn button">
                    Back
                  </Link>
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
