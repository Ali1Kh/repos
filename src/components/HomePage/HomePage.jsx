import React, { useContext, useEffect, useState } from "react";
import "./homePage.css";
import MeetingDetails from "../manager/meetingDetails/meetingDetails.jsx";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";
import { searchContext } from "../context/searchContext.js";
export default function HomePage() {
  const daysNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const [t] = useTranslation();

  let { meetings, isLoading, getMeetings } = useContext(searchContext);

  useEffect(() => {
    getMeetings();
  }, []);

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
                            className="inner-card h-100 shadow rounded-2 gap-3 p-3 justify-content-end flex-column"
                            data-bs-toggle="modal"
                            data-bs-target={`#meetingModal${meeting.meeting_id}`}
                          >
                            <div className="meetingHeader d-flex gap-2 align-items-center">
                              <div className="headerIcon mb-auto mt-2">
                                <img
                                  src={require(`../../image/days/${
                                    daysNames[new Date(meeting.date).getDay()]
                                  }.png`)}
                                  width={45}
                                  alt=""
                                />
                              </div>
                              <div className="headerCotent p-2">
                                <h5 className="rethink-sans  text-capitalize m-0 mb-2">
                                  {meeting.about}
                                </h5>
                                <p className="fw-normal rethink-sans small text-secondary mb-1">
                                  <i className="fa-regular fa-clock me-1 text-secondary"></i>
                                  {new Date(
                                    "2024-10-10 " + meeting.time
                                  ).toLocaleTimeString("en-EG", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                                <p className="fw-normal rethink-sans small text-secondary">
                                  <i className="fa-regular fa-calendar me-2 text-secondary"></i>
                                  {new Date(meeting.date).toLocaleDateString(
                                    "en-EG",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </div>

                            <div
                              className="meetingNotes  d-flex gap-1 px-3 py-1"
                              style={{ maxWidth: "100%" }}
                            >
                              <span className="rethink-sans text-secondary">
                                {t("meetings.Comments")}
                              </span>
                              :{" "}
                              <p className="mb-0">
                                {" "}
                                {meeting.notes.slice(0, 8) + "..."}
                              </p>
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
