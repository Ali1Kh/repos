import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { TailSpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function AcceptSecretaryForManager() {

    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);

    const getNotAcceptesSecToManager = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_APIHOST}/dashboard/getNotAcceptesSecToManager`,
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

    const AcceptSecForManager = async (secretary_id) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_APIHOST}/dashboard/acceptSecToManager/${secretary_id}`,
                {},
                {
                    headers: {
                        token: token,
                    },
                }
            );
            if (response.data.success) {
                toast.success("Accepted");
                getNotAcceptesSecToManager();
            }
            else {
                console.log("oo", response);
                toast.error("Something went Wrong");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const { isLoading } = useQuery("getNotAcceptesSecToManager", getNotAcceptesSecToManager);

    const RejectSecretaryForManager = async (secretary_id) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_APIHOST}/dashboard/acceptSecToManager/${secretary_id}`,
                {},
                {
                    headers: {
                        token: token,
                    },
                }
            );
            console.log(response);

            if (response.data.success) {
                toast.success("Removed");
                getNotAcceptesSecToManager();
            } else {
                // Handle failure
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
                        {/* {t("Dashborad.Acceptacne.AcceptSecretaryForManager")} */}
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
                                data.secertaries?.length > 0 ? (
                                    data.secertaries?.map((secretary, idx) => (
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
                                                                    {secretary.UserName}
                                                                </TableCell>
                                                                <TableCell align="center" component="th">
                                                                    {secretary.first_name +
                                                                        " " +
                                                                        secretary.last_name}
                                                                </TableCell>
                                                                <TableCell align="center" component="th">
                                                                    {secretary.E_mail}
                                                                </TableCell>
                                                                <TableCell align="right" component="th">
                                                                    <i
                                                                        className="fa-solid fa-trash deletAcc"
                                                                        onClick={() => {
                                                                            RejectSecretaryForManager(secretary.secretary_id);
                                                                        }}
                                                                    ></i>
                                                                </TableCell>
                                                                <TableCell align="center" component="th">
                                                                    <button
                                                                        className="btn accept-button"
                                                                        onClick={() => {
                                                                            AcceptSecForManager(secretary.secretary_id);
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



