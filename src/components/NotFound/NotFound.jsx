import React from "react";
import { Link } from "react-router-dom";
import './notfound.css';
export default function NotFound() {
  return (
    <>
      <div className="main p-5">
        <div className="container p-5 d-flex flex-column justify-content-center align-items-center">
          <div className="imageContainer" style={{ width: "550px" ,userSelect:"none"}}>
            <img
              className="w-100"
              src={require("../../image/Erorr_404.png")}
              alt="not found page"
            />
          </div>
          <h4>Page Not Found</h4>
          <Link
            to={"/home"}
            className="returnBtn btn rounded-3 mt-4 text-decoration-none"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
