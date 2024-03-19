import React, { useState } from "react";
import style from "./Sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({
  isMinized,
  setIsminmized,
  isAdmin,
  setAdmin,
}) {
  const navigat = useNavigate();
  const logout = () => {
    localStorage.removeItem("phar");
    navigat("/");
  };

  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <ul className="list-unstyled ">
          <li>
            <NavLink to="/layout/product">
              <i className="fas fa-bag-shopping ps-2 me-3"></i>

              {isMinized ? "" : "Products"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/layout/orders">
              <i className="fas fa-cart-shopping me-3"></i>

              {isMinized ? "" : "Orders"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/layout/upload">
              <i className="fas fa-upload me-3"></i>

              {isMinized ? "" : "Upload"}
            </NavLink>
          </li>

          {isAdmin ? (
            <ul className="list-unstyled">
              <li>
                <NavLink to="/layout/users">
                  <i className="fas fa-users me-3"></i>
                  {isMinized ? "" : "Users"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/layout/adduser">
                  <i className="fas fa-plus me-3"></i>
                  {isMinized ? "" : "Add User"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/layout/cates">
                  <i className="fas fa-qrcode me-3"></i>
                  {isMinized ? "" : "Categories"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/layout/addcate">
                  <i className="fas fa-plus me-3"></i>
                  {isMinized ? "" : "Add category"}
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}
          <li>
            <span className="pointer" id="logout" onClick={logout}>
              <i className="bi bi-box-arrow-left me-3"></i>
              {isMinized ? "" : "Log Out"}
            </span>
          </li>
        </ul>
        <div
          className={`${style.change} shadow pointer`}
          onClick={() => {
            setIsminmized(!isMinized);
          }}
        >
          <i
            className={
              isMinized
                ? `fa-solid fa-chevron-right `
                : `fa-solid fa-chevron-left `
            }
          ></i>
        </div>
      </nav>
    </>
  );
}
