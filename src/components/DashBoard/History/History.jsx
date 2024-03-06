import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useQuery } from "react-query";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

export default function History() {
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);

  const { isLoading } = useQuery("getHistory", getHistory);

  async function getHistory() {
    const { data } = await axios.get(
      "https://meetingss.onrender.com/dashboard/getLoginHistory",
      {
        headers: {
          token: token,
        },
      }
    );
    if (data.success) {
      console.log(data.history[0]);
      setData(data);
    }
  }

  const [t] = useTranslation();

  return (
    <>
      <div className="main">
        <div className="container mt-5">
          <h1 className="container d-flex flex-column align-items-center justify-content-center p-4 fw-bold">
            {t("Dashborad.history.historyName")}
          </h1>
          <div className="row gy-3 p-5 pt-0">
            {isLoading ? (
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
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 500 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" className="fw-bold text-white">
                              {t("Dashborad.history.role")}
                            </TableCell>
                            <TableCell align="center" className="fw-bold text-white">
                              {t("Dashborad.history.userName")}
                            </TableCell>
                            <TableCell align="center" className="fw-bold text-white">
                              {t("Dashborad.history.name")}
                            </TableCell>
                            <TableCell align="center" className="fw-bold text-white">
                              {t("Dashborad.history.email")}
                            </TableCell>
                            <TableCell align="center" className="fw-bold text-white">
                              {t("Dashborad.history.createdAtdate")}
                            </TableCell>
                            <TableCell align="center" className="fw-bold text-white">
                              {t("Dashborad.history.createdAttime")}
                            </TableCell>
                            <TableCell align="center" className="fw-bold text-white">
                              {t("Dashborad.history.agent")}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data
                            ? data?.history?.map((histor, idx) => (
                              (histor.Secretary === null && histor.Manager !== null ?
                                <TableRow hover tabIndex={-1} key={idx}>
                                  <TableCell align="center" component="th" scope="row">{histor.role}</TableCell>
                                  <TableCell align="center" component="th">{histor.Manager?.UserName}</TableCell>
                                  <TableCell align="center" component="th">{histor.Manager?.first_name + " " + histor.Manager?.last_name}</TableCell>
                                  <TableCell align="center" component="th">{histor.Manager?.E_mail}</TableCell>
                                  <TableCell align="center" component="th">{histor.createdAt.slice(0, 10)}</TableCell>
                                  <TableCell align="center" component="th">{histor.createdAt.slice(11, 19)}</TableCell>
                                  <TableCell align="center" component="th">{histor.agent.slice(0, 12)}</TableCell>
                                </TableRow>
                                : histor.Manager === null && histor.Secretary !== null ?
                                  <TableRow hover tabIndex={-1} key={idx}>
                                    <TableCell align="center" component="th" scope="row">{histor.role}</TableCell>
                                    <TableCell align="center" component="th">{histor.Secretary?.UserName}</TableCell>
                                    <TableCell align="center" component="th">{histor.Secretary?.first_name + " " + histor.Secretary?.last_name}</TableCell>
                                    <TableCell align="center" component="th">{histor.Secretary?.E_mail}</TableCell>
                                    <TableCell align="center" component="th">{histor.createdAt.slice(0, 10)}</TableCell>
                                    <TableCell align="center" component="th">{histor.createdAt.slice(11, 19)}</TableCell>
                                    <TableCell align="center" component="th">{histor.agent.slice(0, 12)}</TableCell>
                                  </TableRow>
                                  : ""
                              )
                            ))
                            : ""}
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
  );
}
