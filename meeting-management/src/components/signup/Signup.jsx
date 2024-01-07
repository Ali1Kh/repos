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
      <div className="main d-flex justify-content-center align-items-center">
        <div className="container p-5">
          <div className="signupHead m-auto d-flex justify-content-center align-items-center mb-1">
            <h2>Sign Up</h2>
            {/* <img className="w-100" src={logo} alt="" /> */}
          </div>
          <form className="ineer p-5">
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
                placeholder="User Name"
              />
              <input
                type="text"
                className="password mt-3 d-flex justify-content-center form-control"
                placeholder="Password"
              />
              <input
                type="text"
                className="confirm-password mt-3 d-flex justify-content-center form-control"
                placeholder="Confirm Password"
              />

              <Form.Select
                aria-label="Role"
                className="role mt-3"
                arial
              >
                <option selected  disabled>Role</option>
                <option value="Manager">Manager</option>
                <option value="Secretary">Secretary</option>
              </Form.Select>
            </div>
            <p className="mt-2 px-3">
              Already Have An Acount ? <Link to={"/login"}>Login</Link>
            </p>
            <div className="Signup-btn d-flex justify-content-center align-items-center mt-3">
              <button type="button" className="">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
