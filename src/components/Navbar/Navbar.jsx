import React, { useContext, useEffect, useState } from "react";
import logo from "../../image/Logo.png";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { searchContext } from "../context/searchContext";
import Notifications from "../manager/notifications/Notifications";

export default function Navbar() {
  const location = useLocation();

  const navigate = useNavigate();

  let [username, setUsername] = useState();
  let [email, setEmail] = useState();
  let [role, setRole] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const { username, E_mail, role } = jwtDecode(
        localStorage.getItem("token")
      );
      setUsername(username);
      setRole(role);
      setEmail(E_mail);
    }
  }, []);

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

    // ?Active
    $(".nav-item").click((e) => {
      $(".nav-item.active").removeClass("active");
      if ($(e.target).hasClass("nav-item")) {
        $(e.target).addClass("active");
      } else {
        $(e.target).parents(".nav-item").addClass("active");
      }
    });
    // ? Animate list
    $(".nav-item").eq(0).addClass("animate__fadeInUp animate__delay-150ms");
    $(".nav-item").eq(1).addClass("animate__fadeInUp animate__delay-200ms");
    $(".nav-item").eq(2).addClass("animate__fadeInUp animate__delay-250ms");
    $(".nav-item").eq(3).addClass("animate__fadeInUp animate__delay-300ms");
    $(".nav-item").eq(4).addClass("animate__fadeInUp animate__delay-350ms");
    // $(".nav-item")
    //   .eq(5)
    //   .addClass("animate__slideInLeft animate__delay-400ms");
    // $(".nav-item")
    //   .eq(6)
    //   .addClass("animate__slideInLeft animate__delay-450ms");
    // ?Context

    $(".logout").click((e) => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  });

  const token = localStorage.getItem("token");

  const [t, il8n] = useTranslation();

  let { searchMeet } = useContext(searchContext);
  const handleKeyPress = async (event) => {
    await searchMeet(event.target.value);
    await searchMeet(event.target.value);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid nav-main">
          <a
            className="navbar-brand d-flex align-items-center gap-3 animate__animated animate__fadeInLeft"
            href="#"
          >
            <img className="nav-logo" src={logo}></img>
            {location.pathname.split("/")[1] === "login" ||
            location.pathname.split("/")[1] === "signup" ? (
              <h5 className=" mb-0">Meeting Managment</h5>
            ) : (
              ""
            )}
          </a>
          <div className="d-flex">
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
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav w-100 d-flex  align-items-center mt-2 mb-2 mb-lg-0">
              <div className="header-side" style={{ userSelect: "none" }}>
                {role ? (
                  role === "Manager" ? (
                    <>
                      {" "}
                      <Link
                        className="nav-item  animate__animated active"
                        to={"/home"}
                      >
                        <span className="d-inline-flex text-center justify-content-center">
                          <div className="svgIcon">
                            <svg
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17 14.3425V8.79451C17 8.26017 16.9995 7.99286 16.9346 7.74422C16.877 7.52387 16.7825 7.31535 16.6546 7.12693C16.5102 6.9143 16.3096 6.73797 15.9074 6.38611L11.1074 2.18611C10.3608 1.53283 9.98751 1.20635 9.56738 1.08211C9.19719 0.972631 8.80261 0.972631 8.43242 1.08211C8.01261 1.20626 7.63985 1.53242 6.89436 2.18472L2.09277 6.38611C1.69064 6.73798 1.49004 6.9143 1.3457 7.12693C1.21779 7.31536 1.12255 7.52387 1.06497 7.74422C1 7.99286 1 8.26017 1 8.79451V14.3425C1 15.2743 1 15.7401 1.15224 16.1076C1.35523 16.5977 1.74432 16.9875 2.23438 17.1905C2.60192 17.3427 3.06786 17.3427 3.99974 17.3427C4.93163 17.3427 5.39808 17.3427 5.76562 17.1905C6.25568 16.9875 6.64467 16.5978 6.84766 16.1077C6.9999 15.7402 7 15.2742 7 14.3424V13.3424C7 12.2378 7.89543 11.3424 9 11.3424C10.1046 11.3424 11 12.2378 11 13.3424V14.3424C11 15.2742 11 15.7402 11.1522 16.1077C11.3552 16.5978 11.7443 16.9875 12.2344 17.1905C12.6019 17.3427 13.0679 17.3427 13.9997 17.3427C14.9316 17.3427 15.3981 17.3427 15.7656 17.1905C16.2557 16.9875 16.6447 16.5977 16.8477 16.1076C16.9999 15.7401 17 15.2743 17 14.3425Z"
                                stroke="var(--BlackToWhite)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </span>
                        <span>{t("sidebar.meetings")}</span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/manager/calender"}
                      >
                        <span className="d-inline-flex text-center justify-content-center">
                          <div className="svgIcon">
                            <svg
                              width="18"
                              height="20"
                              viewBox="0 0 18 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 3H4.2002C3.08009 3 2.51962 3 2.0918 3.21799C1.71547 3.40973 1.40973 3.71547 1.21799 4.0918C1 4.51962 1 5.08009 1 6.2002V7M5 3H13M5 3V1M13 3H13.8002C14.9203 3 15.4796 3 15.9074 3.21799C16.2837 3.40973 16.5905 3.71547 16.7822 4.0918C17 4.5192 17 5.07899 17 6.19691V7M13 3V1M1 7V15.8002C1 16.9203 1 17.4801 1.21799 17.9079C1.40973 18.2842 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07899 19 4.19691 19H13.8031C14.921 19 15.48 19 15.9074 18.7822C16.2837 18.5905 16.5905 18.2842 16.7822 17.9079C17 17.4805 17 16.9215 17 15.8036V7M1 7H17M13 15H13.002L13.002 15.002L13 15.002V15ZM9 15H9.002L9.00195 15.002L9 15.002V15ZM5 15H5.002L5.00195 15.002L5 15.002V15ZM13.002 11V11.002L13 11.002V11H13.002ZM9 11H9.002L9.00195 11.002L9 11.002V11ZM5 11H5.002L5.00195 11.002L5 11.002V11Z"
                                stroke="var(--BlackToWhite)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </span>
                        <span>{t("sidebar.calendar")}</span>
                      </Link>
                      <Link
                        className="nav-item animate__animated "
                        to={"/manager/Notes"}
                      >
                        <span className="d-inline-flex text-center justify-content-center">
                          <i className="fa-regular fa-note-sticky"></i>
                        </span>
                        <span>{t("sidebar.Nots")}</span>
                      </Link>
                    </>
                  ) : role === "Secertary" ? (
                    <>
                      <Link
                        className="nav-item animate__animated"
                        to={"/meeting"}
                      >
                        <span className="d-inline-flex text-center justify-content-center">
                          <i className="fa-regular fa-note-sticky"></i>
                        </span>
                        <span>{t("sidebar.meetings")}</span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/meeting/addMeeting"}
                      >
                        <span className="d-inline-flex  text-center justify-content-center">
                          <i className="fa-regular fa-plus "></i>
                        </span>
                        <span>{t("sidebar.createMeeting")}</span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/meeting/createManagerAccount"}
                      >
                        <span className="d-inline-flex  text-center justify-content-center">
                          <i className="fa fa-user-plus "></i>
                        </span>
                        <span>{t("sidebar.createManagerAccount")}</span>
                      </Link>
                    </>
                  ) : role === "Admin" ? (
                    <>
                      <Link
                        className="nav-item animate__animated"
                        to={"/dashboard/meetings"}
                      >
                        <span className="d-inline-flex text-center justify-content-center">
                          <i className="fa-regular fa-handshake"></i>
                        </span>
                        <span>{t("sidebar.meetings")}</span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/dashboard/managers"}
                      >
                        <span className="d-inline-flex text-center justify-content-center">
                          <i className="fa-solid fa-users"></i>
                        </span>
                        <span>
                          {t("Dashborad.ManageresAndSecretaries.ManageresName")}
                        </span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/dashboard/secertaries"}
                      >
                        <span className="d-inline-flex text-center justify-content-center">
                          <i className="fa-solid fa-chalkboard-user"></i>
                        </span>
                        <span>
                          {t(
                            "Dashborad.ManageresAndSecretaries.SecretariesName"
                          )}
                        </span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/dashboard/SecertariesAcceptance"}
                      >
                        <span className="d-inline-flex  text-center justify-content-center">
                          <i class="fa-regular fa-thumbs-up"></i>
                        </span>
                        <span>{t("Dashborad.Acceptacne.AcceptacneSec")}</span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/dashboard/ManagerAcceptance"}
                      >
                        <span className="d-inline-flex  text-center justify-content-center">
                          <i class="fa-regular fa-thumbs-up"></i>
                        </span>
                        <span>
                          {t("Dashborad.Acceptacne.AcceptacneManager")}
                        </span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/dashboard/recoverSecertary"}
                      >
                        <span className="d-inline-flex  text-center justify-content-center">
                          <i className="fa-solid fa-trash-arrow-up"></i>
                        </span>
                        <span>{t("Dashborad.recover.recoverSec")}</span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/dashboard/recoverManager"}
                      >
                        <span className="d-inline-flex  text-center justify-content-center">
                          <i className="fa-solid fa-trash-arrow-up"></i>
                        </span>
                        <span>{t("Dashborad.recover.recoverManager")}</span>
                      </Link>
                      <Link
                        className="nav-item animate__animated"
                        to={"/dashboard/history"}
                      >
                        <span className="d-inline-flex  text-center justify-content-center">
                          <i className="fa-regular fa-file-lines"></i>
                        </span>
                        <span>{t("Dashborad.history.historyName")}</span>
                      </Link>
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
              {role ? (
                role === "Manager" ? (
                  <>
                    <li className="d-non nav-item search ms-auto d-flex justify-content-center align-items-center me-3">
                      <div className="input-group w-100 ps-0 pe-5">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                          type="search"
                          className="form-control ps-0 pe-5 searchInput py-2 text-white"
                          id="searchName"
                          onChange={handleKeyPress}
                          placeholder={t("search")}
                        />
                      </div>
                    </li>
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              <li className="nav-item all ms-md-auto d-flex justify-content-center align-items-center me-3">
                <div>
                  {role ? (
                    role === "Manager" ? (
                      <>
                        <Notifications />
                      </>
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </div>
                <div className="darkmodeContainer h-100 d-flex justify-content-center align-items-center px-3">
                  <label className="toggle" htmlFor="switch">
                    <input
                      id="switch"
                      className="input"
                      type="checkbox"
                      defaultChecked
                    />
                    <div className="switchIcon icon--moon">
                      <svg
                        height="25"
                        width="25"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>

                    <div className="switchIcon icon--sun">
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
                  <div className="mydict">
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
                          defaultChecked
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
