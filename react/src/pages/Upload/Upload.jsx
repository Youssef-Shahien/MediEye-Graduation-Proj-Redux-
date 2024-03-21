import React from "react";
import { useRef } from "react";
import "./Upload.css";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, insertProducts } from "../../store/ProductsSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file.size <= 10485760) { // 10MB in bytes
    // File size is within the limit
    console.log('File uploaded:', file);
    // Add your file upload logic here
  } else {
    // File size exceeds the limit
    console.log('File size exceeds the limit (10MB)');
    // You can display an error message to the user
  }
};

function Upload() {
  // variables////////////////////////
  const { editReport, edit } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useRef();
  const name = useRef();
  const description = useRef();
  const effectiveMaterial = useRef();
  const price = useRef();
  const discount = useRef();
  const image = useRef();
  // form handler////////////////////////;
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      id: edit && edit.id,
      category: category.current.value,
      name: name.current.value,
      description: description.current.value,
      effectiveMaterial: effectiveMaterial.current.value,
      price: price.current.value,
      discount: discount.current.value,
      image: image.current.value,
    };
    const isAnyInputEmpty = Object.keys(data).some((key) => {
      if (key === "id") {
        return false; // Skip checking the 'id' field
      }
      return data[key].trim() === "";
    });

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
    if (editReport === true) {
      dispatch(editProduct(data));
      dispatch({ type: "Edit_Product_Temp" });
    } else {
      dispatch(insertProducts(data));
    }
    // Reset input values
    category.current.value = null;
    name.current.value = null;
    description.current.value = null;
    effectiveMaterial.current.value = null;
    price.current.value = null;
    discount.current.value = null;
    image.current.value = null;
    //Navigate to product Page
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
              defaultValue={edit ? edit.category : ""}
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
              defaultValue={edit ? edit.name : ""}
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
              defaultValue={edit ? edit.description : ""}
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
              defaultValue={edit ? edit.effectiveMaterial : ""}
              ref={effectiveMaterial}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPrice" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPrice"
              defaultValue={edit ? edit.price : ""}
              ref={price}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputCount" className="form-label">
              Discount
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputCount"
              defaultValue={edit ? edit.discount : ""}
              ref={discount}
            />
          </div>
          <div className="p-3 border border-1 text-center rounded-3">
                    <label htmlFor="file-upload" className="fs-6 fw-bold" role="button"><img
                    src="/src/assets/images/down.png"
                    
                    alt=""
                  /></label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    
                  </div>
          <button
            type="submit"
            className="btn btn-info text-light px-3 mt-2"
            // onClick={EditProductHandler}
          >
            {editReport ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Upload;
