import React, { useState } from "react";
import "./forgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "react-bootstrap/Form";

import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigateUpdatePass = useNavigate();
  const [t] = useTranslation();

  const postEmail = () => {
    if (role === "") {
      toast.error("Role Is Required");
      return;
    }
    if (email === "") {
      toast.error("Email Is Required");
      return;
    } else {
      if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)) {
        toast.error("Email Is Invalid");
        return;
      }
    }
    axios
      .post(`${process.env.REACT_APP_APIHOST}/auth/send-forget-code`, {
        E_mail: email,
        role: role,
      })
      .then((response) => {
        if (response.data.success) {
          sessionStorage.setItem("E_mail", email);
          sessionStorage.setItem("role", role);
          toast.success("Reset Code Sent To Your Email Successfully");
          navigateUpdatePass("/CheckYourEmail");
        } else {
          toast.error("Role Is Invalid");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
      <div className="main">
        <div className="container mt-5">
          <h1 className="container d-flex flex-column align-items-center justify-content-center pb-2">
            {t("forgetPass.forgetPass")}
          </h1>
          <p className="d-flex flex-column align-items-center justify-content-center pb-3">
            {t("forgetPass.enterDetailsToReciveACode")}
          </p>
          <form>
            <div
              style={{ backgroundColor: "var(--cardBgColor)" }}
              className="row table table-squ d-flex align-items-center justify-content-center m-auto"
            >
              <input
                className="email-inp"
                placeholder={t("forgetPass.email")}
                value={email}
                onChange={handleEmailChange}
              />
              <Form.Select
                id="role"
                aria-label="Role"
                className="role forgot mt-3"
                style={{ backgroundColor: "var(--cardBgColor)" }}
                value={role}
                onChange={handleRoleChange}
              >
                <option selected disabled value="">
                  {t("signup.role")}
                </option>
                <option value="Manager">{t("signup.manager")}</option>
                <option value="Secertary">{t("signup.sec")}</option>
              </Form.Select>
              <button type="button" className="btn-forgot" onClick={postEmail}>
                {t("forgetPass.send")}
              </button>
              <Link to={"/login"} className="back d-flex align-items-center">
                <i className="fa-solid fa-chevron-left"></i>
                <p>{t("forgetPass.backToLogin")}</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
