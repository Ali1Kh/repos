import { RouterProvider, createHashRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import NewMeeting from "./components/secretary/Meeting/new meeting/NewMeeting";
import MeetingDetails from "./components/manager/meetingDetails/MeetingDetails";
import UpdateMeeting from "./components/secretary/Meeting/update meeting/UpdateMeeting";
import Meetings from "./components/secretary/Meeting/meetings/Meetings";
import HomePage from "./components/HomePage/HomePage";
import NotFound from "./components/NotFound/NotFound";
import Calender from "./components/manager/Calender/Calender";
import { Toaster } from "react-hot-toast";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "/meeting",
        children: [
          {
            path: "",
            element: <Meetings />,
          },
          {
            path: "addMeeting",
            element: <NewMeeting />,
          },
          {
            path: "updateMeeting/:id",
            element: <UpdateMeeting />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "/manager",
        children: [
          { path: "", element: <HomePage /> },
          {
            path: "meetingDetails",
            element: <MeetingDetails />,
          },
          {
            path: "calender",
            element: <Calender />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={{}}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </LocalizationProvider>
      <Toaster />
    </>
  );
}

export default App;
