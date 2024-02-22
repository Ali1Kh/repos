import React from 'react'
import "./forgotPassword.css"
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    return (
        <>
            <div className='main'>
                <div className='container mt-5'>
                    <h1 className='container d-flex flex-column align-items-center justify-content-center pb-2'>Forgot password?</h1>
                    <p className='d-flex flex-column align-items-center justify-content-center pb-3'>Enter your details to receive a rest link</p>
                    <div className='row table table-squ d-flex align-items-center justify-content-center m-auto'>
                        <input className='email-inp' placeholder='@   Your Email'></input>
                        <button className='btn-forgot'>Send</button>
                        <Link to={''} className='back d-flex align-items-center'>
                            <i class="fa-solid fa-chevron-left"></i>
                            <p>Back to Sign In</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
