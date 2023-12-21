import React from "react";
import "./newMeeting.css";
export default function NewMeeting() {
  return (
    <div className="main">
      <div className="container d-flex flex-column align-items-center justify-content-center p-4">
        <h2 className="mb-3">Create Meeting</h2>
        <div className="inputsContainer">
          <div class="inputItem mb-3">
            <input
              type="text"
              class="form-control"
              id="meetDate"
              placeholder="Meeting Date"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
