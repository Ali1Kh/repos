import React, { useEffect, useState } from "react";
import "./updateMeeting.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import $ from "jquery";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import toast from "react-hot-toast";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDropzone } from "react-dropzone";
export default function UpdateMeeting() {
  const newTheme = (theme) =>
    createTheme({
      palette: {
        mode: "dark",
      },
    });

  let [date, setDate] = useState();
  let [time, setTime] = useState(null);

  const { id } = useParams();

  let [managers, setManagers] = useState([]);
  let [allmanagers, setAllManagers] = useState([]);
  async function getSecManagers() {
    let { data } = await axios.get(
      "https://meetingss.onrender.com/secretary/getSecManagers",
      { headers: { token: localStorage.getItem("token") } }
    );
    setManagers(data.managers);
  }

  async function getAllManagers() {
    let { data } = await axios.get(
      "https://meetingss.onrender.com/secretary/getAllManagers",
      { headers: { token: localStorage.getItem("token") } }
    );
    setAllManagers(data.managers);
  }
  useEffect(() => {
    getSecManagers();
    getAllManagers();
    getMeetingDetails();
  }, []);

  const [buttonPressed, setButtonPressed] = useState("Inside");

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  async function createFileObject(url, fileName) {
    try {
      const response = await fetch(url);
      const fileContent = await response.blob();

      // Create a new File object
      const newFile = new File([fileContent], fileName, {
        type: response.headers.get("content-type"),
      });

      return newFile;
    } catch (error) {
      console.error("Error creating File object:", error);
      throw error;
    }
  }

  async function getMeetingDetails() {
    try {
      let { data } = await axios.get(
        `https://meetingss.onrender.com/secretary/getSecMeetings/${id}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        $("#meetPerson").val(data.meetings.person);
        $("#meetTopic").val(data.meetings.about);
        $("#meetAddress").val(data.meetings.address);
        $("#meetNotes").val(data.meetings.notes);
        $('input[name="radio-group"]')
          .filter('[value="' + data.meetings.in_or_out + '"]')
          .prop("checked", true);

        if (data.meetings.attachmentLink) {
          setUploadedFiles([
            await createFileObject(
              data.meetings.attachmentLink,
              data.meetings.attachmentName
            ),
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateMeeting() {
    let person = $("#meetPerson").val();
    let topic = $("#meetTopic").val();
    let address = $("#meetAddress").val();
    let notes = $("#meetNotes").val();
    let area = $('input[name="radio-group"]:checked').val();
    if (area === "Outside") {
      if (person === "") {
        $(".error").removeClass("d-none");
        $(".error").addClass("d-block");
        return;
      }
    } else {
      if (insidePersons.length <= 0) {
        $(".error").removeClass("d-none");
        $(".error").addClass("d-block");
        return;
      }
    }
    if (
      !date ||
      !time ||
      topic === "" ||
      address === "" ||
      notes === "" ||
      !area 
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

    
    if (area !== "Inside") {
      delete initData.insidePersons;
    }


    const flattenObject = (obj, parentKey = "") => {
      return Object.keys(obj).reduce((acc, key) => {
        const currentKey = parentKey ? `${parentKey}[${key}]` : key;
        if (typeof obj[key] === "object" && obj[key] !== null) {
          return { ...acc, ...flattenObject(obj[key], currentKey) };
        } else {
          return { ...acc, [currentKey]: obj[key] };
        }
      }, {});
    };

    const flattenedData = flattenObject(initData);
    const formData = new FormData();
    for (const [key, value] of Object.entries(flattenedData)) {
      formData.append(key, value);
    }

   if (uploadedFiles[0]) {
      formData.append("attachment", uploadedFiles[0]);
    }
    
    try {
      let { data } = await axios.post(
        `https://meetingss.onrender.com/secretary/updateMeeting/${id}`,
        formData,
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        toast.success(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const [t] = useTranslation();

  let [insidePersons, setInsidePersons] = useState([]);
  const handleManagerChange = (event, value) => {
    setInsidePersons(
      value
        .filter((item) => typeof item === "object")
        .map((manager) => manager.manager_id)
    );
  };

  return (
    <div className="main">
      <div className="container d-flex flex-column align-items-center justify-content-center p-xxl-4">
        <h2 className="mt-4 mb-xxl-5 mb-3" style={{ userSelect: "none" }}>
          {t("CreateOrUpdateMeeting.updateMeeting")}
        </h2>

        <div className="inputsContainer p-md-4 mb-0 pb-0 d-flex flex-column justify-content-center align-items gap-1">
          <div className="calenderPicker row p-0 m-0">
            <div className="col-md-6  inputItem mb-3 px-5">
              <ThemeProvider theme={newTheme}>
                <DesktopDatePicker
                  format="LL"
                  onChange={(val) => setDate(val)}
                  disablePast
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
            {buttonPressed === "Inside" ? (
              <div className="inputItem mb-3 px-5">
                <Autocomplete
                  multiple
                  id="tags-filled"
                  onChange={handleManagerChange}
                  options={allmanagers}
                  getOptionLabel={(option) =>
                    option.first_name + " " + option.last_name
                  }
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={option.manager_id}
                        variant="outlined"
                        className="bg-info"
                        label={
                          typeof option === "string"
                            ? option
                            : option.first_name + " " + option.last_name
                        }
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={t("CreateOrUpdateMeeting.person")}
                      className="tagify"
                      sx={{
                        backgroundColor: "var(--cardBgColor) !important",
                        padding: "8px",
                        color: "var(--BlackToWhite)",
                        border: "2px solid var(--sec-color)",
                        borderRadius: "8px",
                      }}
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
          <div className="inputItem  mb-3 px-5 ">
            <div className="upload-container">
              <div
                {...getRootProps()}
                style={{ borderStyle: "dashed" }}
                className={`dropzone h-100 ${
                  isDragActive ? "active h-100" : ""
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the file here</p>
                ) : (
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <img
                      width={"60px"}
                      height={"60px"}
                      src={require("../../../../image/cloud-upload-regular-240.png")}
                      alt=""
                      srcset=""
                    />
                    <p className="p-2 text-center">
                      Drag and drop file here or click to browse
                    </p>
                  </div>
                )}
              </div>
              <div className="file-list mt-3">
                {uploadedFiles.length > 0 ? (
                  <div className="d-flex flex-row flex-wrap gap-3">
                    {uploadedFiles.map((file, index) => (
                      <div
                        className="cursorPointer w-fit p-3 py-2 rounded-3 position-relative"
                        key={index}
                        style={{
                          border: "1px solid var(--cardHeadingColor)",
                        }}
                      >
                        <i className="fa-solid fa-file-pdf"></i>{" "}
                        <span>{file.name}</span>
                        <div
                          onClick={(e) => {
                            setUploadedFiles(
                              uploadedFiles.filter(
                                (fileItem) => fileItem.path !== file.path
                              )
                            );
                          }}
                          className="deleteFile cursorPointer position-absolute"
                          style={{ top: "-10px", right: "-10px" }}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No file uploaded</p>
                )}
              </div>
            </div>
          </div>
          <div className="d-md-flex justify-content-end">
            <div className="radios inputItem mb-3 px-5 d-flex gap-md-2 align-items-center">
              <div className="radio-buttons-container d-flex flex-md-row flex-column align-items-start">
                <div className="radio-button d-flex align-items-center">
                  <input
                    name="radio-group"
                    id="radio2"
                    className="radio-button__input"
                    type="radio"
                    value={"Inside"}
                    onClick={() => {
                      setButtonPressed("Inside");
                    }}
                  />
                  <label
                    htmlFor="radio2"
                    className="radio-button__label BlackToWhite"
                  >
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
                      setButtonPressed("Outside");
                    }}
                  />
                  <label
                    htmlFor="radio1"
                    className="radio-button__label BlackToWhite"
                  >
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
            <button onClick={updateMeeting} className="addButton">
              {t("CreateOrUpdateMeeting.buttonUpdate")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
