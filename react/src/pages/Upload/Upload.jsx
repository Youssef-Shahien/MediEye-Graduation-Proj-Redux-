import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./Upload.css";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, insertProducts } from "../../store/ProductsSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCategory } from "../../store/CategorySlice";

function Upload() {
  const [imagePreview, setImagePreview] = useState(null);
  //Map Category to add it IN checkBox in Upload Page
  const { category } = useSelector((state) => state.category);

  const categoryTitles =
    category &&
    category.map((item) => (
      <option value={item.id} key={item.id}>
        {item.title}
      </option>
    ));

  ////////////////////////
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      image.current = file;
      // Create a preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // variables////////////////////////
  const { editReport, edit } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category_id = useRef();
  // const category_title = useRef();
  const name = useRef();
  const code = useRef();
  const description = useRef();
  const effective_material = useRef();
  const price = useRef();
  const discount = useRef();
  const image = useRef();
  // form handler////////////////////////;
  const submitHandler = (e) => {
    e.preventDefault();


    const data = {
      id: edit && edit.id,
      category_id: category_id.current.value,
      name: name.current.value,
      code: code.current.value,
      description: description.current.value,
      effective_material: effective_material.current.value,
      price: price.current.value,
      discount: discount.current.value,
      image: edit ? null : image.current,
    };
    console.log(data);
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
    if (editReport === true) {
      dispatch(editProduct(data));
      dispatch({ type: "Edit_Product_Temp" });
    } else {
      dispatch(insertProducts(data));
    }
    // Reset input values
    category_id.current.value = null;
    name.current.value = null;
    code.current.value = null;
    description.current.value = null;
    effective_material.current.value = null;
    price.current.value = null;
    discount.current.value = null;
    image.current = null;
    //Navigate to product Page
    navigate("/layout/product");
  };
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
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
              defaultValue={edit ? edit.category_title : ""}
              ref={category_id}
            >
              <option value="default" disabled className=" text-secondary">
                Select...
              </option>
              {categoryTitles}
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
            <label htmlFor="exampleInputCode" className="form-label">
              Code
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputCode"
              defaultValue={edit ? edit.code : ""}
              ref={code}
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
              defaultValue={edit ? edit.effective_material : ""}
              ref={effective_material}
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
            <label htmlFor="file-upload" className="fs-6 fw-bold" role="button">
              <img src="/src/assets/images/down.png" alt="" />
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              accept="image/jpeg, image/png, image/jpg, image/gif"
              ref={image}
            />
          </div>
          <button type="submit" className="btn btn-info text-light px-3 mt-2">
            {editReport ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Upload;


// const formData = new FormData(); 
// formData.append("id", edit.id);
// formData.append("category_id", category_id.current.value);
// formData.append("name", name.current.value);
// formData.append("code", code.current.value);
// formData.append("description", description.current.value);
// formData.append("effective_material", effective_material.current.value);
// formData.append("price", price.current.value); 
// formData.append("discount", discount.current.value);
// formData.append("image", image.current);