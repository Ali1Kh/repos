import "./Layout.css";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./../sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { jwtDecode } from "jwt-decode";

export default function Layout() {
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (localStorage.getItem("token")) {
        const { role } = jwtDecode(localStorage.getItem("token"));
        console.log(role);
        if (role === "Manager") {
          window.location.href = "/home";
        } else if (role === "Secertary") {
          window.location.href = "/meeting";
        } else if (role === "Admin") {
          window.location.href = "/dashboard/meetings";
        }
      }
    }
  }, []);

  return (
    <>
      <div className="layout">
        <Navbar />
        <div className="layout-main d-flex">
          <div className="sidebar-col">
            <Sidebar />
          </div>
          <div className="outlet w-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
