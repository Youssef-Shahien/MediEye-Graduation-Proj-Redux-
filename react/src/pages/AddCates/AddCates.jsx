import React from "react";
import { useRef , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editCategory, insertCategory } from "../../store/CategorySlice";

const AddCates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { catEdit, catEditReport } = useSelector((state) => state.category);
  const [imagePreview, setImagePreview] = useState(null);
  const title = useRef();
  const image = useRef();

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

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      id: catEdit && catEdit.id,
      title: title.current.value,
      image: catEdit ? null : image.current,
    };

    if (!data.title.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Please fill in the title field.',
        text: 'Error',
      });
      return;
    }

    // if (!data.image) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Please select an image.',
    //     text: 'Error',
    //   });
    //   return;
    // }

    if (catEditReport === true) {
      dispatch(editCategory(data));
      dispatch({ type: 'Edit_Categories_Temp' });
    } else {
      dispatch(insertCategory(data));
    }

    title.current.value = '';
    image.current = null;
    setImagePreview(null);
    navigate('/layout/cates');
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
            defaultValue={catEdit ? catEdit.title : ''}
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
            accept="image/jpeg, image/png, image/jpg, image/gif"
            ref={image}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2" style={{ maxWidth: '200px' }} />
          )}
        </div>
        <button type="submit" className="btn btn-info text-light px-3">
          {catEditReport ? 'Edit' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddCates;
