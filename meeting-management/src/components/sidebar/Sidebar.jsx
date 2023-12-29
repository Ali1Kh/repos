import "./sidebar.css";
import logo from "../../image/Logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar d-flex flex-column shadow">
        <div className="side-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="header-side">
          <h6>
            <a href="#">
              <span className="d-inline-flex text-center justify-content-center">
                <i className="fa-solid fa-house"></i>
              </span>
              <span>Home</span>
            </a>
          </h6>
          <h6>
            <Link to={"/manager/calender"}>
              <span className="d-inline-flex text-center justify-content-center">
                <i className="fa-regular fa-calendar-days"></i>
              </span>
              <span>Calendar</span>
            </Link>
          </h6>
          <h6>
            <a href="#">
              <span className="d-inline-flex text-center justify-content-center">
                <i className="fa-regular fa-bell"></i>
              </span>
              <span>Notification</span>
            </a>
          </h6>
          <h6>
            <Link to={"/meeting"}>
              <span className="d-inline-flex text-center justify-content-center">
                <i class="fa-regular fa-note-sticky"></i>
              </span>
              <span>Meetings</span>
            </Link>
          </h6>
          <h6>
            <Link to={"/meeting/addMeeting"}>
              <span className="d-inline-flex text-center justify-content-center">
                <i className="fa-regular fa-plus"></i>
              </span>
              <span>Create Meeting</span>
            </Link>
          </h6>
        </div>
        <div className="setting-side mt-auto">
          <h6>
            <a href="#">
              <span className="d-inline-flex text-center justify-content-center">
                <i className="fa-solid fa-gear"></i>
              </span>
              <span>settings</span>
            </a>
          </h6>
          <h6>
            <a href="#">
              <span className="d-inline-flex text-center justify-content-center">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </span>
              <span>Logout</span>
            </a>
          </h6>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
