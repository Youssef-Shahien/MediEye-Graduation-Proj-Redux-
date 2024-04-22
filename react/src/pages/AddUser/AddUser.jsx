import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editUsers, insertUsers } from "../../store/UserSlice";
const AddUser = () => {
  const user_name = useRef();
  const email = useRef();
  const password = useRef();
  const phone = useRef();
  const role = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userEdit, userEditReport } = useSelector((state) => state.users);
  ////////////////////////////////////////////////////////////////////////////////////////////
  const insertUserHandler = (e) => {
    e.preventDefault();
    const data = {
      id: userEdit && userEdit.id,
      user_name: user_name.current.value,
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
    if (userEditReport === true) {
      dispatch(editUsers(data));
      dispatch({ type: "Edit_User_Temp" });
    } else {
      dispatch(insertUsers(data));
    }
    // Reset input values
    user_name.current.value = null;
    email.current.value = null;
    password.current.value = null;
    phone.current.value = null;
    role.current.value = null;
    //Navigate to product Page
    navigate("/layout/users");
  };
  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="container ">
      <form className="py-4" onSubmit={insertUserHandler}>
        <input
          type="text"
          className="form-control mb-3 ps-3"
          placeholder="user Name"
          defaultValue={userEdit ? userEdit.user_name : ""}
          ref={user_name}
        />
        <input
          type="email"
          className="form-control mb-3 ps-3"
          placeholder="Email"
          defaultValue={userEdit ? userEdit.email : ""}
          ref={email}
        />
        <input
          type="password"
          className="form-control mb-3 ps-3"
          placeholder="Password"
          defaultValue={userEdit ? userEdit.password : ""}
          ref={password}
        />
        <input
          type="phone"
          className="form-control mb-3 ps-3"
          placeholder="phone"
          defaultValue={userEdit ? userEdit.phone : ""}
          ref={phone}
        />
        <select
          className="form-control ps-3 mb-4 text-secondary"
          defaultValue={userEdit ? userEdit.role : ""}
          ref={role}
        >
          <option value="default" disabled className=" text-secondary">
            Select role
          </option>
          <option value="1">Admin</option>
          <option value="0">User</option>
        </select>

        <button type="submit" className="btn btn-info text-light px-3">
          {userEditReport ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
