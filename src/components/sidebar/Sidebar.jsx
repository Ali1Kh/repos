import "./sidebar.css";
import logo from "../../image/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import $ from "jquery";
const Sidebar = () => {
  const navigate = useNavigate();
  function openSideBar() {
    $(".sideBarInner").show(1000);
    $(".sideBarMini").hide(1000);
  }
  function closeSideBar() {
    $(".sideBarInner").hide(1000);
    $(".sideBarMini").show(1000);
  }
  useEffect(() => {
    // ?Sidebar open-close
    $(".sideOpenBtn").click(() => {
      openSideBar();
    });

    $(".sideCloseBtn").click(() => {
      closeSideBar();
    });
    // ?Active
    $(".sidebarItem").click((e) => {
      $(".sidebarItem.active").removeClass("active");
      if ($(e.target).hasClass("sidebarItem")) {
        $(e.target).addClass("active");
      } else {
        $(e.target).parents(".sidebarItem").addClass("active");
      }
    });
    // ? Animate list
    $(".sidebarItem").eq(0).addClass("animate__fadeInUp animate__delay-150ms");
    $(".sidebarItem").eq(1).addClass("animate__fadeInUp animate__delay-200ms");
    $(".sidebarItem").eq(2).addClass("animate__fadeInUp animate__delay-250ms");
    $(".sidebarItem").eq(3).addClass("animate__fadeInUp animate__delay-300ms");
    $(".sidebarItem").eq(4).addClass("animate__fadeInUp animate__delay-350ms");

    // $(".sidebarItem")
    //   .eq(5)
    //   .addClass("animate__slideInLeft animate__delay-400ms");
    // $(".sidebarItem")
    //   .eq(6)
    //   .addClass("animate__slideInLeft animate__delay-450ms");
    // ?Context

    $(".accMore").click((e) => {
      e.stopPropagation();
      e.preventDefault();
      $(".moreContext").css("display", "block");
    });
    $(document).click(() => {
      $(".moreContext").css("display", "none");
    });

    $(".logout").click((e) => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  });

  const autoLogoutAfterTime = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
    }, 2000);
  };

  const [t] = useTranslation();

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

  return (
    <>
      <div className="sidebar d-flex shadow">
        <div className="sideBarInner flex-column" style={{ display: "flex" }}>
          <div
            style={{ userSelect: "none" }}
            className="side-logo animate__animated animate__pulse"
          >
            <img src={logo} alt="Logo" />
          </div>
          <div className="sideCloseBtn border border-end-0 p-2 position-absolute">
            <i
              className="fa-solid fa-angle-left"
              style={{ color: "#8f8f91" }}
            ></i>
          </div>
          <div className="header-side" style={{ userSelect: "none" }}>
            {role ? (
              role === "Manager" ? (
                <>
                  {" "}
                  <Link
                    className="sidebarItem  animate__animated active"
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
                    className="sidebarItem animate__animated"
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
                    className="sidebarItem animate__animated "
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
                    className="sidebarItem animate__animated"
                    to={"/meeting"}
                  >
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-regular fa-note-sticky"></i>
                    </span>
                    <span>{t("sidebar.meetings")}</span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/meeting/addMeeting"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i className="fa-regular fa-plus "></i>
                    </span>
                    <span>{t("sidebar.createMeeting")}</span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
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
                    className="sidebarItem animate__animated"
                    to={"/dashboard/meetings"}
                  >
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-regular fa-handshake"></i>
                    </span>
                    <span>{t("sidebar.meetings")}</span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/managers"}
                  >
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-solid fa-users"></i>
                    </span>
                    <span>{t("Dashborad.ManageresAndSecretaries.ManageresName")}</span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/secertaries"}
                  >
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-solid fa-chalkboard-user"></i>
                    </span>
                    <span>{t("Dashborad.ManageresAndSecretaries.SecretariesName")}</span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/SecertariesAcceptance"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i class="fa-regular fa-thumbs-up"></i>
                    </span>
                    <span>{t("Dashborad.Acceptacne.AcceptacneSec")}</span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/ManagerAcceptance"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i class="fa-regular fa-thumbs-up"></i>
                    </span>
                    <span>{t("Dashborad.Acceptacne.AcceptacneManager")}</span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/recoverSecertary"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i className="fa-solid fa-trash-arrow-up"></i>
                    </span>
                    <span>{t("Dashborad.recover.recoverSec")}</span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/recoverManager"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i className="fa-solid fa-trash-arrow-up"></i>
                    </span>
                    <span>{t("Dashborad.recover.recoverManager")}</span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
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
          <div className="setting-side mt-auto mb-3">
            <div className="account d-flex justify-content-center align-items-center gap-3 px-3 py-2">
              <div className="accImage text-black d-flex justify-content-center align-items-center bg-primary">
                <span className="m-0 p-0">
                  {username?.split("")[0].toUpperCase()}
                </span>
              </div>
              <div className="accInfo">
                <div className="username">
                  <span>{username}</span>
                </div>
                <div className="email" style={{ color: "var(--mutedColor)" }}>
                  {email}
                </div>
              </div>
              <div className="accMore position-relative cursorPointer d-flex justify-content-center align-items-center ms-auto">
                <i className="fa-solid fa-ellipsis-vertical "></i>
                <div className="moreContext">
                  <div className="item">Settings</div>
                  <div onClick={autoLogoutAfterTime} className="item logout">
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="sideBarMini p-3 flex-column  align-items-center"
          style={{ display: "none" }}
        >
          <div
            style={{ userSelect: "none" }}
            className="sideLogoMini mb-4 animate__animated animate__pulse"
          >
            <img src={logo} alt="Logo" />
          </div>

          <div className="sideOpenBtn border border-start-0 p-2 position-absolute">
            <i
              className="fa-solid fa-angle-right"
              style={{ color: "#8f8f91" }}
            ></i>
          </div>

          <div className="header-side" style={{ userSelect: "none" }}>
            {role ? (
              role === "Manager" ? (
                <>
                  {" "}
                  <Link
                    className="sidebarItem  animate__animated active"
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
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
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
                  </Link>
                  <Link
                    className="sidebarItem animate__animated "
                    to={"/manager/Notes"}
                  >
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-regular fa-note-sticky"></i>
                    </span>
                  </Link>
                </>
              ) : role === "Secertary" ? (
                <>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/meeting"}
                  >
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-regular fa-note-sticky"></i>
                    </span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/meeting/addMeeting"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i className="fa-regular fa-plus "></i>
                    </span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/meeting/createManagerAccount"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i className="fa fa-user-plus "></i>
                    </span>
                  </Link>
                </>
              ) : role === "Admin" ? (
                <>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/meetings"}
                  >
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-regular fa-handshake"></i>
                    </span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/managers"}
                  >
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-solid fa-users"></i>
                    </span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/secertaries"}
                  >
                    <span className="d-inline-flex text-center justify-content-center">
                      <i className="fa-solid fa-chalkboard-user"></i>
                    </span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/SecertariesAcceptance"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i class="fa-regular fa-thumbs-up"></i>
                    </span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/ManagerAcceptance"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i class="fa-regular fa-thumbs-up"></i>
                    </span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/recoverSecertary"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i class="fa-solid fa-trash-arrow-up"></i>
                    </span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/recoverManager"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i class="fa-solid fa-trash-arrow-up"></i>
                    </span>
                  </Link>
                  <Link
                    className="sidebarItem animate__animated"
                    to={"/dashboard/history"}
                  >
                    <span className="d-inline-flex  text-center justify-content-center">
                      <i className="fa-regular fa-file-lines"></i>
                    </span>
                  </Link>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>

          <div className="setting-side mx-4 mt-auto mb-3">
            <div className="accImage text-black d-flex justify-content-center align-items-center bg-info">
              <span className="m-0 p-0">A</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
