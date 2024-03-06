import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./meetings.css";
import $ from "jquery";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Meetings() {
  let [meetingsRows, setMeetingsRows] = useState([]);

  const getRowId = (row) => {
    return row.meeting_id;
  };

  async function getSecMeetings() {
    try {
      let { data } = await axios.get(
        `https://meetingss.onrender.com/secretary/getSecMeetings`,
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        setMeetingsRows(data.meetings);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSecMeetings();
  }, []);

  const [open, setOpen] = useState(false);
  let [selectedId, setSelectId] = useState(null);
  let meetingNavigate = useNavigate();

  useEffect(() => {
    $(".tableColumns *").contextmenu((e) => {
      e.preventDefault();
    });
    $(document).click(() => {
      $("#context-menu").css({ display: "none" });
      $("#deepContext").css({ display: "none" });
    });

    $("#status").mouseover(() => {
      $("#deepContext").css({ display: "block" });
    });

    $("#context-menu > .item:not(#status , #deepContext *)").mouseover((e) => {
      $("#deepContext").css({ display: "none" });
    });
  }, []);

  function rowContextMenu(x, y) {
    $("#context-menu").css({ top: y, left: x, display: "block" });
  }
  function showContext(e, targetId) {
    e.preventDefault();
    rowContextMenu(e.pageX, e.pageY);
    setSelectId(targetId);
  }
  function statusClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    $("#deepContext").css({ display: "block" });
  }
  async function deleteMeeting(id) {
    let { data } = await axios.delete(
      `https://meetingss.onrender.com/secretary/deleteMeeting/${id}`,
      { headers: { token: localStorage.getItem("token") } }
    );

    if (data.success) {
      toast.success(`Meeting Deleted Successfully`, {
        duration: 4000,
        position: "top-right",
        style: {
          backgroundColor: "#161920",
          color: "white",
        },
      });
      getSecMeetings();
    }
  }
  function openAlert() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function updateMeeting(rows) {
    console.log(rows);
    meetingNavigate("updateMeeting/" + selectedId);
  }
  // Holding Row
  // let holdTimeout;
  // let mouseIsDown = false;
  // async function holdRow(e, targetId) {
  //   await new Promise((resolve) => {
  //     mouseIsDown = true;
  //     setTimeout(() => {
  //       if (mouseIsDown) {
  //         showContext(e, targetId);
  //       }
  //       resolve();
  //     }, 2000);
  //   });
  // }
  // function handleMouseUp(e, targetId) {
  //   showContext(e, targetId);

  //   // mouseIsDown = false;
  //   // clearTimeout(holdTimeout);
  // }

  const [t] = useTranslation();

  return (
    <>
      <div className="main">
        <div className="container p-5 d-flex flex-column align-items-center justify-content-center p-xxl-4">
          <h2
            className="pageHeading mt-4 mb-xxl-4 mb-4 animate__animated animate__zoomIn"
            style={{ userSelect: "none" }}
          >
            {t("tableMeetings.meetings")}
          </h2>
          <div className="meetingsConatiner  p-xxl-4" style={{ width: "100%" }}>
            <div
              className="meetings d-flex justify-content-center"
              style={{ height: 500, width: "100%" }}
            >
              <DataGrid
                slotProps={{
                  row: {
                    onContextMenu: (e) => {
                      showContext(e, e.currentTarget.getAttribute("data-id"));
                    },
                    onDoubleClick: (e) => {
                      showContext(e, e.currentTarget.getAttribute("data-id"));
                    },
                    // onMouseDown: (e) => {
                    //   holdRow(e, e.currentTarget.getAttribute("data-id"));
                    // },
                    // onMouseUp: (e) => {
                    //   handleMouseUp(e, e.currentTarget.getAttribute("data-id"));
                    // },
                    style: { cursor: "context-menu" },
                  },
                }}
                columns={[
                  {
                    field: "date",
                    headerName: t("tableMeetings.table.date"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 120,
                  },
                  {
                    field: "time",
                    headerName: t("tableMeetings.table.time"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 120,
                  },
                  {
                    field: "person",
                    headerName: t("tableMeetings.table.person"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 120,
                  },
                  {
                    field: "about",
                    headerName: t("tableMeetings.table.topic"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 120,
                  },
                  {
                    field: "address",
                    headerName: t("tableMeetings.table.address"),
                    headerClassName: "tableColumns ",
                    align: "center",
                    headerAlign: "center",
                    width: 120,
                  },
                  {
                    field: "in_or_out",
                    headerName: t("tableMeetings.table.area"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 120,
                  },
                  {
                    field: "statues",
                    headerName: t("tableMeetings.table.status"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 120,
                  },
                  // {
                  //   field: "notes",
                  //   headerName: t("tableMeetings.table.Comments"),
                  //   headerClassName: "tableColumns",
                  //   align: "center",
                  //   headerAlign: "center",
                  //   width: 120,
                  // },
                  {
                    field: "Manager_Name",
                    headerName: "Manager",
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 120,
                  },
                ]}
                rows={meetingsRows}
                getRowId={getRowId}
                sx={{
                  overflow: "auto",
                  maxHeight: "550px",
                  padding: "10px",
                  maxWidth: "fit-content",
                  borderRadius: "15px",

                  "& .MuiDataGrid-cell": {
                    color: "var(--BlackToWhite)",
                    cursor: "pointer",
                  },
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-cell:hover": {
                    color: "var(--BlackToWhite)",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    display: "none",
                  },
                  "& [data-testid='ArrowUpwardIcon'], [data-testid='ArrowDownwardIcon']":
                  {
                    display: "none",
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div id="context-menu">
          <div id="status" className="item" onClick={(e) => statusClicked(e)}>
            <div className="staus d-flex justify-content-between align-align-items-center">
              <span>{t("MeetingContextMenu.status")}</span>
              <i className="fa-solid fa-caret-up fa-rotate-90 me-1"></i>
            </div>
          </div>
          <div className="item" onClick={(e) => updateMeeting(e)}>
            {t("MeetingContextMenu.update")}
          </div>
          <div className="item" onClick={openAlert}>
            {t("MeetingContextMenu.delete")}
          </div>
          <div id="deepContext">
            <div
              className="item"
              onClick={() => {
                console.log("Done", selectedId);
              }}
            >
              {t("MeetingContextMenu.statusContext.done")}
            </div>
            <div
              className="item"
              onClick={() => {
                console.log("Cancelled", selectedId);
              }}
            >
              {t("MeetingContextMenu.statusContext.changedate")}
            </div>
            <div
              className="item"
              onClick={() => {
                console.log("Cancelled", selectedId);
              }}
            >
              {t("MeetingContextMenu.statusContext.cancel")}
            </div>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Warning!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By Accepting you will delete the Meeting.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                handleClose();
                deleteMeeting(selectedId);
              }}
              autoFocus
            >
              Accept
            </Button>
          </DialogActions>
        </Dialog>
        <Helmet>
          <title>Meetings</title>
        </Helmet>
      </div>
    </>
  );
}
