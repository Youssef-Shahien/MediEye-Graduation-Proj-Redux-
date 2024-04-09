import React, { useState } from "react";
import style from "./Orders.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Orders() {
  const arrowFont = <FontAwesomeIcon icon={faChevronDown} />;
  const checkFont = <FontAwesomeIcon icon={faSquareCheck} />;
  const [isActive, setIsActive] = useState(false);

  const activeToggleHandler = (event) => {
    setIsActive(!isActive);
  };
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
            <th scope="col">Created Date</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody className={style.table_group_divider}>
          <tr className={style.complete_order_tr}>
            <th className="text-secondary" scope="row">
              <input className={style.my_check} type="checkbox" />
            </th>
            <td>990-123</td>
            <td className="fw-bold">Tv 14 Inche</td>
            <td>Youssef Shahien</td>
            <td>01222222228</td>
            {/* Start Status Board*/}
            <td className={style.status}>
              <span
                className={`${style.complete}`}
                onClick={activeToggleHandler}
              >
                Complete
              </span>
              <div
                className={`${
                  isActive
                    ? `${style.active_status_board}`
                    : `${style.status_board}`
                } mt-3 bg-light rounded pt-2`}
              >
                <ul className="list-unstyled d-flex flex-column gap-2 justify-content-center align-items-center">
                  <li className={`${style.complete}`}>Complete</li>
                  <li className={`${style.new_order}`}>New Order</li>
                  <li className={`${style.rejected}`}>Rejected</li>
                </ul>
              </div>
            </td>
            {/* End Status Board*/}
            <td>
              March 21,2020
              <br />
              00:28
            </td>
            <td className="fw-bold">19.0$</td>
          </tr>
          <tr className={style.new_order_tr}>
            <th className="text-secondary" scope="row">
              <input className={style.my_check} type="checkbox" />
            </th>
            <td>990-123</td>
            <td className="fw-bold">Tv 14 Inche</td>
            <td>Youssef Shahien</td>
            <td>01222222228</td>
            <td>
              <span className={`${style.new_order}`}>New Order</span>
            </td>
            <td>
              March 21,2020
              <br />
              00:28
            </td>
            <td className="fw-bold">19.0$</td>
          </tr>
          <tr className={style.rejected_order_tr}>
            <th className="text-secondary" scope="row">
              <input className={style.my_check} type="checkbox" />
            </th>
            <td>990-123</td>
            <td className="fw-bold">Tv 14 Inche</td>
            <td>Youssef Shahien</td>
            <td>01222222228</td>
            <td>
              <span
                className={`${style.rejected}`}
                onClick={activeToggleHandler}
              >
                Rejected
              </span>
            </td>
            <td>
              March 21,2020
              <br />
              00:28
            </td>
            <td className="fw-bold">19.0$</td>
          </tr>
        </tbody>
      </table>
      {/* End Table */}
    </div>
  );
}

export default Orders;
