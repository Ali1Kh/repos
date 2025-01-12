import React, { useState } from "react";
import "./ManagerAcceptance.css";
import toast from "react-hot-toast";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Acceptance = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const getNotAcceptedManagers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIHOST}/dashboard/getNotAcceptedManagers`,
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
  };

  const AcceptManager = async (manager_id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIHOST}/dashboard/acceptManagerAcc/${manager_id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        toast.success("Accepted");
        getNotAcceptedManagers();
      }
      else {
        toast.error("Something went Wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { isLoading } = useQuery("getNotAcceptedManagers", getNotAcceptedManagers);

  // async function acceptAccount(id) {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_APIHOST}/dashboard/acceptAcc/${id}`,
  //       {},
  //       {
  //         headers: {
  //           token: token,
  //         },
  //       }
  //     );
  //     if (response.data.success) {
  //       toast.success("Accepted");
  //       getNotAcceptedAccounts();
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  const rejectManagerAccount = async (manager_id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIHOST}/dashboard/rejectManagerAcc/${manager_id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        toast.success("Removed");
        getNotAcceptedManagers();
      } else {
        toast.error("Something went Wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [t] = useTranslation();

  return (
    <>
      <div className="main">
        <div className="container mt-5">
          <h1 className="container d-flex flex-column align-items-center justify-content-center p-4 fw-bold">
            {t("Dashborad.Acceptacne.AcceptacneManager")}
          </h1>
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
              {data ? (
                data.maangers?.length > 0 ? (
                  data.maangers?.map((manager, idx) => (
                    <div>
                      <Paper sx={{ width: "100%", overflow: "hidden" }}>
                        <TableContainer sx={{ maxHeight: 500 }}>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center" className="fw-bold">
                                  {t("Dashborad.Acceptacne.userName")}
                                </TableCell>
                                <TableCell align="center" className="fw-bold">
                                  {t("Dashborad.Acceptacne.name")}
                                </TableCell>
                                <TableCell align="center" className="fw-bold">
                                  {t("Dashborad.Acceptacne.E_mail")}
                                </TableCell>
                                <TableCell align="right" className="fw-bold">
                                  {t("Dashborad.Acceptacne.reject")}
                                </TableCell>
                                <TableCell align="center" className="fw-bold">
                                  {t("Dashborad.Acceptacne.accept")}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow hover tabIndex={-1} key={idx}>
                                <TableCell
                                  align="center"
                                  component="th"
                                  scope="row"
                                >
                                  {manager.UserName}
                                </TableCell>
                                <TableCell align="center" component="th">
                                  {manager.first_name +
                                    " " +
                                    manager.last_name}
                                </TableCell>
                                <TableCell align="center" component="th">
                                  {manager.E_mail}
                                </TableCell>
                                <TableCell align="right" component="th">
                                  <i
                                    className="fa-solid fa-trash deletAcc"
                                    onClick={() => {
                                      rejectManagerAccount(manager.manager_id);
                                    }}
                                  ></i>
                                </TableCell>
                                <TableCell align="center" component="th">
                                  <button
                                    className="btn accept-button"
                                    onClick={() => {
                                      AcceptManager(manager.manager_id);
                                    }}
                                  >
                                    {t("Dashborad.Acceptacne.accept")}
                                  </button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>
                  ))
                ) : (
                  <div
                    className="d-flex flex-column justify-content-center align-items-center text-center"
                    style={{ height: "50vh" }}
                  >
                    <img src={require("../../../image/no-data.png")} alt="" />
                    <h4 className="mt-5">No Accounts Wants To Be Accepted</h4>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Acceptance;
