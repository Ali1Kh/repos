import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import NewMeeting from "./components/secretary/Meeting/new meeting/NewMeeting";
import NotFound from "./components/NotFound/NotFound";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UpdateMeeting from "./components/secretary/Meeting/update meeting/UpdateMeeting";
import Meetings from "./components/secretary/Meeting/meetings/Meetings";
const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <>Home</>,
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
    ],
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
        <RouterProvider router={router} />
      </LocalizationProvider>
    </>
  );
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import NewMeeting from "./components/secretary/Meeting/new meeting/NewMeeting";
import MeetingDetails from "./components/manager/meetingDetails/meetingDetails";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "/meeting",
        children: [
          {
            path: "addMeeting",
            element: <NewMeeting />,
          },
        ],
      },
      {
        path: "/manager",
        children: [
          {
            path: "meetingDetails",
            element: <MeetingDetails />,
          },
        ],
      }
    ],
  },
]);
function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </>
  );
}

export default App;
