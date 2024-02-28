import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Login() {

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateUsername = (email) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,30}$/;
    return usernameRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9]{8,30}$/;
    return passwordRegex.test(password);
  };

  let [errorMessage, seterrorMessage] = useState();

  const handleLogin = () => {
    const emailOrUsername = document.getElementById("emailName").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
  
    let formData;
  
    if (validateEmail(emailOrUsername)) {
      formData = {
        E_mail: emailOrUsername,
        PassWord: password,
        role: role,
      };
    } else if (validateUsername(emailOrUsername)) {
      formData = {
        UserName: emailOrUsername,
        PassWord: password,
        role: role,
      };
    } else {
      seterrorMessage("Invalid email or username");
      return;
    }
  
    if (!validatePassword(password)) {
      seterrorMessage("Invalid password");
      return;
    }
  
    if (role === "Role") {
      seterrorMessage("Choose a Role");
      return;
    }
  
    axios
      .post("https://meetingss.onrender.com/auth/login", formData)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        if (response.data.success === true) {
          localStorage.setItem("token", token);
          if (role === "Manager") {
            navigate("/manager");
          } else if (role === "Secertary") {
            navigate("/meeting");
          } else if (role === "Admin") {
            navigate("/dashboard/meetings");
          }
        } else {
          seterrorMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
                    id="emailName"
                    type="email"
                    className="user-name mt-3 d-flex justify-content-center form-control"
                    placeholder={t("Login.placeholder")}
                  />
                  <input
                    id="password"
                    type="password"
                    className="user-name mt-3 d-flex justify-content-center form-control"
                    placeholder={t("Login.password")}
                  />
                </div>
                <Form.Select
                  id="role"
                  aria-label="Role"
                  className="role mt-3"
                  arial
                >
                  <option selected disabled>
                    {t("signup.role")}
                  </option>
                  <option value="Manager">{t("signup.manager")}</option>
                  <option value="Secertary">{t("signup.sec")}</option>
                  <option value="Admin">{t("signup.admin")}</option>
                </Form.Select>
                <div className="d-flex justify-content-between">
                  <p
                    style={{ fontSize: "14px" }}
                    className="mt-2 px-3 text-start BlackToWhite"
                  >
                    {t("Login.signuphint")}
                    <Link to={"/signup"}>{t("Login.signup")}</Link>
                  </p>
                  <p
                    style={{ fontSize: "14px" }}
                    className="mt-2  px-3 text-start BlackToWhite"
                  >
                    <Link to={"/ForgetPassword"}>Forget Password ?</Link>
                  </p>
                </div>

                <small className="text-danger">{errorMessage}</small>
                <div
                  onClick={handleLogin}
                  className="login-btn d-flex justify-content-center align-items-center mt-3"
                >
                  <Link className="">{t("Login.button")}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
