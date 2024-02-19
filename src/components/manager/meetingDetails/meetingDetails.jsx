import "./meetingDetails.css";
import { useTranslation } from "react-i18next";
export default function MeetingDetails({ meetingsDetails }) {
  const [t] = useTranslation();

  return (
    <div>
      <div
        className="modal fade"
        id={`meetingModal${meetingsDetails.meeting_id}`}
      >
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
                      <h5 className="mb-3">{meetingsDetails.person}</h5>
                      <span className="fw-normal">Meeting Topic</span>
                      <h5 className="mb-3">{meetingsDetails.about}</h5>
                      <span>Meeting Date</span>
                      <h5 className="mb-3">{meetingsDetails.date}</h5>
                      <span>Meeting Time</span>
                      <h5 className="mb-3">{meetingsDetails.time}</h5>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-ineer">
                      <span>Meeting Address</span>
                      <h5 className="mb-3">{meetingsDetails.address}</h5>
                      <span>Inside Or Out side The Facility</span>
                      <h5 className="mb-3">{meetingsDetails.in_or_out}</h5>
                      <span>Meeting Status</span>
                      <h5 className="mb-3">{meetingsDetails.statues}</h5>
                      <span>Comments</span>
                      <h5 className="mb-3">{meetingsDetails.notes}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
