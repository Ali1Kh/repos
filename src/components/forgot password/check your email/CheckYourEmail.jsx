import React, { useState } from 'react';
import "./checkYourEmail.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MuiOtpInput } from 'mui-one-time-password-input';

export default function CheckYourEmail() {

  const [code, setCode] = useState("");
  const navigateUpdatePass = useNavigate();
  const email = sessionStorage.getItem("E_mail");
  const role = sessionStorage.getItem("role");

  const handleChange = (newValue) => {
    setCode(newValue);
  };

  async function resetCode() {


    axios
      .post("https://meetingss.onrender.com/auth/verifyResetCode", {
        E_mail: email,
        code: code,
        role: role,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          navigateUpdatePass("/ResetPassword");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }

  const postSendAgain = () => {
    axios
      .post("https://meetingss.onrender.com/auth/send-forget-code", {
        E_mail: email,
        role: role
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          toast.success("Code Resend Successfully");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function validateChar(value) {
    if (!value.match(/^\d$/)) {
      toast.remove();
      toast.error("Please Enter Vaild Reset Code");
    }
    return value.match(/^\d$/);
  }

  return (
    <div>
      <div className='main'>
        <div className='container mt-5'>
          <h1 className='container d-flex flex-column align-items-center justify-content-center p-4'>Check your Email</h1>
          <p className='d-flex flex-column align-items-center justify-content-center'>We've the code your Email</p>
          <div className='row check table table-squ d-flex align-items-center justify-content-center m-auto'>
            <div className='mb-3 d-flex align-items-center justify-content-center'>
              <MuiOtpInput
                TextFieldsProps={{ size: "small" }}
                value={code}
                onChange={handleChange}
                length={6}
                maxWidth={"450px"}
                validateChar={validateChar}
              />
            </div>
            <button
              disabled={code.length === 6 ? false : true}
              onClick={resetCode}
              className="btn-forgot"
            >Verify</button>
            <button onClick={postSendAgain} className='btn-forgot-out'>Send again</button>
            <Link to={'/signup'} className='back d-flex align-items-center justify-content-center'>
              <i className="fa-solid fa-chevron-left"></i>
              <p>Back to Sign In</p>
            </Link>
          </div>
        </div>
      </div>
    </div >
  )
}
