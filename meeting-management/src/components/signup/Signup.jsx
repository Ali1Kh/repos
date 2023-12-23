import React from 'react'
import './Signup.css'
import Form from 'react-bootstrap/Form';
import logoMed from '../../image/Logomedium.png'

export default function Signup() {
  return <>
   <div className='signup-main d-flex justify-content-center align-items-center'>
    <div className="container">
      <div className="signup-logo d-flex justify-content-center align-items-center mb-5">
        <img src={logoMed} alt="" />
      </div>
      <div className="row">
        <div className="col-md-5 m-auto">
      <div className="ineer">
        <div className="form">
          <div className="name d-flex justify-content-between">
            <input type="text" className='first-name form-control ' placeholder='First Name' />
            <input type="text" className='last-name form-control' placeholder='Last Name'/>
          </div>
          <input type="text" className='user-name mt-3 d-flex justify-content-center form-control' placeholder='User Name'/>
          <input type="text" className='user-name mt-3 d-flex justify-content-center form-control' placeholder='Password'/>
          <input type="text" className='user-name mt-3 d-flex justify-content-center form-control' placeholder='Confirm Password'/>
          <Form.Select aria-label="Default select example" className="role mt-3" arial>
            <option>Role</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <div className="Signup-btn d-flex justify-content-center align-items-center mt-3">
          <button className=''>Create account</button>
        </div>
      </div>
      </div>
    </div>
    </div>
  </div>
  </>
}
