import React from 'react'
import './login.css'
import logoMed from '../../image/Logomedium.png'

export default function Login() {
  return <>
    <div className='login-main d-flex justify-content-center align-items-center'>
    <div className="container">
      <div className="login-logo d-flex justify-content-center align-items-center mb-5">
        <img src={logoMed} alt="" />
      </div>
      <div className="row">
        <div className="col-md-5 m-auto">
      <div className="ineer">
        <div className="form">
         
          <input type="text" className='user-name mt-3 d-flex justify-content-center form-control' placeholder='User Name'/>
          <input type="text" className='user-name mt-3 d-flex justify-content-center form-control' placeholder='Password'/>
          
        </div>
        <div className="login-btn d-flex justify-content-center align-items-center mt-3">
          <button className=''>login</button>
        </div>
      </div>
      </div>
    </div>
    </div>
  </div>
  </>
}

