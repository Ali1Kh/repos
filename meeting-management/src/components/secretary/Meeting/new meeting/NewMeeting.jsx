import React from "react";
import "./newMeeting.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
const newTheme = (theme) =>
  createTheme({
    palette: {
      mode: "dark",
    },
  });
export default function NewMeeting() {
  return (
    <div className="main">
      <div className="container d-flex flex-column align-items-center justify-content-center p-4">
        <h2 className="mt-4 mb-5" style={{ userSelect: "none" }}>
          Create Meeting
        </h2>
        <div className="inputsContainer  w-100  p-md-4 mb-0 pb-0 d-flex flex-column justify-content-center align-items gap-1">
          <div className="calenderPicker row p-0 m-0">
            <div className="col-md-6  inputItem mb-3 px-5">
              <ThemeProvider theme={newTheme}>
                <DesktopDatePicker format="LL" />
              </ThemeProvider>
            </div>
            <div className="col-md-6  inputItem timePicker mb-3 px-5 ">
              <ThemeProvider theme={newTheme}>
                {/* <MobileTimePicker /> */}
                <TimePicker
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
              </ThemeProvider>
            </div>
          </div>

          <div className="inputItem mb-3 px-5 ">
            <input
              type="text"
              className="form-control py-3"
              id="meetPerson"
              placeholder="Person or Entity"
            />
          </div>
          <div className="inputItem mb-3 px-5">
            <input
              type="text"
              className="form-control py-3"
              id="meetTopic"
              placeholder="Meeting Topic"
            />
          </div>
          <div className="inputItem mb-3 px-5">
            <input
              type="text"
              className="form-control py-3"
              id="meetAddress"
              placeholder="Meeting Address"
            />
          </div>
          <div className="inputItem mb-3 px-5">
            <textarea
              class="form-control py-3"
              id="meetNotes"
              rows="4"
              style={{ maxHeight: "150px" }}
              placeholder="Meeting Notes"
            ></textarea>
          </div>
          <div className="radios inputItem mb-3 px-5 d-flex gap-3 align-items-center">
            <div class="radio-buttons-container ">
              <div class="radio-button d-flex align-items-center">
                <input
                  name="radio-group"
                  id="radio2"
                  class="radio-button__input"
                  type="radio"
                />
                <label for="radio2" class="radio-button__label">
                  <span class="radio-button__custom"></span>
                  Inside Company
                </label>
              </div>
              <div class="radio-button d-flex align-items-center">
                <input
                  name="radio-group"
                  id="radio1"
                  class="radio-button__input"
                  type="radio"
                />
                <label for="radio1" class="radio-button__label">
                  <span class="radio-button__custom"></span>
                  Outside Company
                </label>
              </div>
            </div>
          </div>
        </div>
        <button class="addButton">Add Meeting</button>
      </div>
    </div>
  );
}
