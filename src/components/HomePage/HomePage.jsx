import { useEffect, useState } from "react";
import React from "react";
import "./homePage.css";
import MeetingDetails from "../manager/meetingDetails/meetingDetails.jsx";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function HomePage() {
  const [meetings, setMeetings] = useState([]);
  const [t] = useTranslation();

  useEffect(() => {
    getMeetings();
  },[]);

  function getMeetings() {
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      console.error("Authentication token not found in Local Storage");
      return;
    }

    axios
      .get('https://meetingss.onrender.com/meetings/', {
        headers: {
          'token': authToken,
        },
      })
      .then(response => {
        if (response.data.success === true) {
          setMeetings(response.data.meetings);
          console.log(response.data.meetings);
        }
      })
      .catch(err => console.error(err));
  }


  // let meetings = [
  //   {
  //     GuestName: "Ali Khaled ElSa3dany",
  //     GuestEmail: "Elsa3dany22@gmail.com",
  //     MeetingTopic: "blablbaa",
  //     MeetingTime: "12:00 PM",
  //     MeetingStatus: "Not Done",
  //   },
  // ];

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


  let colors = JSON.parse(localStorage.getItem('colors')) || [
    "#FFB399",
    "#FFFFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#6666664D",
    "#4DB3FF",
    "#1AB399",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#CCCC00",
    "#4D80CC",
    "#4DB380",
    "#99E6E6",
    "#666666FF",
  ];

  localStorage.setItem('colors', JSON.stringify(colors));

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="main p-4 mt-5">
        <div className="container">
          <h2
            className="pageHeading mt-4 mb-xxl-5 mb-4 text-center text-white animate__animated animate__zoomIn"
            style={{ userSelect: "none" }}
          >
            {t("HomePage.header")}
          </h2>
          <div className="row gy-3">
            {meetings ? meetings.map((meeting, idx) => (
              <div
                key={idx}
                className="inner-parent  col-lg-4 px-lg-4 col-md-12 col-sm-12 mt-4 animate__animated animate__fadeIn animate__slower"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <div
                  className="inner-card h-100 shadow rounded-4 gap-3 p-4 flex-column"
                  data-bs-toggle="modal"
                  data-bs-target="#meetingModal"
                >
                  <div className="guest-info d-flex flex-column align-items-center">
                    <div
                      className="guest-icon-profile d-flex justify-content-center align-items-center me-3 mb-2 mt-2 ms-3"
                      style={{ width: "55px", height: "50px" }}
                    >
                      <div
                        className="meetingGuestIcon text-black d-flex justify-content-center align-items-center"
                        style={{
                          backgroundColor: `${colors[Math.floor(Math.random() * colors.length)]
                            }`,
                        }}
                      >
                        <span className="m-0 p-0 ">
                          {meeting.GuestName.split("").slice(0, 1)}
                        </span>
                      </div>
                    </div>
                    <div className="guest-account text-center d-flex flex-column align-items-center mt-3">
                      <div className="guest-name flex-column">
                        <h4>{meeting.GuestName}</h4>
                      </div>
                      <div className="guest-email">
                        <p>{meeting.GuestEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="meeting-info row mt-2">
                    <div className="meeting-topic col-lg-4 col-md-4">
                      <p className="text-center m-1 heading">
                        {t("HomePage.meetingTopic")}
                      </p>
                      <p className="text-center m-1">{meeting.MeetingTopic}</p>
                    </div>

                    <div className="meeting-time col-lg-4 col-md-4">
                      <p className="text-center m-1 heading">
                        {t("HomePage.meetingTime")}
                      </p>
                      <p className="text-center m-1">{meeting.MeetingStatus}</p>
                    </div>

                    <div className="meeting-date col-lg-4 col-md-4">
                      <p className="text-center m-1 heading">
                        {t("HomePage.meetingDate")}
                      </p>
                      <p className="text-center m-1">{meeting.MeetingTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            )) : ""}
          </div>
          <MeetingDetails />
        </div>
      </div>
    </>
  );
}
