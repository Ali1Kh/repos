import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResetPassword() {

    const email = sessionStorage.getItem("E_mail");
    const role = sessionStorage.getItem("role");

    const navigateUpdatePass = useNavigate();


    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Required')
                .min(8, 'Must be at least 8 characters'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: (values) => {
            resetPassword(values);
        },
    });

    const resetPassword = ({ password, confirmPassword }) => {
        axios
            .post("https://meetingss.onrender.com/auth/forget-password", {
                E_mail: email,
                PassWord: password,
                confirmPassword: confirmPassword,
                role: role,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    toast.success("Password reset successful");
                    navigateUpdatePass("/Login");

                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <div>
            <div className='main'>
                <div className='container mt-5'>
                    <h1 className='container d-flex flex-column align-items-center justify-content-center pb-2'>Reset your password</h1>
                    <p className='d-flex flex-column align-items-center justify-content-center pb-3'>Please enter your new password</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='row table table-squ d-flex align-items-center justify-content-center m-auto'>
                            <input
                                type='password'
                                className={`email-inp ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                placeholder='New Password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="password"
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}
                            <input
                                type='password'
                                className={`email-inp ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder='Confirm New Password'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="confirmPassword"
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                            ) : null}
                            <button type="submit" className='btn-forgot'>Done</button>
                            <Link to={'/signup'} className='back d-flex align-items-center'>
                                <i className="fa-solid fa-chevron-left"></i>
                                <p>Back to Sign In</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
