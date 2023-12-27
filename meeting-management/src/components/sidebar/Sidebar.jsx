import "./sidebar.css";
import logo from "../../image/Logo-small.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar shadow">
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
            <Link to={"/meeting/addMeeting"}>
              <span className="d-inline-flex text-center justify-content-center">
                <i className="fa-solid fa-plus"></i>
              </span>
              <span>create meeting</span>
            </Link>
          </h6>
          <h6>
            <Link to={"/meeting"}>
              <span className="d-inline-flex text-center justify-content-center">
                <i className="fa-solid fa-handshake"></i>
              </span>
              <span>meetings</span>
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
