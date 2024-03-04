import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getProducts } from "../../store/ProductsSlice";
function Products() {
  const dispatch = useDispatch();
  //Get The Data From the Server
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
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
            <tr className="border border-start-0 border-end-0 mb-1 text-secondary opacity-75">
              <td scope="col">Image</td>
              <td scope="col">Name</td>
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
            <tr>
              <td>
                <img
                  src="/src/assets/images/download.jpg"
                  className="imgPro py-2"
                  alt=""
                />
              </td>
              <td className="text-info">Vita-B</td>
              <td className="max">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
                praesentium neque
              </td>
              <td>Loremipsum.</td>
              <td>1222</td>
              <td>100</td>
              <td>
                <button className="btn btn-outline-info me-1">
                  <i className="fas fa-pen px-1"></i>Edit
                </button>
                <button className="btn btn-outline-danger">
                  <i className="fas fa-trash pe-1"></i>Delete
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="/src/assets/images/vite_c.jpg"
                  className="imgPro py-2"
                  alt=""
                />
              </td>
              <td className="text-info">Vita-c</td>
              <td className="max">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
                praesentium neque
              </td>
              <td>Loremipsum.</td>
              <td>1222</td>
              <td>100</td>
              <td>
                <button className="btn btn-outline-info me-1">
                  <i className="fas fa-pen px-1"></i>Edit
                </button>
                <button className="btn btn-outline-danger">
                  <i className="fas fa-trash pe-1"></i>Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
