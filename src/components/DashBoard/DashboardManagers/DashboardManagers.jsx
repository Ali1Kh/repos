import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './DashboardManagers.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { TailSpin } from 'react-loader-spinner';

export default function DashBoardManagers() {
  const token = localStorage.getItem("token")

  const { data, isLoading } = useQuery("getDashBoardSecertar", getDashBoardSecertar);

  function getDashBoardSecertar() {
    return axios.get("https://meetingss.onrender.com/dashboard/getAllSecretaries", {
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

  return <>
    <div className="main">
      <div className="container mt-5">
        <h1 className="container d-flex flex-column align-items-center justify-content-center p-4">
          Secertaries
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
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">UserName</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Accepted</TableCell>
                            <TableCell align="center">Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data
                            ? data.data.secertaries?.map((secertarie, idx) => (
                              <TableRow hover tabIndex={-1} key={idx}>
                                <TableCell align="center" component="th" scope="row">{secertarie.UserName}</TableCell>
                                <TableCell align="center" component="th">{secertarie.first_name + " " + secertarie.last_name}</TableCell>
                                <TableCell align="center" component="th">{secertarie.E_mail}</TableCell>
                                <TableCell align="center" component="th">{secertarie.Accepted_Acc ? "Accept" : "Refused"}</TableCell>
                                <TableCell align="center" component="th">
                                  <button align="center" className='btn btn-danger'>
                                    Delete
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
                      count={data?.data.secertaries?.length}
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