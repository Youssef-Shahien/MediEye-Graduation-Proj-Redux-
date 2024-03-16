import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { insertUsers } from "../../store/UserSlice";
const AddUser = () => {
  const userName = useRef("");
  const email = useRef("");
  const password = useRef("");
  const phone = useRef("");
  const role = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const insertUserHandler = (e) => {
    e.preventDefault();
    const data = {
      userName: userName.current.value,
      email: email.current.value,
      password: password.current.value,
      phone: phone.current.value,
      role: role.current.value,
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
    // Send Data
    dispatch(insertUsers(data));
    // Reset input values
    userName.current.value = null;
    email.current.value = null;
    password.current.value = null;
    phone.current.value = null;
    role.current.value = null;
    //Navigate to product Page
    navigate("/layout/users");
  };
  return (
    <div className="container ">
      <form className="py-4" onSubmit={insertUserHandler}>
        <input
          type="text"
          className="form-control mb-3 ps-3"
          placeholder="user Name"
          ref={userName}
        />
        <input
          type="email"
          className="form-control mb-3 ps-3"
          placeholder="Email"
          ref={email}
        />
        <input
          type="password"
          className="form-control mb-3 ps-3"
          placeholder="Password"
          ref={password}
        />
        <input
          type="phone"
          className="form-control mb-3 ps-3"
          placeholder="phone"
          ref={phone}
        />
        <select className="form-control ps-3 mb-4 text-secondary" ref={role}>
          <option value="default" disabled className=" text-secondary">
            Select role
          </option>
          <option>User</option>
          <option>Admin</option>
          <option>SuperAdmin</option>
        </select>

        <button type="submit" className="btn btn-info text-light px-3">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddUser;
