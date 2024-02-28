import React, { useState } from "react";
import "./Acceptance.css";
import toast from "react-hot-toast";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const Acceptance = () => {
    const token = localStorage.getItem("token")
    const [id, setId] = useState("");
    const [data, setData] = useState([]);

    const getNotAcceptedAccounts = async () => {
        try {
            const response = await axios.get(
                "https://meetingss.onrender.com/dashboard/getNotAcceptedSec",
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

    const { isLoading } = useQuery("getAcceptAccount", getNotAcceptedAccounts);

    async function acceptAccount(id) {
        try {
            const response = await axios.post(
                `https://meetingss.onrender.com/dashboard/acceptAcc/${id}`,
                {},
                {
                    headers: {
                        token: token,
                    },
                }
            );
            if (response.data.success) {
                toast.success("Accepted");
                getNotAcceptedAccounts();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const rejectAccount = async (id) => {
        try {
            const response = await axios.post(
                `https://meetingss.onrender.com/dashboard/rejectAcc/${id}`,
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
                getNotAcceptedAccounts();
            } else {
                // Handle failure
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

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

    return (
        <>
            <div className="main">
                <div className="container mt-5">
                    <h1 className="container d-flex flex-column align-items-center justify-content-center p-4 fw-bold">
                        {t("Dashborad.Acceptacne.AcceptacneName")}
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
                            <div>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" className="fw-bold">UserName</TableCell>
                                                    <TableCell align="center" className="fw-bold">Name</TableCell>
                                                    <TableCell align="center" className="fw-bold">Email</TableCell>
                                                    <TableCell align="right" className="fw-bold">Reject</TableCell>
                                                    <TableCell align="center" className="fw-bold">Accept</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data
                                                    ? data.secertaries?.map((secretary, idx) => (
                                                        <TableRow hover tabIndex={-1} key={idx} onClick={() => {
                                                            setId(secretary.manager_id)
                                                        }}>
                                                            <TableCell align="center" component="th" scope="row">{secretary.UserName}</TableCell>
                                                            <TableCell align="center" component="th">{secretary.first_name + " " + secretary.last_name}</TableCell>
                                                            <TableCell align="center" component="th">{secretary.E_mail}</TableCell>
                                                            <TableCell align="right" component="th">
                                                                <i
                                                                    className="fa-solid fa-trash deletAcc"
                                                                    onClick={() => {
                                                                        rejectAccount(secretary.secretary_id);
                                                                    }}
                                                                ></i>
                                                            </TableCell>
                                                            <TableCell align="center" component="th">
                                                                <button
                                                                    className="btn accept-button"
                                                                    onClick={() => {
                                                                        acceptAccount(secretary.secretary_id);
                                                                    }}
                                                                >
                                                                    {t("Dashborad.Acceptacne.acceptBtn")}
                                                                </button>
                                                            </TableCell>

                                                        </TableRow>
                                                    )) : ""}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={data?.managers?.length}
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
        </>
    );
};

export default Acceptance;
