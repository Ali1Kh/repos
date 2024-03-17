import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import { useQuery } from "react-query";
import { TailSpin } from "react-loader-spinner";
import "./DashboardMeetings.css"
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";


export default function DashboardMeetings() {

  const token = localStorage.getItem("token")
  const [data, setData] = useState([]);

  async function getAllMeetings() {
    try {
      const response = await axios.get(
        "https://meetingss.onrender.com/dashboard/getAllMeetings",
        {
          headers: {
            token: token,
          },
        }
      );
      setData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const { isLoading } = useQuery("getAllMeetings", getAllMeetings);

  const [t] = useTranslation();

  return <>
    <div className="main">
      <div className="container mt-5">
        <h1 className="container d-flex flex-column align-items-center justify-content-center p-4 fw-bold ">
          {t("Dashborad.Meetings.MeetingsName")}
        </h1>
        <div className="row gy-3 p-5 pt-0">
          {isLoading ?
            (
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
                <div>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 500 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" className="fw-bold text-white">{t("Dashborad.Meetings.person")}</TableCell>
                            <TableCell align="center" className="fw-bold text-white">{t("Dashborad.Meetings.Topic")}</TableCell>
                            <TableCell align="center" className="fw-bold text-white">{t("Dashborad.Meetings.Address")}</TableCell>
                            <TableCell align="center" className="fw-bold text-white">{t("Dashborad.Meetings.MeetingPlace")}</TableCell>
                            <TableCell align="center" className="fw-bold text-white">{t("Dashborad.Meetings.status")}</TableCell>
                            <TableCell align="center" className="fw-bold text-white">{t("Dashborad.Meetings.time")}</TableCell>
                            <TableCell align="center" className="fw-bold text-white">{t("Dashborad.Meetings.date")}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data
                            ? data.meetings?.map((meeting, idx) => (
                              <TableRow hover tabIndex={-1} key={idx}>
                                <TableCell align="center" component="th">{meeting.person}</TableCell>
                                <TableCell align="center" component="th">{meeting.about}</TableCell>
                                <TableCell align="center" component="th">{meeting.address}</TableCell>
                                <TableCell align="center" component="th">{meeting.in_or_out}</TableCell>
                                <TableCell align="center" component="th">{meeting.statues}</TableCell>
                                <TableCell align="center" component="th">{meeting.time}</TableCell>
                                <TableCell align="center" component="th">{meeting.date}</TableCell>
                              </TableRow>
                            )) : ""}
                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Paper>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  </>
}


