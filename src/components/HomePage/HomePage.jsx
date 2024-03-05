import React, { useContext, useEffect, useState } from "react";
import "./homePage.css";
import MeetingDetails from "../manager/meetingDetails/meetingDetails.jsx";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import $ from "jquery";
import { useQuery } from "react-query";
import axios from "axios";
import { searchContext } from "../context/searchContext.js";
export default function HomePage() {
  let colors = [
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

  localStorage.setItem("colors", JSON.stringify(colors));
  const [t] = useTranslation();
  const authToken = localStorage.getItem("token");

  let { meetings, isLoading } = useContext(searchContext);

  return (
    <>
      <div className="main p-4 mt-5">
        <div className="container">
          <h2
            className="pageHeading mt-4 mb-xxl-5 mb-4 text-center animate__animated animate__zoomIn"
            style={{ userSelect: "none" }}
          >
            {t("HomePage.header")}
          </h2>{" "}
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "65vh" }}
            >
              <TailSpin
                visible={true}
                height="90"
                width="90"
                color="var(--sec-color)"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div className="row gy-3">
              <>
                {meetings ? (
                  meetings.meetings?.length > 0 ? (
                    meetings.meetings?.map((meeting, idx) => (
                      <>
                        <div
                          key={idx}
                          className="inner-parent  col-lg-4 px-lg-4 col-md-12 col-sm-12 mt-4 animate__animated animate__fadeIn animate__slower"
                          data-aos="fade-up"
                          data-aos-delay="500"
                          data-aos-once="true"
                        >
                          <div
                            className="inner-card h-100 shadow rounded-4 gap-3 p-3 justify-content-end flex-column"
                            data-bs-toggle="modal"
                            data-bs-target={`#meetingModal${meeting.meeting_id}`}
                          >
                            <div className="guest-info d-flex flex-column align-items-center">
                              <div
                                className="guest-icon-profile d-flex justify-content-center align-items-center me-3 mb-2 mt-2 ms-3"
                                style={{ width: "55px", height: "50px" }}
                              >
                                <div
                                  className="meetingGuestIcon text-black d-flex justify-content-center align-items-center"
                                  style={{
                                    backgroundColor: `${
                                      colors[
                                        Math.floor(
                                          Math.random() * colors.length
                                        )
                                      ]
                                    }`,
                                  }}
                                >
                                  <span className="m-0 p-0 ">
                                    {meeting.person
                                      .toUpperCase()
                                      .split("")
                                      .slice(0, 1)}
                                  </span>
                                </div>
                              </div>
                              {meeting.person != "undefined" ? (
                                <div className="guest-account text-center d-flex flex-column align-items-center mt-3">
                                  <div className="guest-name flex-column">
                                    <h4>{meeting.person}</h4>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="meeting-info row mt-auto">
                              <div className="meeting-topic col-lg-4 col-md-4">
                                <p className="text-center m-1 heading">
                                  {t("HomePage.meetingTopic")}
                                </p>
                                <p className="text-center m-1">
                                  {meeting.about}
                                </p>
                              </div>

                              <div className="meeting-time col-lg-4 col-md-4">
                                <p className="text-center m-1 heading">
                                  {t("HomePage.meetingTime")}
                                </p>
                                <p className="text-center m-1">
                                  {meeting.time}
                                </p>
                              </div>

                              <div className="meeting-date col-lg-4 col-md-4 p-0">
                                <p className="text-center m-1 heading">
                                  {t("HomePage.meetingDate")}
                                </p>
                                <p className="text-center w-100 m-1 ">
                                  {meeting.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="details position-absolute">
                          <MeetingDetails meetingsDetails={meeting} />
                        </div>
                      </>
                    ))
                  ) : (
                    <div
                      className="d-flex flex-column justify-content-center align-items-center text-center"
                      style={{ height: "50vh" }}
                    >
                      <img src={require("../../image/no-data.png")} alt="" />
                      <h4 className="mt-5">No Meetings Found</h4>
                    </div>
                  )
                ) : (
                  ""
                )}
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
