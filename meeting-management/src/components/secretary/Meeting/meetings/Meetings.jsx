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
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
export default function Meetings() {
  let [meetingsRows, setMeetingsRows] = useState([
    {
      id: 3341,
      Date: "20-10-2025",
      Time: "3:00",
      Person: "Ali elsaadany",
      Topic: "I dont know",
      Address: "hy25a",
      Notes: "lol",
      Area: "Inside",
      Status: "not done",
    },
    {
      id: 2,
      Date: "10-12-2024",
      Time: "12:00",
      Person: "Mustafa salem",
      Topic: "Lol lol odsasdakijf",
      Address: "el4ar3",
      Notes: "lol",
      Area: "Outside",
      Status: "done",
    },
    {
      id: 3,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Qadry omar",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "done",
    },
    {
      id: 4,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Mahmoud khaled",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "done",
    },
    {
      id: 5,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Pop",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "cancelled",
    },
    {
      id: 6,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Taha",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "not done",
    },
    {
      id: 7,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Ali",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsdxxxxxxxxxas as asmjfkjfamisdk fsaokfjad",
      Area: "Inside",
      Status: "not done",
    },
    {
      id: 8,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Salah",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "not done",
    },
    {
      id: 9,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Nabil",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "not done",
    },
    {
      id: 10,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Omar",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "done",
    },
    {
      id: 11,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Ahmed",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "not done",
    },
    {
      id: 12,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Saged",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "not done",
    },
    {
      id: 13,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Ali",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
      Status: "done",
    },
  ]);
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
  function deleteMeeting() {
    toast.success(`Meeting Deleted Successfully`, {
      duration: 4000,
      position: "top-right",
      style: {
        backgroundColor: "#161920",
        color: "white",
      },
    });
  }
  function openAlert() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function updateMeeting() {
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

  const [t, il8n] = useTranslation();

  return (
    <>
      <div className="main">
        <div className="container d-flex flex-column align-items-center justify-content-center p-xxl-4">
          <h2
            className="pageHeading mt-4 mb-xxl-4 mb-4 animate__animated animate__zoomIn"
            style={{ userSelect: "none" }}
          >
            {t("Meetings.meetings")}
          </h2>
          <div className="meetingsConatiner  p-xxl-4" style={{ width: "100%" }}>
            <div
              className="meetings d-flex justify-content-center"
              style={{ height: 550, width: "100%" }}
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
                    field: "Date",
                    headerName: t("Meetings.table.date"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 125,
                  },
                  {
                    field: "Time",
                    headerName: t("Meetings.table.time"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 125,
                  },
                  {
                    field: "Person",
                    headerName: t("Meetings.table.person"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 125,
                  },
                  {
                    field: "Topic",
                    headerName: t("Meetings.table.topic"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 125,
                  },
                  {
                    field: "Address",
                    headerName: t("Meetings.table.address"),
                    headerClassName: "tableColumns ",
                    align: "center",
                    headerAlign: "center",
                    width: 125,
                  },
                  {
                    field: "Area",
                    headerName: t("Meetings.table.area"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 125,
                  },
                  {
                    field: "Status",
                    headerName: t("Meetings.table.status"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 125,
                  },
                  {
                    field: "Notes",
                    headerName: t("Meetings.table.notes"),
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 125,
                  },
                ]}
                rows={meetingsRows}
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
          <div className="item" onClick={updateMeeting}>
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
              By Accepting you will delete the meeting with Ali Khaled.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                handleClose();
                deleteMeeting();
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
