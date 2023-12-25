import React from 'react'
import './Signup.css'
import Form from 'react-bootstrap/Form';
import logoMed from '../../image/Logomedium.png'

export default function Signup() {
  
  let initial={
    firstName:"",
    lastName:"",
    userName:"",
    password:"",
    confirmPassword:""
  };

  return <>
   <div className='signup-main d-flex justify-content-center align-items-center'>
    <div className="container">
      <div className="signup-logo d-flex justify-content-center align-items-center mb-5">
        <img src={logoMed} alt="" />
      </div>
      <div className="row">
      <div className="col-md-5 m-auto">

        <form className="ineer">
          <div className="form">
            <div className="name d-flex justify-content-between">
              <input type="text" className='first-name form-control' value={initial.firstName} placeholder='First Name' />
              {/* {initial.firstName.length < 4 || initial.firstName.length > 10 ? <div className='alert alert-danger'>Name must be from 4 to 10 charachters.</div> :"" }
               */}
              <input type="text" className='last-name form-control' value={initial.lastName} placeholder='Last Name'/>
              {/* {initial.lastName.length < 4 || initial.lastName.length > 10 ? <div className='alert alert-danger'>Name must be from 4 to 10 charachters.</div> :"" }
               */}
            </div>
        
          <input type="text" className='user-name mt-3 d-flex justify-content-center form-control' placeholder='User Name'/>
          <input type="text" className='password mt-3 d-flex justify-content-center form-control' placeholder='Password'/>
          <input type="text" className='confirm-password mt-3 d-flex justify-content-center form-control' placeholder='Confirm Password'/>
        
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
      </form>
      </div>
    </div>
    </div>
  </div>
  </>
}
