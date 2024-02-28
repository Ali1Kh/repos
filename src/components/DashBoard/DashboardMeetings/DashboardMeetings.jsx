import React, { useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import { useQuery } from "react-query";
import { TailSpin } from "react-loader-spinner";
import "./DashboardMeetings.css"
import { useTranslation } from "react-i18next";


export default function DashboardMeetings() {

  const token = localStorage.getItem("token")

  const { data, isLoading } = useQuery("getDashBoardSecertar", getDashBoardSecertar);

  function getDashBoardSecertar() {
    return axios.get("https://meetingss.onrender.com/dashboard/getAllMeetings", {
      headers: {
        token: token
      }

    })
  }

  console.log(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [t] = useTranslation();

  return <>
    <div className="main">
      <div className="container mt-5">
        <h1 className="container d-flex flex-column align-items-center justify-content-center p-4 fw-bold text-white">
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
                            <TableCell align="center">{t("Dashborad.Meetings.person")}</TableCell>
                            <TableCell align="center">{t("Dashborad.Meetings.Topic")}</TableCell>
                            <TableCell align="center">{t("Dashborad.Meetings.Address")}</TableCell>
                            <TableCell align="center">{t("Dashborad.Meetings.MeetingPlace")}</TableCell>
                            <TableCell align="center">{t("Dashborad.Meetings.status")}</TableCell>
                            <TableCell align="center">{t("Dashborad.Meetings.time")}</TableCell>
                            <TableCell align="center">{t("Dashborad.Meetings.date")}</TableCell>
                            <TableCell align="center">{t("Dashborad.Meetings.Delete")}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data
                            ? data.data.meetings?.map((meeting, idx) => (
                              <TableRow hover tabIndex={-1} key={idx}>
                                <TableCell align="center" component="th">{meeting.person}</TableCell>
                                <TableCell align="center" component="th">{meeting.about}</TableCell>
                                <TableCell align="center" component="th">{meeting.address}</TableCell>
                                <TableCell align="center" component="th">{meeting.in_or_out}</TableCell>
                                <TableCell align="center" component="th">{meeting.statues}</TableCell>
                                <TableCell align="center" component="th">{meeting.time}</TableCell>
                                <TableCell align="center" component="th">{meeting.date}</TableCell>
                                <TableCell align="center" component="th">
                                  <button align="center" className='btn btn-danger'>
                                    {t("Dashborad.Meetings.Delete")}
                                  </button>
                                </TableCell>
                              </TableRow>
                            )) : ""}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[ 10, 25, 100]}
                      component="div"
                      count={data?.data.meetings?.length || 0}

                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  </>
}


