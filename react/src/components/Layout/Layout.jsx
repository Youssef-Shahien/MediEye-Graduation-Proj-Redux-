import style from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import HeaderLogin from "./../Header/Header";
import { useEffect, useState } from "react";

export default function Layout() {
  const [isMinized, setIsminmized] = useState(false);
  const [isAdmin, setAdmin] = useState(true);

  useEffect(() => {
    const adminFromLocalStorage = JSON.parse(localStorage.getItem("admin"));
    if (adminFromLocalStorage) {
      setAdmin(adminFromLocalStorage);
    }
  }, []);

  return (
    <>
      <HeaderLogin />
      <div className="d-flex min-vh-100 align-items-stretch">
        <div className={isMinized ? style["sidebar-mini"] : `${style.sidebar}`}>
          <Sidebar
            isMinized={isMinized}
            setIsminmized={setIsminmized}
            isAdmin={isAdmin}
            setAdmin={setAdmin}
          />
        </div>

        <div className={`${style.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
