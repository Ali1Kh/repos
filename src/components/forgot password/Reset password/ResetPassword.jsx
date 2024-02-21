import React from 'react'
import { Link } from 'react-router-dom'

export default function ResetPassword() {
    return (
        <div>
            <div className='main'>
                <div className='container mt-5'>
                    <h1 className='container d-flex flex-column align-items-center justify-content-center pb-2'>Reset your password</h1>
                    <p className='d-flex flex-column align-items-center justify-content-center pb-3'>Please enter your new password</p>
                    <div className='row table table-squ d-flex align-items-center justify-content-center m-auto'>
                        <input className='email-inp' placeholder='New Password'></input>
                        <button className='btn-forgot'>Done</button>
                        <Link to={''} className='back d-flex align-items-center'>
                            <i class="fa-solid fa-chevron-left"></i>
                            <p>Back to Sign In</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
