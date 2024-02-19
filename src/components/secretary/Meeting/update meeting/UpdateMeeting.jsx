import React, { useEffect, useState } from "react";
import "./updateMeeting.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import $ from "jquery";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function UpdateMeeting() {
  const newTheme = (theme) =>
    createTheme({
      palette: {
        mode: "dark",
      },
    });

  let [date, setDate] = useState(null);
  let [time, setTime] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    $("#meetNotes").val(id);
  }, []);

  function updateMeeting() {

    

    let person = $("#meetPerson").val();
    let topic = $("#meetTopic").val();
    let address = $("#meetAddress").val();
    let notes = $("#meetNotes").val();
    let area = $('input[name="radio-group"]:checked').val();

    if (
      !date ||
      !time ||
      person == "" ||
      topic == "" ||
      address == "" ||
      notes == "" ||
      area == ""
    ) {
      $(".error").removeClass("d-none");
      $(".error").addClass("d-block");
      return;
    }
    let dateInput, timeInput;
    if (date) {
      dateInput = new Date(date.$d).toLocaleString("en-GB");
    }
    if (time) {
      timeInput = new Date(time.$d).toLocaleString("en-GB", {
        hour12: false,
      });
    }

    let data = {
      date: dateInput.split(",")[0],
      time: timeInput.split(",")[1],
      person,
      topic,
      address,
      notes,
      area,
    };
  }

  const [t, il8n] = useTranslation();

  return (
    <div className="main">
      <div className="container d-flex flex-column align-items-center justify-content-center p-xxl-4">
        <h2 className="mt-4 mb-xxl-5 mb-3" style={{ userSelect: "none" }}>
          {t("CreateOrUpdateMeeting.updateMeeting")}
        </h2>

        <div className="inputsContainer w-100  p-md-4 mb-0 pb-0 d-flex flex-column justify-content-center align-items gap-1">
          <div className="calenderPicker row p-0 m-0">
            <div className="col-md-6  inputItem mb-3 px-5">
              <ThemeProvider theme={newTheme}>
                <DesktopDatePicker
                  format="LL"
                  onChange={(val) => setDate(val)}
                />
              </ThemeProvider>
            </div>
            <div className="col-md-6  inputItem timePicker mb-3 px-5 ">
              <ThemeProvider theme={newTheme}>
                <TimePicker
                  onChange={(val) => setTime(val)}
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
              className="form-control py-2 rounded-3"
              id="meetPerson"
              placeholder={t("CreateOrUpdateMeeting.person")}
            />
          </div>
          <div className="inputItem mb-3 px-5">
            <input
              type="text"
              className="form-control py-2 rounded-3"
              id="meetTopic"
              placeholder={t("CreateOrUpdateMeeting.topic")}
            />
          </div>
          <div className="inputItem mb-3 px-5">
            <input
              type="text"
              className="form-control py-2 rounded-3"
              id="meetAddress"
              placeholder={t("CreateOrUpdateMeeting.address")}
            />
          </div>
          <div className="inputItem mb-3 px-5">
            <textarea
              className="form-control py-2 rounded-3"
              id="meetNotes"
              rows="4"
              style={{ maxHeight: "150px" }}
              placeholder={t("CreateOrUpdateMeeting.notes")}
            ></textarea>
          </div>
          <div className="radios inputItem mb-3 px-5 d-flex gap-3 align-items-center">
            <div className="radio-buttons-container ">
              <div className="radio-button d-flex align-items-center">
                <input
                  name="radio-group"
                  id="radio2"
                  className="radio-button__input"
                  type="radio"
                  value={"inside"}
                />
                <label htmlFor="radio2" className="radio-button__label">
                  <span className="radio-button__custom"></span>
                  {t("CreateOrUpdateMeeting.inside")}
                </label>
              </div>
              <div className="radio-button d-flex align-items-center">
                <input
                  name="radio-group"
                  id="radio1"
                  className="radio-button__input"
                  type="radio"
                  value={"outside"}
                />
                <label htmlFor="radio1" className="radio-button__label">
                  <span className="radio-button__custom"></span>
                  {t("CreateOrUpdateMeeting.outside")}
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column w-100 justify-content-center align-items-center ">
            <small style={{ color: "red" }} className="error d-none mb-3">
              All Inputs Are Required!
            </small>
            <button onClick={updateMeeting} className="addButton">
              {t("CreateOrUpdateMeeting.buttonUpdate")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
