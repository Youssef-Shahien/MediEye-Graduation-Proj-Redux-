import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  deleteProducts,
  // editProduct,
  getProducts,
} from "../../store/ProductsSlice";
function Products() {
  const navigate = useNavigate();
  const { products, isLoading, error, editReport } = useSelector(
    (state) => state.products
  );
  console.log(products);
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////
  // Edit Function to Handle Data & Navigation
  const editHandler = (item) => {
    if (editReport === false) {
      dispatch({ type: "Edit_Product_Temp", payload: item });
    }
    navigate("/layout/upload");
  };
  /////////////////////////////////////////////////////////////////////
  /////////////////////Map on the Data and Show it there /////////////////////////////////////
  const showData =
    error === null ? (
      products && products.length > 0 ? (
        products
          .filter((item) => item && item.id)
          .map((item) => (
            <tr key={item.id} className="text-center">
              <td>
                <img src={item.image} className="imgPro py-2" alt="" />
              </td>
              <td className="text-info">{item.name}</td>
              <td className="fw-bold">{item.code}</td>
              <td className="max">{item.description}</td>
              <td>{item.category_title}</td>
              <td>{item.price} EGP</td>
              <td>{item.discount}</td>
              <td>
                <button
                  className="btn btn-outline-info me-1"
                  onClick={() => editHandler(item)}
                >
                  <i className="fas fa-pen px-1"></i>Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => dispatch(deleteProducts(item))}
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

  ////////////////////////////////////////////////////////////////////////////

  //Get The Data From the Server
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  ////////////////////////
  return (
    <>
      <div id="content">
        <div className="navbarTop d-flex justify-content-between py-4">
          <h3>ListProducts</h3>
          <NavLink to="/layout/upload">
            <button className="btn btn-info btn1  text-light text-center px-1">
              <i className="fas fa-plus px-1"></i> addProduct
            </button>
          </NavLink>
        </div>
        <div className="seach position-relative ">
          <input type="text" className="form-control  " />
          <button className="position-absolute start-90 text-light top-0 btn btn-info">
            Search
          </button>
        </div>
        <table className="table table-striped my-3">
          <thead className="">
            <tr className="border border-start-0 border-end-0 mb-1 text-secondary opacity-75 text-center">
              <td scope="col">Image</td>
              <td scope="col">Name</td>
              <td scope="col">Code</td>
              <td scope="col">Descripition</td>
              <td scope="col">Category</td>
              <td scope="col">Price</td>
              <td scope="col">Discount</td>
              <td scope="col" colSpan="2">
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
              showData
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
