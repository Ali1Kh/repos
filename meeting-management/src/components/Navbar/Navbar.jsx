import React, { useEffect, useState } from "react";
import logo from "../../image/Logo.png";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const location = useLocation();
  useEffect(() => {
    // ?Active
    $(".navbarItem").click((e) => {
      $("#navbarSupportedContent").addClass("collapsing", () => {
        $(".navbar-toggler").addClass("collapsed");
        $("#navbarSupportedContent").removeClass("show");
      });
      $(".navbarItem.active").removeClass("active");
      $(e.target).parents(".navbarItem").addClass("active");
    });
  });
  const [t, il8n] = useTranslation();

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid nav-main">
          <a
            className="navbar-brand d-flex align-items-center gap-3 animate__animated animate__fadeInLeft"
            href="#"
          >
            <img className="nav-logo" src={logo}></img>
            {location.pathname.split("/")[1] == "login" ||
            location.pathname.split("/")[1] == "signup" ? (
              <h5 className="text-white mb-0">Meeting Managment</h5>
            ) : (
              ""
            )}
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
            <ul className="navbar-nav w-100 d-flex  align-items-center mt-2 mb-2 mb-lg-0">
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
              {/* <li className="nav-item">
                <Link className="navbarItem animate__animated" href="#">
                  <div className="navItemInner">
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-regular fa-bell"></i>
                    </span>
                    <span>Notification</span>
                  </div>
                </Link>
              </li> */}
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
              <li className="nav-item search ms-auto d-flex justify-content-center align-items-center me-3">
                <div class="input-group w-100 ps-0 pe-5">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control text-white ps-0 pe-5 searchInput py-2"
                    id="search"
                    placeholder={t("search")}
                  />
                </div>
              </li>
              <li className="nav-item all ms-md-auto d-flex justify-content-center align-items-center me-3">
                <div className="darkmodeContainer h-100 d-flex justify-content-center align-items-center px-3">
                  <label class="toggle" for="switch">
                    <input
                      id="switch"
                      class="input"
                      type="checkbox"
                      defaultChecked
                    />
                    <div class="switchIcon icon--moon">
                      <svg
                        height="25"
                        width="25"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </div>

                    <div class="switchIcon icon--sun">
                      <svg
                        height="25"
                        width="25"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                      </svg>
                    </div>
                  </label>
                </div>
                <div className="langBtn h-100 d-flex justify-content-center align-items-center">
                  <div class="mydict">
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="radio"
                          onClick={() => {
                            il8n.changeLanguage("en");
                          }}
                        />
                        <span>EN</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          name="radio"
                          onClick={() => {
                            il8n.changeLanguage("ar");
                          }}
                        />
                        <span>AR</span>
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
