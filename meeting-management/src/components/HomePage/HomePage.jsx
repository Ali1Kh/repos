import { useState } from "react";
import React from "react";
import "./homePage.css";
import MeetingDetails from "../manager/meetingDetails/meetingDetails.jsx";
import {Helmet} from "react-helmet";

export default function HomePage() {
  let meetings = [
    {
      GuestName: "Ali Khaled ElSa3dany",
      GuestEmail:"Elsa3dany22@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "12:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "Mostafa Salem",
      GuestEmail:"msalem1@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "12:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "Motaaz",
      GuestEmail:"motaaz33@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "12:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "Omar Kadry Dahab",
      GuestEmail:"dahab10@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "12:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "Salem Ramadan",
      GuestEmail:"salem99@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "11:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "Omar Hefnawy",
      GuestEmail:"hefnawy7@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "09:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "Zeyad Nader",
      GuestEmail:"zezo98@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "12:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "Mohamed Nabil",
      GuestEmail:"nabil2@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "12:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "Saged Sameh",
      GuestEmail:"saged870@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "12:00 PM",
      MeetingStatus: "Not Done",
    },{
      GuestName: "Taha",
      GuestEmail:"taha66@gmail.com",
      MeetingTopic: "blablbaa",
      MeetingTime: "12:00 PM",
      MeetingStatus: "Not Done",
    },
  ];

  // let meetingsDetails = {
  //   GuestName: "Omar Kadry Dahab",
  //   MeetingTopic: "Drdsha",
  //   MeetingDate: "20/10/2024",
  //   MeetingAddress: "Bolaq Abo El3ela",
  //   Area: "Outside",
  //   MeetingTime: "12:00 PM",
  //   MeetingStatus: "Not Done",
  //   Comments: "No Comment",
  // };

  return (
    <>
     <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="main-cards p-4">
        <div className="container">
          <h2
            className="mt-4 mb-xxl-5 mb-3 text-center text-white animate__animated animate__zoomIn"
            style={{ userSelect: "none" }}
          >
            Meetings
          </h2>
          <div className="row gy-3">
            {meetings.map((meeting, idx) => (
              <div
                key={idx}
                className="col-lg-4 col-md-12 col-sm-12 mt-4 animate__animated animate__fadeIn animate__slower"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <div
                  className="inner-card shadow rounded-4 gap-3 p-4 flex-column"
                  data-bs-toggle="modal"
                  data-bs-target="#meetingModal"
                >
                  
                  <div className="guest-info justify-content-start">
                    <div className="guest-icon-profile d-flex justify-content-center align-items-center me-3 ms-3">
                      <i class="fa-solid fa-circle-user fs-1 text-white"></i>
                    </div>
                    
                    <div className="guest-account d-flex flex-column align-items-center mt-3">
                      <div className="guest-name flex-column">
                        <h4>{meeting.GuestName}</h4>
                      </div>
  
                      <div className="guest-email">
                        <h6>{meeting.GuestEmail}</h6>
                      </div>

                    </div>

                      
                  </div>
                   <div className="meeting-info row mt-4">
                    <div className="meeting-topic col-lg-4 col-md-6 col-sm-4">
                      <h5 className="text-center">Topic</h5>
                      <h6 className="text-center">{meeting.MeetingTopic}</h6>
                    </div>

                    <div className="meeting-time col-lg-4 col-md-6 col-sm-4">
                      <h5 className="text-center">Time</h5>
                      <h6 className="text-center">{meeting.MeetingStatus}</h6>
                    </div>

                    <div className="meeting-date col-lg-4 col-md-6 col-sm-4">
                      <h5 className="text-center">Date</h5>
                      <h6 className="text-center">{meeting.MeetingTime}</h6>
                    </div>
                    
                  </div>
                    
                </div>
                </div>
              
            ))}
          </div>
          <MeetingDetails />
        </div>
      </div>
    </>
  );
}
