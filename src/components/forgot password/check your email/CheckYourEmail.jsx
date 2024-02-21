import React from 'react'
import "./checkYourEmail.css"
import { Link } from 'react-router-dom'

export default function CheckYourEmail() {
  return (
    <div>
      <div className='main'>
        <div className='container mt-5'>
          <h1 className='container d-flex flex-column align-items-center justify-content-center p-4'>Check your Email</h1>
          <p className='d-flex flex-column align-items-center justify-content-center'>We've the code your Email</p>
          <div className='row table table-squ d-flex align-items-center justify-content-center m-auto'>
            <div className='squares col-sm-6 col-xxl-12 '>
              <input className='email-inp'></input>
              <input className='email-inp'></input>
              <input className='email-inp'></input>
              <input className='email-inp'></input>
              <input className='email-inp'></input>
              <input className='email-inp'></input>
            </div>
            <button className='btn-forgot'>Verify</button>
            <button className='btn-forgot-out'>Send again</button>
            <Link to={''} className='back d-flex align-items-center justify-content-center'>
              <i class="fa-solid fa-chevron-left"></i>
              <p>Back to Sign In</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
