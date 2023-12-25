import React from 'react'
import './meetingDetails.css'

export default function MeetingDetails() {
  let Details={
    GuestName:"Ali Khaled ElSa3dany",
    MeetingTopic:"Eating",
    MeetingDate:"10-2-99",
    MeetingAddress:"bolq abo el 3ela",
    Area:"msh 3aref",
    Comments:"3mk"
  };

    return <>
    <div className="main">
      <div className="container-fluid parent">
        <div className="row p-5">
          <h2 className='text-white mb-5'>Meeting Details</h2>
            <div className="col-md-12 inner rounded-4 p-4 ">
                <h5 className='mb-4'>Guest Name : <span className='fw-normal'>{Details.GuestName}</span> </h5>
                <h5 className='mb-4'>Meeting Topic : <span className='fw-normal'>{Details.MeetingTopic}</span></h5>
                <h5 className='mb-4'>Meeting Date : <span className='fw-normal'>{Details.MeetingDate}</span></h5>
                <h5 className='mb-4'>Meeting Address : <span className='fw-normal'>{Details.MeetingAddress}</span></h5>
                <h5 className='mb-4'>Inside Or Out side The   Facility : <span className='fw-normal'>{Details.Area}</span></h5>
                <h5 className='mb-4'>Comments : <span className='fw-normal'>{Details.Comments}</span></h5>
            </div>
        </div>
      </div>
      </div>
    </>
  }
