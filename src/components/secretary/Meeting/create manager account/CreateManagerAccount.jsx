import React from "react";
import "./createManagerAccount.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Username is required")
    .matches(/^[a-zA-Z0-9]+$/, "Invalid username"),
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[A-Za-z]+$/, "Invalid first name"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[A-Za-z]+$/, "Invalid last name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^[a-zA-Z0-9]{8,30}$/, "Invalid password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function CreateManagerAccount() {
  const handleManagerAccount = async (values, { resetForm }) => {
    try {
      const authToken = localStorage.getItem("token");

      const formData = {
        UserName: values.userName,
        first_name: values.firstName,
        last_name: values.lastName,
        E_mail: values.email,
        PassWord: values.password,
        confirmPassword: values.confirmPassword,
      };

      const headers = {
        token: authToken,
      };

      const response = await axios.post(
        "https://meetingss.onrender.com/secretary/create-manager",
        formData,
        { headers }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [t] = useTranslation();
  return (
    <>
      <div className="main">
        <div className="container text-center p-5">
          <h2 className="mb-5 animate__animated animate__zoomIn BlackToWhite">
            {t("signup.createManagerAccount")}
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <Formik
                initialValues={{
                  userName: "",
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleManagerAccount}
              >
                <Form className="ineer shadow p-5">
                  <div className="form text-start">
                    <div className="name row gy-3">
                      <div className="col-md-6 text-start">
                        <Field
                          type="text"
                          name="firstName"
                          className="first-name w-100 form-control"
                          placeholder={t("signup.firstName")}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="label"
                          className="error-label"
                        />
                      </div>
                      <div className="col-md-6 text-start">
                        <Field
                          type="text"
                          name="lastName"
                          className="last-name w-100 form-control"
                          placeholder={t("signup.lastName")}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="label"
                          className="error-label"
                        />
                      </div>
                    </div>
                    <Field
                      type="text"
                      name="userName"
                      className="user-name mt-3 d-flex justify-content-center form-control"
                      placeholder={t("signup.userName")}
                    />
                    <ErrorMessage
                      name="userName"
                      component="label"
                      className="error-label"
                    />
                    <Field
                      type="email"
                      name="email"
                      className="user-name mt-3 d-flex justify-content-center form-control"
                      placeholder={t("signup.email")}
                    />
                    <ErrorMessage
                      name="email"
                      component="label"
                      className="error-label"
                    />
                    <Field
                      type="password"
                      name="password"
                      className="password mt-3 d-flex justify-content-center form-control"
                      placeholder={t("signup.password")}
                    />
                    <ErrorMessage
                      name="password"
                      component="label"
                      className="error-label"
                    />
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="confirm-password mt-3 d-flex justify-content-center form-control"
                      placeholder={t("signup.confirmPassword")}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="label"
                      className="error-label"
                    />
                  </div>
                  <div
                    id="btn"
                    type="submit"
                    className="Signup-btn d-flex justify-content-center align-items-center mt-3"
                  >
                    <button type="submit">{t("signup.signupheader")}</button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateManagerAccount;
