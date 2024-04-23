import React, { useEffect } from "react";
import "./User.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../../store/UserSlice";
const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, error, isLoading } = useSelector((state) => state.users);
  // Edit UserHadnler
  const editHadnler = (userData) => {
    dispatch({ type: "Edit_User_Temp", payload: userData });
    navigate("/layout/adduser");
  };
  // Get The Data
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  ////////////////
  const cards =
    error === null ? (
      users && users.length > 0 ? (
        users.map((user) => (
          <tr key={user.id}>
            <td className="px-5">{user.id}</td>
            <td className="ps-3">{user.user_name}</td>
            <td className="ps-3">{user.email}</td>
            <td className="ps-3">{user.role === '0' ? "Admin" : "User"}</td>
            <td className="ps-2 text-center">
              <button
                className="btn btn-outline-info me-4"
                onClick={() => editHadnler(user)}
              >
                <i className="fas fa-pen px-1"></i>Edit
              </button>
              <button className="btn btn-outline-info me-4">
                <i className="fa-solid fa-circle-info pe-1"></i>Details
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => dispatch(deleteUsers(user))}
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
  //
  return (
    <div className="container-fluid">
      <div className="navbarTop d-flex justify-content-between py-4">
        <h3>List Users</h3>
        <NavLink to="/layout/adduser">
          <button className="btn btn-info btn1  text-light text-center px-1">
            <i className="fas fa-plus px-1"></i> Add User
          </button>
        </NavLink>
      </div>
      <div className="seach position-relative ">
        <input type="text" className="form-control  " />
        <button className="position-absolute start-90 text-light top-0 btn btn-info">
          Search
        </button>
      </div>
      <table className="table table-responsive table-hover my-3 w-100">
        <thead>
          <tr className="border border-start-0 border-end-0 mb-1 text-secondary opacity-75 fw-bold">
            <td scope="col" className="px-5">
              Id
            </td>
            <td scope="col" className="px-3">
              UserName
            </td>
            <td scope="col" className="ps-3">
              Email
            </td>
            <td scope="col" className="px-3">
              Role
            </td>
            <td scope="col" colSpan="2" className="ps-5 text-center">
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
            cards
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;
