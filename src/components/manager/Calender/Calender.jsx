import React, { useEffect, useState } from "react";
import "./calender.css";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import MeetingDetails from "../meetingDetails/meetingDetails.jsx";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Calender() {
  const [highlightedDays, setHighlightedDays] = useState([]);
  const newTheme = (theme) =>
    createTheme({
      ...theme,
      components: {
        MuiDateCalendar: {
          styleOverrides: {
            root: {
              color: "#343A46",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#343A46",
              border: "0px solid",
              backgroundColor: "#99A1B3",
              minHeight: 350,
              width: "100%",
              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15);",
            },
          },
        },
      },
    });
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = new Date();
  let [date, setDate] = useState({
    $D: today.getDate(),
    $M: today.getMonth(),
    $y: today.getFullYear(),
  });
  let [day, setDay] = useState(weekday[new Date().getDay()]);

  function getLastDay(y, m) {
    return new Date(y, m, 0).getDate();
  }
  function monthChanged(month, year) {
    getMeetingsDays(
      `${year}-${month}-01`,
      `${year}-${month}-${getLastDay(year, month)}`
    );
  }
  const [t] = useTranslation();

  let [dayMeetings, setDayMeetings] = useState([]);

  async function dateChanged(val) {
    let vDate = val;

    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("Authentication token not found in Local Storage");
      return;
    }

    let { data } = await axios.get(
      `https://meetingss.onrender.com/meetings/?date[eq]=${
        new Date(`${vDate.$y}-${vDate.$M + 1}-${vDate.$D + 1}`)
          .toISOString()
          .split("T")[0]
      }`,
      {
        headers: {
          token: authToken,
        },
      }
    );

    if (data.success) {
      setDayMeetings(data.meetings);
    }
  }

  async function getMeetingsDays(startDate, endDate) {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("Authentication token not found in Local Storage");
      return;
    }

    let { data } = await axios.get(
      `https://meetingss.onrender.com/meetings?date[gte]=${startDate}&date[lte]=${endDate}`,
      {
        headers: {
          token: authToken,
        },
      }
    );
    if (data.success) {
      setHighlightedDays(
        data.meetings?.map((meeting) => new Date(meeting.date).getDate())
      );
    }
  }

  useEffect(() => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    getMeetingsDays(
      `${year}-${month}-01`,
      `${year}-${month}-${getLastDay(year, month)}`
    );
  }, []);

  return (
    <div className="main  px-md-2">
      <div className="container p-5 d-flex flex-column justify-content-center align-items-center ">
        <h2 className="mb-5 animate__animated animate__zoomIn BlackToWhite">
          {t("Calendar.calendar")}
        </h2>
        <div className="calenderCard shadow rounded-4 p-sm-4">
          <div className="row my-3 gy-3">
            <div className="col-lg-6 p-4 h-100">
              <ThemeProvider theme={newTheme}>
                <DateCalendar
                  showDaysOutsideCurrentMonth
                  fixedWeekNumber={6}
                  onChange={(val) => {
                    setDate(val);
                    setDay(weekday[new Date(val).getDay()]);
                    dateChanged(val);
                  }}
                  onMonthChange={(val) => monthChanged(val.$M + 1, val.$y)}
                  slots={{
                    day: ServerDay,
                  }}
                  slotProps={{
                    day: {
                      highlightedDays,
                    },
                  }}
                />
              </ThemeProvider>
            </div>
            <div className="col-lg-6 h-100">
              <div className="dayMeetings p-4">
                <div
                  style={{ color: "var(--mutedColor)" }}
                  className="todayDate  d-flex justify-content-between mb-3"
                >
                  <span className="BlackToWhite">{day}</span>
                  <span className="BlackToWhite">
                    {date.$D}/{date.$M + 1}/{date.$y}
                  </span>
                </div>
                <div
                  className="dayMeetingsCards  BlackToWhite overflow-y-scroll"
                  style={{ maxHeight: "320px" }}
                >
                  {dayMeetings.length > 0 ? (
                    dayMeetings.map((meet) => (
                      <div className="meetingItem border-bottom py-3">
                        <p>
                          {t("Calendar.meetingTopic")} : {meet.about}
                        </p>
                        <p>
                          {t("Calendar.meetingTime")} :{" "}
                          {convertTo12HourFormat(meet.time)}
                        </p>
                        <a
                          data-bs-toggle="modal"
                          data-bs-target={`#meetingModal${meet.meeting_id}`}
                          className="mb-3 cursorPointer"
                        >
                          {t("Calendar.showDetails")}
                        </a>
                        <div className="details position-absolute">
                          <MeetingDetails meetingsDetails={meet} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="mt-5 d-flex flex-column justify-content-center align-items-center gap-3">
                      <div style={{ width: "80px" }} className="noDateImg">
                        <img
                          className="w-100"
                          src={require("../../../image/nodate.png")}
                          alt=""
                        />
                      </div>

                      <h4>No Meetings In This Day</h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <MeetingDetails /> */}
          </div>
        </div>
      </div>
      <Helmet>
        <title>Calendar</title>
      </Helmet>
    </div>
  );
}

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🕑" : undefined}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":");
  let formattedHours = parseInt(hours, 10);
  let amPmIndicator = "AM";
  if (formattedHours >= 12) {
    formattedHours =
      formattedHours === 12 ? formattedHours : formattedHours - 12;
    amPmIndicator = "PM";
  }
  formattedHours = formattedHours < 10 ? "0" + formattedHours : formattedHours;
  const formattedTime = `${formattedHours}:${minutes} ${amPmIndicator}`;
  return formattedTime;
}
