import { useState } from "react";
import React from "react";
import "./homePage.css";
import MeetingDetails from "../manager/meetingDetails/MeetingDetails";
import {Helmet} from "react-helmet";
export default function HomePage() {
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
      GuestName: "Motaaz",
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
    {
      GuestName: "salem ramdan",
      MeetingTopic: "blablbaa",
      MeetingTime: "11:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "omar hefnawyyy",
      MeetingTopic: "blablbaa",
      MeetingTime: "09:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "zeyad nader",
      MeetingTopic: "blablbaa",
      MeetingTime: "12:00 PM",
      MeetingStatus: "Not Done",
    },
    {
      GuestName: "mohamed nabil",
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
                className="col-md-4 mt-4 animate__animated animate__fadeIn animate__slower"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <div
                  className="inner-card shadow rounded-4 gap-3 p-3"
                  data-bs-toggle="modal"
                  data-bs-target="#meetingModal"
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
          <MeetingDetails />
        </div>
      </div>
    </>
  );
}
