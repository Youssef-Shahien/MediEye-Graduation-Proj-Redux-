import React, { useState } from "react";
import { useRef } from "react";
import "./Upload.css";
import { useDispatch } from "react-redux";
import { insertProducts } from "../../store/ProductsSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Upload() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // variables
  const category = useRef();
  const name = useRef();
  const description = useRef();
  const effectiveMaterial = useRef();
  const price = useRef();
  const discount = useRef();
  const image = useRef();
  // form handler
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      category: category.current.value,
      name: name.current.value,
      description: description.current.value,
      effectiveMaterial: effectiveMaterial.current.value,
      price: price.current.value,
      discount: discount.current.value,
      image: image.current.value,
    };
    // Check if any input value is empty
    const isAnyInputEmpty = Object.values(data).some(
      (value) => value.trim() === ""
    );

    if (isAnyInputEmpty) {
      // Display an error message or handle the empty input case
      Swal.fire({
        icon: "error",
        title: "Please fill in all fields.",
        text: "Error",
      });
      return;
    }
    // All inputs are filled, dispatch the action
    dispatch(insertProducts(data));
    // Reset input values
    category.current.value = null;
    name.current.value = null;
    description.current.value = null;
    effectiveMaterial.current.value = null;
    price.current.value = null;
    discount.current.value = null;
    image.current.value = null;
    navigate("/layout/product");
  };
  return (
    <>
      <div className="container ">
        <form className="py-4" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputSelect" className="form-label">
              Category
            </label>
            <select
              className="form-control ps-2"
              id="exampleInputSelect"
              defaultValue="default"
              ref={category}
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
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              ref={name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDes" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputDes"
              ref={description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputMat" className="form-label">
              Effective Material
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputMat"
              ref={effectiveMaterial}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPrice" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPrice"
              ref={price}
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
              ref={discount}
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
              ref={image}
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
