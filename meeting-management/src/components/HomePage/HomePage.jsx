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
            MeetingStatus: "Undone",
        },
        {
            GuestName: "Ali Khaled ElSa3dany",
            MeetingTopic: "blablbaa",
            MeetingTime: "12:00 PM",
            MeetingStatus: "Undone",
        },
        {
            GuestName: "Ali Khaled ElSa3dany",
            MeetingTopic: "blablbaa",
            MeetingTime: "12:00 PM",
            MeetingStatus: "Undone",
        },
        {
            GuestName: "Ali Khaled ElSa3dany",
            MeetingTopic: "blablbaa",
            MeetingTime: "12:00 PM",
            MeetingStatus: "Undone",
        },
    ];

    let meetingsDetails = {
        GuestName: "Ali Khaled ElSa3dany",
        MeetingTopic: "blablbaa",
        MeetingDate: "20/10/2024",
        MeetingAddress: "fe el4ar3",
        Area: "Outside",
        MeetingTime: "12:00 PM",
        MeetingStatus: "Undone",
        Comments: "No Comment",
    };

    return (
        <>
            <div className="main-cards p-4">
                <div className="container">
                    <h2 className="text-white mb-5">Home</h2>
                    <div className="row gy-3">
                        {meetings.map((meeting) => (
                            <div
                                className="col-md-6  col-sm-12 col-12 mt-4 "
                                data-aos="fade-up"
                                data-aos-delay="500"
                                data-aos-once="true"
                                onClick={handleShow}
                            >
                                <div
                                    className="inner-card shadow rounded-4 gap-3 p-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalCenter"
                                >
                                    <h6 className="mb-3">
                                        Guest Name :
                                        <span className="fw-normal">{meeting.GuestName}</span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Meeting Topic :
                                        <span className="fw-normal">{meeting.MeetingTopic}</span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Meeting Time :
                                        <span className="fw-normal">{meeting.MeetingTime}</span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Meeting Status :
                                        <span className="fw-normal">{meeting.MeetingStatus}</span>
                                    </h6>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        class="modal fade"
                        id="exampleModalCenter"
                        tabindex="-1"
                        role="dialog"
                        aria-hidden="true"
                    >
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div className="inner-modal shadow rounded-4 p-4">
                                    <div
                                        className="icon d-flex justify-content-end"
                                        onClick={handleClose}
                                    >
                                        <i class=" shadow fa-solid fa-xmark"></i>
                                    </div>
                                    <h6 className="mb-3">
                                        Guest Name :
                                        <span className="fw-normal">
                                            {meetingsDetails.GuestName}
                                        </span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Meeting Topic :
                                        <span className="fw-normal">
                                            {meetingsDetails.MeetingTopic}
                                        </span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Meeting Date :
                                        <span className="fw-normal">
                                            {meetingsDetails.MeetingDate}
                                        </span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Meeting Time :
                                        <span className="fw-normal">
                                            {meetingsDetails.MeetingTime}
                                        </span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Meeting Address :
                                        <span className="fw-normal">
                                            {meetingsDetails.MeetingAddress}
                                        </span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Inside Or Out side The Facility :
                                        <span className="fw-normal">{meetingsDetails.Area}</span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Meeting Status :
                                        <span className="fw-normal">
                                            {meetingsDetails.MeetingStatus}
                                        </span>
                                    </h6>
                                    <h6 className="mb-3">
                                        Comments :
                                        <span className="fw-normal">
                                            {meetingsDetails.Comments}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <Modal show={show} onHide={handleClose} className='modal' >
                    <div className='inner-card shadow rounded-4 p-3'>
                        <div className='icon d-flex justify-content-end' onClick={handleClose} ><i class=" shadow fa-solid fa-xmark"></i></div>
                        <h6 className='mb-3'>Guest Name : <span className='fw-normal'>{meetings.GuestName}</span> </h6>
                        <h6 className='mb-3'>Meeting Topic : <span className='fw-normal'>{meetings.MeetingTopic}</span></h6>
                        <h6 className='mb-3'>Meeting Date : <span className='fw-normal'>{meetings.MeetingDate}</span></h6>
                        <h6 className='mb-3'>Meeting Address : <span className='fw-normal'>{meetings.MeetingAddress}</span></h6>
                        <h6 className='mb-3'>Inside Or Out side The Facility : <span className='fw-normal'>{meetings.Area}</span></h6>
                        <h6 className='mb-3'>Comments : <span className='fw-normal'>{meetings.Comments}</span></h6>
                    </div>
                </Modal> */}
                </div>
            </div>
        </>
    );
}
