import "./Layout.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./../sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import SearchProvider from "../context/searchContext";

export default function Layout() {
  return (
    <>
      <div className="layout">
        <SearchProvider>
          <Navbar />
        </SearchProvider>
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
