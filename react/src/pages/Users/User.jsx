import React from 'react';
import "./User.css";
import { NavLink } from 'react-router-dom';

const User = ({ users }) => {

 
  const cards = users.map(({ id, UserName, Email, Role }) => (
    <tbody key={id}>
      <tr>
        <td className='px-5'>{id}</td>
        <td className='ps-3'>{UserName}</td>
        <td className='ps-3'>{Email}</td>
        <td className='ps-3'>{Role}</td>
        <td className='ps-2'>
          <button className="btn btn-outline-info me-4">
            <i className="fas fa-pen px-1"></i>Edit
          </button>
          <button className="btn btn-outline-danger" >
            <i className="fas fa-trash pe-1"></i>Delete
          </button>
        </td>
      </tr>
    </tbody>
  ));

  return (
    <div className="container-fluid">
    <div className="navbarTop d-flex justify-content-between py-4">
      <h3>List Users</h3>
      <NavLink to='/layout/adduser'><button className="btn btn-info btn1  text-light text-center px-1"><i className="fas fa-plus px-1"></i> Add User</button></NavLink>
      
    </div>
      <div className="seach position-relative ">
        <input type="text" className="form-control  "/>
        <button className="position-absolute start-90 text-light top-0 btn btn-info">Search</button>
      </div>
      <table className="table table-responsive table-hover my-3 w-100">
        <thead>
          <tr className="border border-start-0 border-end-0 mb-1 text-secondary opacity-75 fw-bold">
            <td scope="col" className='px-5'>Id</td>
            <td scope="col" className='px-3'>UserName</td>
            <td scope="col" className='ps-3'>Email</td>
            <td scope="col" className='px-3'>Role</td>
            <td scope="col" colSpan="2" className='ps-5'>Manage</td>
          </tr>
        </thead>
        {cards}
      </table>
    </div>
  );
}

export default User;
