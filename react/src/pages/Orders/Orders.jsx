import React, { useEffect, useState, useRef } from "react";
import style from "./Orders.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editOrder, getOrders } from "../../store/OrderSlice";

function Orders() {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);
  const arrowFont = <FontAwesomeIcon icon={faChevronDown} />;
  const checkFont = <FontAwesomeIcon icon={faSquareCheck} />;
  const handleStyleWithOptionValue = (status, id) => {
    dispatch(editOrder({ id, status }));
  };
  //////////////////////////////////////////////////////////////////
  const tableRowData =
    error === null ? (
      orders && orders.length > 0 ? (
        orders.map((item) => (
          <tr className={`${style[`${item.status}_tr`]}`} key={item.id}>
            <th className="text-secondary" scope="row">
              <input className={style.my_check} type="checkbox" />
            </th>
            <td>{item.id}</td>
            <td className="fw-bold">Tv 14 Inche</td>
            <td>{item.customer}</td>
            <td>{item.phone_number}</td>
            {/* Start Status Board*/}
            <td className={style.status}>
              <div>
                <div className="mb-3">
                  <select
                    id="exampleInputSelect"
                    className={`${style.selected_orders} ${
                      style[`${item.status}`]
                    }`}
                    onChange={(e) =>
                      handleStyleWithOptionValue(e.target.value, item.id)
                    }
                    value={item.status}
                  >
                    <option
                      className={`${style.new_order} text-secondary`}
                      value="new_order"
                    >
                      New Order
                    </option>
                    <option
                      className={`${style.complete} text-secondary`}
                      value="complete"
                    >
                      Complete
                    </option>

                    <option
                      className={`${style.rejected} text-secondary`}
                      value="rejected"
                    >
                      Rejected
                    </option>
                  </select>
                </div>
              </div>
            </td>
            {/* End Status Board*/}
            <td className="fw-bold">{item.total_amount}$</td>
            <td>
              March 21,2020
              <br />
              00:28
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7">
            <h4>There isn't Orders There.....</h4>
          </td>
        </tr>
      )
    ) : (
      <tr>
        <td colSpan="7">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </td>
      </tr>
    );

  //////////////////////////////////////////////////////////////////
  // Dispatch Orders
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div>
      <h3 className="mb-3">My Orders</h3>
      {/* Start Search Bar*/}
      <div className="seach position-relative">
        <input type="text" className="form-control  " />
        <button className="position-absolute start-90 text-light top-0 btn btn-info">
          Search
        </button>
      </div>
      {/* End Search Bar*/}
      {/* Start Table Titles */}
      <div className={`${style.table_titles} mt-4`}>
        <ul>
          <li className={`${style.active}`}>
            All Orders <span className={`${style.active}`}>30</span>
          </li>
          <li>
            Complete <span>30</span>
          </li>
          <li>
            New Order <span>30</span>
          </li>
          <li>
            Rejected <span>30</span>
          </li>
        </ul>
      </div>
      {/* End Table Titles*/}
      {/* Start Showing Result */}
      <div
        className={`${style.showing_result} mt-4 container d-flex justify-content-between align-items-center`}
      >
        <p>Showing result 101-120 Result</p>
        <p>
          item per page <span>10 {arrowFont}</span>
        </p>
      </div>
      {/* End Showing Result */}
      {/* Start Table */}
      <table className="table table-hover text-center mt-3">
        <thead>
          <tr className="text-secondary">
            <th scope="col">{checkFont}</th>
            <th scope="col">ID Order</th>
            <th scope="col">Product</th>
            <th scope="col">Customer</th>
            <th scope="col">Number</th>
            <th scope="col">Status</th>
            <th scope="col">Price</th>
            <th scope="col">Created Date</th>
          </tr>
        </thead>
        <tbody className={style.table_group_divider}>
          {isLoading ? (
            <tr>
              <td colSpan="7">
                <h4>"Wait Please Dont Close The Page"</h4>
              </td>
            </tr>
          ) : (
            tableRowData
          )}
        </tbody>
      </table>
      {/* End Table */}
    </div>
  );
}

export default Orders;
