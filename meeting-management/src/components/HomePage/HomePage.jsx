import React from 'react'
import "./homePage.css"

export default function HomePage() {
    let meetings = [
        {
            GuestName: "Ali Khaled ElSa3dany",
            MeetingTopic: "Eating",
            MeetingDate: "10-2-99",
            MeetingAddress: "bolq abo el 3ela",
            Area: "msh 3aref",
            Comments: "3mk"
        },
        {
            GuestName: "Ali Khaled ElSa3dany",
            MeetingTopic: "Eating",
            MeetingDate: "10-2-99",
            MeetingAddress: "bolq abo el 3ela",
            Area: "msh 3aref",
            Comments: "3mk"
        },
        {
            GuestName: "Ali Khaled ElSa3dany",
            MeetingTopic: "Eating",
            MeetingDate: "10-2-99",
            MeetingAddress: "bolq abo el 3ela",
            Area: "msh 3aref",
            Comments: "3mk"
        },
        {
            GuestName: "Ali Khaled ElSa3dany",
            MeetingTopic: "Eating",
            MeetingDate: "10-2-99",
            MeetingAddress: "bolq abo el 3ela",
            Area: "msh 3aref",
            Comments: "3mk"
        }
    ];


    return <>
        <div className="main-cards p-4">
            <div className="container">
                <h2 className='text-white mb-5'>Home</h2>
                <div className="row gy-3">
                    {meetings.map((meeting) => <div className="col-md-6  col-sm-12 col-12 mt-4">
                        <div className='inner-card shadow rounded-4 gap-3 p-3'>
                            <h6 className='mb-3'>Guest Name : <span className='fw-normal'>{meeting.GuestName}</span> </h6>
                            <h6 className='mb-3'>Meeting Topic : <span className='fw-normal'>{meeting.MeetingTopic}</span></h6>
                            <h6 className='mb-3'>Meeting Date : <span className='fw-normal'>{meeting.MeetingDate}</span></h6>
                            <h6 className='mb-3'>Meeting Address : <span className='fw-normal'>{meeting.MeetingAddress}</span></h6>
                            <h6 className='mb-3'>Inside Or Out side The Facility : <span className='fw-normal'>{meeting.Area}</span></h6>
                            <h6 className='mb-3'>Comments : <span className='fw-normal'>{meeting.Comments}</span></h6>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    </>
}