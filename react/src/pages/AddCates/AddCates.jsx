import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editCategory, insertCategory } from "../../store/CategorySlice";

const AddCates = () => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    // Check if a file was selected
    if (!file) {
      console.error("No file selected.");
      return;
    }
  
    // Check if the file type is valid
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      console.error("Invalid file type. Please upload an image file (jpeg, png, jpg, gif).");
      return;
    }
  
    // File type is valid, proceed with reading the file
    reader.onload = () => {
      const base64Image = reader.result;
      // Store the base64Image in your component's state or use it directly in the image source
    };
  
    reader.readAsDataURL(file);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { catEdit, catEditReport } = useSelector((state) => state.category);
  const title = useRef();
  const image = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      id: catEdit && catEdit.id,
      title: title.current.value,
      image: image.current.value,
    };

    const isAnyInputEmpty = Object.keys(data).some((key) => {
      if (key === "id" || key === "image") {
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
    if (catEditReport === true) {
      dispatch(editCategory(data));
      dispatch({ type: "Edit_Categories_Temp" });
    } else {
      dispatch(insertCategory(data));
    }
    // Reset input values
    title.current.value = null;
    image.current.value = null;
    //Navigate to Category Page

    navigate("/layout/cates");
  };

  return (
    <div>
      <h3 className="my-4">Categories</h3>
      <form className="py-4" onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            ref={title}
            defaultValue={catEdit ? catEdit.title : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputImage" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control border-0"
            id="exampleInputImage"
            onChange={handleImageUpload}
            ref={image}
          />
        </div>
        <button type="submit" className="btn btn-info text-light px-3">
          {catEditReport ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddCates;
