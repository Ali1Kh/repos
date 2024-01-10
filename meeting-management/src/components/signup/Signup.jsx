import React from "react";
import "./Signup.css";
import Form from "react-bootstrap/Form";
import logo from "../../image/Logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Signup() {
  let initial = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };

  const [t] = useTranslation();

  return (
    <>
      <div className="main">
        <div className="container text-center p-5">
          <h2 className="mb-5 animate__animated animate__zoomIn BlackToWhite">
            {t("signup.signupheader")}
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <form className="ineer shadow p-5">
                <div className="form">
                  <div className="name row gy-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="first-name w-100 form-control"
                        placeholder={t("signup.firstName")}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="last-name w-100 form-control"
                        placeholder={t("signup.lastName")}
                      />
                    </div>

                  </div>

                  <input
                    type="text"
                    className="user-name mt-3 d-flex justify-content-center form-control"
                    placeholder={t("signup.userName")}
                  />
                  <input
                    type="text"
                    className="password mt-3 d-flex justify-content-center form-control"
                    placeholder={t("signup.password")}
                  />
                  <input
                    type="text"
                    className="confirm-password mt-3 d-flex justify-content-center form-control"
                    placeholder={t("signup.confirmPassword")}
                  />

                  <Form.Select aria-label="Role" className="role mt-3" arial>
                    <option selected disabled>
                      {t("signup.role")}
                    </option>
                    <option value="Manager">{t("signup.manager")}</option>
                    <option value="Secretary">{t("signup.sec")}</option>
                  </Form.Select>
                </div>
                <p style={{ fontSize: "14px" }} className="mt-2 text-start BlackToWhite px-3">
                  {t("signup.loginHint")}{" "}
                  <Link to={"/login"}>{t("signup.login")}</Link>
                </p>
                <div className="Signup-btn d-flex justify-content-center align-items-center mt-3">
                  <button type="button" className="">
                    {t("signup.signupheader")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
