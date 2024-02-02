import React from "react";
import "./login.css";
import logo from "../../image/Logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [t] = useTranslation();
  return (
    <>
      <div className="main">
        <div className="container p-5 text-center ">
          <h2 className="mb-5 animate__animated animate__zoomIn BlackToWhite">
            {t("Login.loginheader")}
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="ineer p-5 shadow">
                <div className="form mb-4">
                  <input
                    type="text"
                    className="user-name mt-3 d-flex justify-content-center form-control"
                    placeholder={t("Login.username")}
                  />
                  <input
                    type="text"
                    className="user-name mt-3 d-flex justify-content-center form-control"
                    placeholder={t("Login.password")}
                  />
                </div>
                <p
                  style={{ fontSize: "14px" }}
                  className="mt-2 px-3 text-start BlackToWhite"
                >
                  {t("Login.signuphint")}
                  <Link to={"/signup"}>{t("Login.signup")}</Link>
                </p>
                <div className="login-btn d-flex justify-content-center align-items-center mt-3">
                  <Link to={"/#"} className="">
                    {t("Login.button")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
