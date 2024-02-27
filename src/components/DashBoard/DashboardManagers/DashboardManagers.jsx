import React, { useEffect , useState } from 'react';
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
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";


export default function DashBoardManagers() {
  const token = localStorage.getItem("token")
  const [id, setId] = useState("");
  const [data, setData] = useState([]);


  const { isLoading } = useQuery("getDashBoardManager", getDashBoardManager);

  async function getDashBoardManager() {
    const {data} = await axios.get("https://meetingss.onrender.com/dashboard/getAllManagers", {
      headers: {
        token: token
      }
    })
    if (data.success) {
      setData(data)
    }
  }

  const DeleteManager = async () => {
    await axios
    .delete(`https://meetingss.onrender.com/dashboard/deleteManager/${id}`, {
      headers: {
        token: token,
      },
    })
    .then((response) => {
      if (response.data.success) {
        toast.success("Manager Deleted Successfully");
        getDashBoardManager()
      } else {
        toast.error("Something went Wrong!");
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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

  const [t, il8n] = useTranslation();

  return <>
    <div className="main">
      <div className="container mt-5">
        <h1 className="container d-flex flex-column align-items-center justify-content-center p-4 fw-bold text-white">
        {t("Dashborad.ManageresAndSecretaries.ManageresName")}
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
                            <TableCell align="center" className="fw-bold">{t("Dashborad.ManageresAndSecretaries.userName")}</TableCell>
                            <TableCell align="center" className="fw-bold">{t("Dashborad.ManageresAndSecretaries.name")}</TableCell>
                            <TableCell align="center" className="fw-bold">{t("Dashborad.ManageresAndSecretaries.E_mail")}</TableCell>
                            <TableCell align="center" className="fw-bold">{t("Dashborad.ManageresAndSecretaries.Accepted")}</TableCell>
                            <TableCell align="center" className="fw-bold">{t("Dashborad.ManageresAndSecretaries.delete")}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data
                            ? data.managers?.map((manager, idx) => (
                              <TableRow hover tabIndex={-1} key={idx}  onClick={()=>{
                                    setId(manager.manager_id)
                              }}>
                                <TableCell align="center" component="th" scope="row">{manager.UserName}</TableCell>
                                <TableCell align="center" component="th">{manager.first_name + " " + manager.last_name}</TableCell>
                                <TableCell align="center" component="th">{manager.E_mail}</TableCell>
                                <TableCell align="center" component="th">{manager.Accepted_Acc ? "Accept" : "Refused"}</TableCell>
                                <TableCell align="center" component="th">
                                  <button align="center" className='btn btn-danger' onClick={()=>{
                                    DeleteManager(idx);
                                  }}>
                                    {t("Dashborad.ManageresAndSecretaries.delete")}
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
    </div>
  </>
}