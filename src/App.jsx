import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/layout/Layout.jsx";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import NewMeeting from "./components/secretary/Meeting/new meeting/NewMeeting.jsx";
import MeetingDetails from "./components/manager/meetingDetails/meetingDetails.jsx";
import UpdateMeeting from "./components/secretary/Meeting/update meeting/UpdateMeeting.jsx";
import Meetings from "./components/secretary/Meeting/meetings/Meetings.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Calender from "./components/manager/Calender/Calender.jsx";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar.jsx";
import CreateManagerAccount from "./components/secretary/Meeting/create manager account/CreateManagerAccount";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
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
            path: "createManagerAccount",
            element: <CreateManagerAccount />,
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar /> <Signup />
      </>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={{}}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </LocalizationProvider>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
