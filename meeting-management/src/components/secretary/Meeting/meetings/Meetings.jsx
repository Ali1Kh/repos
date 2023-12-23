import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import "./meetings.css";
import $ from "jquery";
import { getRowsStateFromCache } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";
import { getGridRowElement, getRowEl } from "@mui/x-data-grid/utils/domUtils";
export default function Meetings() {
  useEffect(() => {
    $(".tableColumns *").contextmenu((e) => {
      e.preventDefault();
    });
    $(document).click(() => {
      $("#context-menu").css({ display: "none" });
    });
  }, []);

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

  let [selectedId, setSelectId] = useState(null);

  function rowContextMenu(x, y) {
    $("#context-menu").css({ top: y, left: x, display: "block" });
  }
  return (
    <>
      <div className="main">
        <div className="container  d-flex flex-column align-items-center justify-content-center p-xxl-4">
          <h2 className="mt-4 mb-5" style={{ userSelect: "none" }}>
            Meetings
          </h2>
          <div className="meetingsConatiner p-5" style={{ width: "100%" }}>
            <div className="meetings" style={{ height: 550, width: "100%" }}>
              <DataGrid
                slotProps={{
                  row: {
                    onContextMenu: (e) => {
                      e.preventDefault();
                      rowContextMenu(e.pageX, e.pageY);
                      setSelectId(e.currentTarget.getAttribute("data-id"));
                    },
                    style: { cursor: "context-menu" },
                  },
                }}
                columns={[
                  {
                    field: "Date",
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 140,
                  },
                  {
                    field: "Time",
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 140,
                  },
                  {
                    field: "Person",
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 140,
                  },
                  {
                    field: "Topic",
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 140,
                  },
                  {
                    field: "Address",
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 140,
                  },
                  {
                    field: "Area",
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 140,
                  },
                  {
                    field: "Status",
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 140,
                  },
                  {
                    field: "Notes",
                    headerClassName: "tableColumns",
                    align: "center",
                    headerAlign: "center",
                    width: 140,
                  },
                ]}
                rows={meetingsRows}
                sx={{
                  overflow: "auto",
                  maxHeight: "550px",
                  padding: "10px",

                  "& .MuiDataGrid-cell": {
                    color: "white",
                    cursor: "pointer",
                  },
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-cell:hover": {
                    color: "white",
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
          <div className="item" onClick={() => console.log("Done", selectedId)}>
            Done
          </div>
          <div
            className="item"
            onClick={() => {
              console.log("Update", selectedId);
            }}
          >
            Update
          </div>
          <div
            className="item"
            onClick={() => {
              console.log("Delete", selectedId);
            }}
          >
            Delete
          </div>
        </div>
      </div>
    </>
  );
}
