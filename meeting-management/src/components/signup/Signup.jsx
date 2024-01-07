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
          <form className="ineer shadow p-5">
            <div className="form">
              <div className="name d-flex justify-content-between">
                <input
                  type="text"
                  className="first-name form-control"
                  placeholder={t("signup.firstName")}
                />
                {/* {initial.firstName.length < 4 || initial.firstName.length > 10 ? <div className='alert alert-danger'>Name must be from 4 to 10 charachters.</div> :"" }
                 */}
                <input
                  type="text"
                  className="last-name form-control"
                  placeholder={t("signup.lastName")}
                />
                {/* {initial.lastName.length < 4 || initial.lastName.length > 10 ? <div className='alert alert-danger'>Name must be from 4 to 10 charachters.</div> :"" }
                 */}
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
            <p className="mt-2 text-start BlackToWhite px-3">
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
    </>
  );
}
