import React from "react";
import "./login.css";
import logo from "../../image/Logo.png";

export default function Login() {
  return (
    <>
      <div className="main d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="login-logo m-auto d-flex justify-content-center align-items-center mb-">
            <img className="w-100" src={logo} alt="" />
          </div>
          <div className="row">
            <div className="col-md-5 m-auto">
              <div className="ineer">
                <div className="form">
                  <input
                    type="text"
                    className="user-name mt-3 d-flex justify-content-center form-control"
                    placeholder="User Name"
                  />
                  <input
                    type="text"
                    className="user-name mt-3 d-flex justify-content-center form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="login-btn d-flex justify-content-center align-items-center mt-3">
                  <button className="">Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
