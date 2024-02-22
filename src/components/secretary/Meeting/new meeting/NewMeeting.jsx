import React, { useState } from "react";
import "./newMeeting.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import $ from "jquery";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const newTheme = (theme) =>
  createTheme({
    palette: {
      mode: "dark",
    },
  });
export default function NewMeeting() {
  let [date, setDate] = useState(null);
  let [time, setTime] = useState(null);

  let [managers, setManagers] = useState([]);

  async function addMeeting() {
    let person = $("#meetPerson").val();
    let topic = $("#meetTopic").val();
    let address = $("#meetAddress").val();
    let notes = $("#meetNotes").val();
    let managerSelected = $("#managerSelected").val();
    let area = $('input[name="radio-group"]:checked').val();

    if (
      !date ||
      !time ||
      person == "" ||
      topic == "" ||
      address == "" ||
      notes == "" ||
      area == "" ||
      managerSelected == ""
    ) {
      $(".error").removeClass("d-none");
      $(".error").addClass("d-block");
      return;
    }
    let dateInput, timeInput;
    if (date) {
      dateInput = new Date(date.$d).toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
    if (time) {
      timeInput = new Date(time.$d).toLocaleString("en-GB", {
        hour12: false,
      });
    }

    let initData = {
      date: dateInput.split(",")[0].split("/").reverse().join("-"),
      time: timeInput.split(",")[1].split(" ")[1],
      person,
      about: topic,
      address,
      notes,
      in_or_out: area,
    };

    try {
      let { data } = await axios.post(
        `https://meetingss.onrender.com/secretary/createMeeting/${managerSelected}`,
        initData,
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getSecManagers() {
    let { data } = await axios.get(
      "https://meetingss.onrender.com/secretary/getSecManagers",
      { headers: { token: localStorage.getItem("token") } }
    );
    setManagers(data.managers);
  }

  useEffect(() => {
    getSecManagers();
  }, []);

  const [buttonPressed, setButtonPressed] = useState('Inside');

  const [t, il8n] = useTranslation();

  return (
    <div className="main">
      <div className="container p-4 d-flex flex-column align-items-center justify-content-center p-xxl-4">
        <h2
          className="mt-4 mb-xxl-5 mb-3 BlackToWhite"
          style={{ userSelect: "none" }}
        >
          {t("CreateOrUpdateMeeting.createMeeting")}
        </h2>

        <div className="inputsContainer  w-100  p-md-4 mb-0 pb-0 d-flex flex-column justify-content-center align-items gap-1">
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
          <div>
            {buttonPressed === 'Inside' ? (
              <div className="inputItem mb-3 px-5">
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={managersData.map((option) => option.names)}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={t("CreateOrUpdateMeeting.person")}
                      className="tagify "
                      sx={{ backgroundColor: 'var(--cardBgColor)', padding: '8px', color: 'var(--BlackToWhite)', border: '2px solid var(--sec-color)', borderRadius: '8px' }}
                    />
                  )}
                />
              </div>
            ) : (
              <div className="inputItem mb-3 px-5 ">
                <input
                  type="text"
                  className="form-control py-2"
                  id="meetPerson"
                  placeholder={t("CreateOrUpdateMeeting.person")}
                />
              </div>
            )}
          </div>

          <div className="inputItem mb-3 px-5">
            <input
              type="text"
              className="form-control py-2"
              id="meetTopic"
              placeholder={t("CreateOrUpdateMeeting.topic")}
            />
          </div>
          <div className="inputItem mb-3 px-5">
            <input
              type="text"
              className="form-control py-2"
              id="meetAddress"
              placeholder={t("CreateOrUpdateMeeting.address")}
            />
          </div>
          <div className="inputItem mb-3 px-5">
            <textarea
              className="form-control py-2"
              id="meetNotes"
              rows="4"
              style={{ maxHeight: "150px" }}
              placeholder={t("CreateOrUpdateMeeting.notes")}
            ></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <div className="inputItem mb-3 px-5">
              <select id="managerSelected" className="py-2 w-auto px-2">
                <option value="">Choose Manager</option>
                {managers?.map((manager) => (
                  <>
                    <option value={manager.manager_id}>
                      {manager.first_name} {manager.last_name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="radios inputItem mb-3 px-5 d-flex gap-3 align-items-center">
              <div className="radio-buttons-container ">
                <div className="radio-button d-flex align-items-center">
                  <input
                    name="radio-group"
                    id="radio2"
                    className="radio-button__input"
                    type="radio"
                    value={"Inside"}
                    onClick={() => {
                      setButtonPressed('Inside');
                    }}
                  />
                  <label htmlFor="radio2" className="radio-button__label BlackToWhite">
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
                    value={"Outside"}
                    onClick={() => {
                      setButtonPressed('Outside');
                    }}
                  />
                  <label htmlFor="radio1" className="radio-button__label BlackToWhite">
                    <span className="radio-button__custom"></span>
                    {t("CreateOrUpdateMeeting.outside")}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column w-100 justify-content-center align-items-center ">
            <small style={{ color: "red" }} className="error d-none mb-3">
              All Inputs Are Required!
            </small>

            <button onClick={addMeeting} className="addButton">
              {t("CreateOrUpdateMeeting.buttonAdd")}
            </button>
          </div>
        </div>
      </div>

      <Helmet>
        <title>Add Meeting</title>
      </Helmet>
    </div>
  );
}

const managersData = [
  { names: 'mustafa', id: 1 },
];
