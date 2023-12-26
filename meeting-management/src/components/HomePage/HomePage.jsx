import React from 'react'
import "./homePage.css"

export default function HomePage() {
    let Details = {
        GuestName: "Ali Khaled ElSa3dany",
        MeetingTopic: "Eating",
        MeetingDate: "10-2-99",
        MeetingAddress: "bolq abo el 3ela",
        Area: "msh 3aref",
        Comments: "3mk"
    };
    return <>
        <div className="main">
            <div className="container-fluid parent">
                <div className="row p-5">
                    <h2 className='text-white mb-5'>Home</h2>
                    <div className="col-md-5 inner shadow rounded-4 p-3 m-auto">
                        <h6 className='mb-3'>Guest Name : <span className='fw-normal'>{Details.GuestName}</span> </h6>
                        <h6 className='mb-3'>Meeting Topic : <span className='fw-normal'>{Details.MeetingTopic}</span></h6>
                        <h6 className='mb-3'>Meeting Date : <span className='fw-normal'>{Details.MeetingDate}</span></h6>
                        <h6 className='mb-3'>Meeting Address : <span className='fw-normal'>{Details.MeetingAddress}</span></h6>
                        <h6 className='mb-3'>Inside Or Out side The   Facility : <span className='fw-normal'>{Details.Area}</span></h6>
                        <h6 className='mb-3'>Comments : <span className='fw-normal'>{Details.Comments}</span></h6>
                    </div>
                    <div className="col-md-5 inner shadow rounded-4 p-3 m-auto">
                        <h6 className='mb-3'>Guest Name : <span className='fw-normal'>{Details.GuestName}</span> </h6>
                        <h6 className='mb-3'>Meeting Topic : <span className='fw-normal'>{Details.MeetingTopic}</span></h6>
                        <h6 className='mb-3'>Meeting Date : <span className='fw-normal'>{Details.MeetingDate}</span></h6>
                        <h6 className='mb-3'>Meeting Address : <span className='fw-normal'>{Details.MeetingAddress}</span></h6>
                        <h6 className='mb-3'>Inside Or Out side The   Facility : <span className='fw-normal'>{Details.Area}</span></h6>
                        <h6 className='mb-3'>Comments : <span className='fw-normal'>{Details.Comments}</span></h6>
                    </div>
                </div>
            </div>
        </div>
    </>
}