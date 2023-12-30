import "./sidebar.css";
import logo from "../../image/Logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";
const Sidebar = () => {
  useEffect(() => {
    // ?Active
    $(".sidebarItem").click((e) => {
      $(".sidebarItem.active").removeClass("active");
      $(e.target).addClass("active");
    });
    // ? Animate list
    $(".sidebarItem").eq(0).addClass("animate__fadeInUp animate__delay-150ms");
    $(".sidebarItem").eq(1).addClass("animate__fadeInUp animate__delay-200ms");
    $(".sidebarItem").eq(2).addClass("animate__fadeInUp animate__delay-250ms");
    $(".sidebarItem").eq(3).addClass("animate__fadeInUp animate__delay-300ms");
    $(".sidebarItem").eq(4).addClass("animate__fadeInUp animate__delay-350ms");
    $(".sidebarItem")
      .eq(5)
      .addClass("animate__slideInLeft animate__delay-400ms");
    $(".sidebarItem")
      .eq(6)
      .addClass("animate__slideInLeft animate__delay-450ms");
  });

  return (
    <>
      <div className="sidebar d-flex flex-column shadow">
        <div
          style={{ userSelect: "none" }}
          className="side-logo animate__animated animate__pulse"
        >
          <img src={logo} alt="Logo" />
        </div>
        <div style={{ userSelect: "none" }} className="header-side">
          <Link className="sidebarItem animate__animated active" to={"/home"}>
            <span className="d-inline-flex text-center justify-content-center">
              <i className="fa-solid fa-house"></i>
            </span>
            <span>Home</span>
          </Link>

          <Link
            className="sidebarItem animate__animated"
            to={"/manager/calender"}
          >
            <span className="d-inline-flex text-center justify-content-center">
              <i className="fa-regular fa-calendar-days"></i>
            </span>
            <span>Calendar</span>
          </Link>

          <Link className="sidebarItem animate__animated" href="#">
            <span className="d-inline-flex text-center justify-content-center">
              <i className="fa-regular fa-bell"></i>
            </span>
            <span>Notification</span>
          </Link>

          <Link className="sidebarItem animate__animated" to={"/meeting"}>
            <span className="d-inline-flex text-center justify-content-center">
              <i class="fa-regular fa-note-sticky"></i>
            </span>
            <span>Meetings</span>
          </Link>

          <Link
            className="sidebarItem animate__animated"
            to={"/meeting/addMeeting"}
          >
            <span className="d-inline-flex text-center justify-content-center">
              <i className="fa-regular fa-plus"></i>
            </span>
            <span>Create Meeting</span>
          </Link>
        </div>
        <div className="setting-side mt-auto mb-3 pe-5">
          <Link className="sidebarItem animate__animated" to={"/settings"}>
            <span className="d-inline-flex text-center justify-content-center">
              <i className="fa-solid fa-gear"></i>
            </span>
            <span>Settings</span>
          </Link>

          <Link className="sidebarItem animate__animated" href="#">
            <span className="d-inline-flex text-center justify-content-center">
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </span>
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
