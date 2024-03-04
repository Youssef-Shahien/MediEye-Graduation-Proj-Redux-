import React from "react";
import "./Upload.css";
function Upload() {
  return (
    <>
      <div className="container ">
        <form className="py-4">
          <div className="mb-3">
            <label htmlFor="exampleInputSelect" className="form-label">
              Category
            </label>
            <select
              className="form-control ps-2"
              id="exampleInputSelect"
              defaultValue="default"
            >
              <option value="default" disabled className=" text-secondary">
                Select...
              </option>
              <option value="option1">option 1</option>
              <option value="option2">option 2 </option>
              <option value="option3">option 3</option>
              <option value="option4">option 4</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="exampleInputName" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDes" className="form-label">
              Description
            </label>
            <input type="text" className="form-control" id="exampleInputDes" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputMat" className="form-label">
              Effective Material
            </label>
            <input type="text" className="form-control" id="exampleInputMat" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPrice" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPrice"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputCount" className="form-label">
              Discount
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputCount"
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="exampleInputImag" className="form-label">
              Image
            </label>
            <textarea
              type=""
              accept="image/x-png,image/gif,image/jpeg"
              rows="10"
              className="form-control "
              id="exampleInputImag"
            ></textarea>
            <img
              src="/src/assets/images/down.png"
              className="position-absolute top-15  start-40"
              alt=""
            />
          </div>

          <button type="submit" className="btn btn-info text-light px-3">
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default Upload;
