import { useState } from "react";
import React from "react";
import "./homePage.css";
import Modal from "react-bootstrap/Modal";

export default function HomePage() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let meetings = [
        {
            GuestName: "Ali Khaled ElSa3dany",
            MeetingTopic: "blablbaa",
            MeetingTime: "12:00 PM",
            MeetingStatus: "Not Done",
        },
        {
            GuestName: "Mostafa Salem",
            MeetingTopic: "blablbaa",
            MeetingTime: "12:00 PM",
            MeetingStatus: "Not Done",
        },
        {
            GuestName: "Mostafa Salem",
            MeetingTopic: "blablbaa",
            MeetingTime: "12:00 PM",
            MeetingStatus: "Not Done",
        },
        {
            GuestName: "omar Kadry Dahab",
            MeetingTopic: "blablbaa",
            MeetingTime: "12:00 PM",
            MeetingStatus: "Not Done",
        },
    ];

    let meetingsDetails = {
        GuestName: "Omar Kadry Dahab",
        MeetingTopic: "Drdsha",
        MeetingDate: "20/10/2024",
        MeetingAddress: "Bolaq Abo El3ela",
        Area: "Outside",
        MeetingTime: "12:00 PM",
        MeetingStatus: "Not Done",
        Comments: "No Comment",
    };

    return (
        <>
            <div className="main-cards p-4">
                <div className="container">
                    <h2 className="text-white mb-5">Home</h2>
                    <div className="row gy-3">
                        {meetings.map((meeting) => (
                            <div className="col-md-6  col-sm-12 col-12 mt-4 " data-aos="fade-up" data-aos-delay="500" data-aos-once="true" onClick={handleShow}>
                                <div className="inner-card shadow rounded-4 gap-3 p-3" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                    <h6 className="mb-3"> Guest Name : <span className="fw-normal">{meeting.GuestName}</span></h6>
                                    <h6 className="mb-3"> Meeting Topic : <span className="fw-normal">{meeting.MeetingTopic}</span></h6>
                                    <h6 className="mb-3"> Meeting Time : <span className="fw-normal">{meeting.MeetingTime}</span></h6>
                                    <h6 className="mb-3"> Meeting Status : <span className="fw-normal">{meeting.MeetingStatus}</span></h6>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="modal fade" id="exampleModalCenter">
                        <div class="modal-dialog col-md-7 modal-dialog-centered" role="document">
                            <div class="modal-content transition: `opacity 400ms, backdrop-filter 400ms`" >
                                <div className="inner-modal shadow rounded-4 p-4">
                                    <div className="icon d-flex justify-content-end" onClick={handleClose}>
                                        <i class="shadow fa-solid fa-xmark"></i>
                                    </div>
                                    <div className="meeting-topic m-3">
                                        <h2 className="text-white">Meeting Topic</h2>
                                    </div>
                                    <div className="container meeting-container">
                                    <div className="row g-5">
                                        <div className="col-md-6">
                                        <div className="col-ineer">
                                        <span>Guest Name</span>
                                        <h5 className="mb-3">{meetingsDetails.GuestName}</h5>
                                        
                                        <span className="fw-normal">Meeting Topic</span>
                                        <h5 className="mb-3">{meetingsDetails.MeetingTopic}</h5>

                                        <span>Meeting Date</span>    
                                        <h5 className="mb-3">{meetingsDetails.MeetingDate}</h5>
                                        
                                        <span>Meeting Time</span>    
                                        <h5 className="mb-3">{meetingsDetails.MeetingTime}</h5>
                                        </div>
                                        </div>
                                    
                                        <div className="col-md-6">
                                        <div className="col-ineer">  
                                        <span>Meeting Address</span>
                                        <h5 className="mb-3">{meetingsDetails.MeetingAddress}</h5>

                                        <span>Inside Or Out side The Facility</span>
                                        <h5 className="mb-3">{meetingsDetails.Area}</h5>
                                        
                                        <span>Meeting Status</span>
                                        <h5 className="mb-3">{meetingsDetails.MeetingStatus}</h5>

                                        <span>Comments</span>
                                        <h5 className="mb-3">{meetingsDetails.Comments}</h5>
                                       
                                        </div>
                                        </div>
                                       
                                    </div>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
