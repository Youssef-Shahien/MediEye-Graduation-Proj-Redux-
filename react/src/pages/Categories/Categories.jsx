import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./Categories.css";
import { deleteCategory, getCategory } from "../../store/CategorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { category, isLoading, error } = useSelector((state) => state.category);
  // edit Handler Function
  const editCategoryHandler = (item) => {
    dispatch({ type: "Edit_Categories_Temp", payload: item });
    navigate("/layout/addcate");
  };
    //Search Handler
    const filteredProducts = category.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //Map The Categories
  const categoriesData =
    error === null ? (
      filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts
          .filter((item) => item && item.id)
          .map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className="px-4">{item.title}</td>
              <td className="px-2">
                <img src={item.image} className="imgPro py-2" alt="" />
              </td>

              <td>
                <button
                  className="btn btn-outline-info me-3"
                  onClick={() => editCategoryHandler(item)}
                >
                  <i className="fas fa-pen px-1"></i>Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => dispatch(deleteCategory(item))}
                >
                  <i className="fas fa-trash pe-1"></i>Delete
                </button>
              </td>
            </tr>
          ))
      ) : (
        <tr>
          <td colSpan="7">
            <h4>There isn't Data There.....</h4>
          </td>
        </tr>
      )
    ) : (
      <tr>
        <td colSpan="7">
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        </td>
      </tr>
    );
  // get Categories
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <div id="content">
      <div className="navbarTop d-flex justify-content-between py-4">
        <h3>Categories</h3>
        <NavLink to="/layout/addcate">
          <button className="btn btn-info btn1  text-light text-center px-1">
            <i className="fas fa-plus px-1"></i> Add Category
          </button>
        </NavLink>
      </div>
      <div className="seach position-relative ">
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search With Title"
        />
        <button className="position-absolute start-90 text-light top-0 btn btn-info">
          Search
        </button>
      </div>
      <table className="table table-hover my-3">
        <thead className="">
          <tr className="border border-start-0 border-end-0  mb-1 text-secondary opacity-75">
            <td scope="col" className="pe-5">
              Id
            </td>
            <td scope="col" className="px-4">
              Title
            </td>
            <td scope="col" className="px-4">
              Image
            </td>
            <td scope="col" colSpan="2" className="ps-4">
              Manage
            </td>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="7">
                <h4>"Wait Please Dont Close The Page"</h4>
              </td>
            </tr>
          ) : (
            categoriesData
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
