import React, { useEffect } from "react";
import logo from "../../image/Logo.png";
import "./navbar.css";
import { Link } from "react-router-dom";
import $ from "jquery";
export default function Navbar() {
  useEffect(() => {
    // ?Active
    $(".navbarItem").click((e) => {
      console.log($(e.target).parents(".navbarItem"));
      $(".navbarItem.active").removeClass("active");
      $(e.target).parents(".navbarItem").addClass("active");
    });
  });
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid nav-main">
          <a className="navbar-brand d-flex align-items-center gap-3 animate__animated animate__fadeInLeft" href="#">
            <img className="nav-logo" src={logo}></img>
            <h5 className="text-white mb-0">Meeting Managment</h5>
          </a>
          <button
            className="navbar-toggler border-0 animate__animated animate__fadeInRight"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars text-white fs-1"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mt-2 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="navbarItem  animate__animated active"
                  to={"/home"}
                >
                  <div className="navItemInner">
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-solid fa-house"></i>
                    </span>
                    <span>Home</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="navbarItem  animate__animated"
                  to={"/manager/calender"}
                >
                  <div className="navItemInner">
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-regular fa-calendar-days"></i>
                    </span>
                    <span>Calendar</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
               
                  <Link className="navbarItem animate__animated" href="#">
                    <div className="navItemInner">
                      <span className="d-inline-flex text-center justify-content-center">
                        <i className="fa-regular fa-bell"></i>
                      </span>
                      <span>Notification</span>
                    </div>
                  </Link>
               
              </li>
              <li className="nav-item">
                <Link className="navbarItem animate__animated" to={"/meeting"}>
                  <div className="navItemInner">
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-regular fa-note-sticky"></i>
                    </span>
                    <span>Meetings</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="navbarItem animate__animated"
                  to={"/meeting/addMeeting"}
                >
                  <div className="navItemInner">
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-regular fa-plus"></i>
                    </span>
                    <span>Create Meeting</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
