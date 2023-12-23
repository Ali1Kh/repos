import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import "./meetings.css";
export default function Meetings() {
  let [meetingsRows, setMeetingsRows] = useState([
    {
      id: 1,
      Date: "20-10-2025",
      Time: "3:00",
      Person: "Ali",
      Topic: "I dont know",
      Address: "hy25a",
      Notes: "lol",
      Area: "Inside",
    },
    {
      id: 2,
      Date: "10-12-2024",
      Time: "12:00",
      Person: "Mustafa",
      Topic: "Lol lol odsasdakijf",
      Address: "el4ar3",
      Notes: "lol",
      Area: "Outside",
    },
    {
      id: 3,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Qadry",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
    },
    {
      id: 4,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Qadry",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
    },
    {
      id: 5,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Qadry",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
    },
    {
      id: 6,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Qadry",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
    },
    {
      id: 7,
      Date: "10-05-2024",
      Time: "2:00",
      Person: "Qadry",
      Topic: "Modo3 mohom",
      Address: "hy25a",
      Notes: "anta mal y3am lorem12fsd",
      Area: "Inside",
    },
  ]);
  return (
    <>
      <div className="main">
        <div className="container  d-flex flex-column align-items-center justify-content-center p-xxl-4">
          <h2 className="mt-4 mb-5" style={{ userSelect: "none" }}>
            Meetings
          </h2>
          <div className="meetings ">
            <Box>
              <DataGrid
                columns={[
                  { field: "Date", headerClassName: "tableColumns" },
                  { field: "Time", headerClassName: "tableColumns" },
                  { field: "Person", headerClassName: "tableColumns" },
                  { field: "Topic", headerClassName: "tableColumns" },
                  { field: "Address", headerClassName: "tableColumns" },
                  { field: "Notes", headerClassName: "tableColumns" },
                  { field: "Area", headerClassName: "tableColumns" },
                ]}
                rows={meetingsRows}
                sx={{
                  padding: "10px",
                  "& .MuiDataGrid-cell": {
                    color: "white",
                    marginInline: "15px",
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
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
