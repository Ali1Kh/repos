import React from "react";
import "./meetingDetails.css";
import { Helmet } from "react-helmet";
export default function MeetingDetails() {
  let meetingsDetails = {
    GuestName: "Ali Khaled ElSa3dany",
    MeetingTopic: "Eating",
    MeetingDate: "10-2-99",
    MeetingAddress: "bolq abo el 3ela",
    MeetingTime: "12:00 PM",
    MeetingStatus: "Not Done",
    Area: "inside",
    Comments: "3mk",
  };
  // aaaa
  return (
    <>
      <div className="modal fade" id="meetingModal">
        <div
          className="modal-dialog col-md-7 modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="inner-modal shadow rounded-4 p-4">
              <div
                className="icon d-flex justify-content-end"
                data-bs-dismiss="modal"
              >
                <i className="shadow fa-solid fa-xmark"></i>
              </div>
              <div className="meeting-topic m-3">
                <h2 className="BlackToWhite">Meeting Details</h2>
              </div>
              <div className="container meeting-container">
                <div className="row g-md-5">
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
    </>
  );
}
