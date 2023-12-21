import React from "react";
import "./newMeeting.css";
export default function NewMeeting() {
  return (
    <div className="main">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
    </div>
  );
}
