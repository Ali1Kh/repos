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
import ProtectedRoutes from "./components/Protected Routes/ProtectedRoutes.jsx";
import Acceptance from "./components/dashBoard/Acceptance/Acceptance.jsx";
import ForgotPassword from "./components/forgot password/forgot password/ForgotPassword.jsx";
import CheckYourEmail from "./components/forgot password/check your email/CheckYourEmail.jsx";
import ResetPassword from "./components/forgot password/Reset password/ResetPassword.jsx";
import Notes from "./components/Notes/Notes.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/meetings",
        element: (
          <ProtectedRoutes role={"Manager"}>
            <HomePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoutes role={"Manager"}>
            <HomePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/meeting",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoutes role={"Secertary"}>
                <Meetings />
              </ProtectedRoutes>
            ),
          },
          {
            path: "addMeeting",
            element: (
              <ProtectedRoutes>
                <NewMeeting role={"Secertary"} />
              </ProtectedRoutes>
            ),
          },
          {
            path: "updateMeeting/:id",
            element: (
              <ProtectedRoutes>
                <UpdateMeeting role={"Secertary"} />
              </ProtectedRoutes>
            ),
          },
          {
            path: "createManagerAccount",
            element: (
              <ProtectedRoutes role={"Secertary"}>
                <CreateManagerAccount />
              </ProtectedRoutes>
            ),
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
          {
            path: "",
            element: (
              <ProtectedRoutes role={"Manager"}>
                <HomePage />
              </ProtectedRoutes>
            ),
          },
          {
            path: "meetingDetails",
            element: (
              <ProtectedRoutes role={"Manager"}>
                <MeetingDetails />
              </ProtectedRoutes>
            ),
          },
          {
            path: "calender",
            element: (
              <ProtectedRoutes role={"Manager"}>
                <Calender />
              </ProtectedRoutes>
            ),
          },
          {
            path: "Notes",
            element: (
              <ProtectedRoutes role={"Manager"}>
                <Notes />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: "/dashboard",
        children: [
          {
            path: "meetings",
            element: (
              <ProtectedRoutes role={"Admin"}>
                {/* <MeetingDetails /> */}
              </ProtectedRoutes>
            ),
          },
          {
            path: "managers",
            element: (
              <ProtectedRoutes role={"Admin"}>
                {/* <Calender /> */}
              </ProtectedRoutes>
            ),
          },
          {
            path: "secertaries",
            element: (
              <ProtectedRoutes role={"Admin"}>
                {/* <Calender /> */}
              </ProtectedRoutes>
            ),
          },
          {
            path: "history",
            element: (
              <ProtectedRoutes role={"Admin"}>
                {/* <Calender /> */}
              </ProtectedRoutes>
            ),
          },
          {
            path: "Acceptance",
            element: (
              <ProtectedRoutes role={"Admin"}>
                <Acceptance />
              </ProtectedRoutes>
            ),
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
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "",
    children: [
      {
        path: "/ForgetPassword",
        element: (
          <>
            <Navbar />
            <ForgotPassword />
          </>
        ),
      },
      {
        path: "/CheckYourEmail",
        element: (
          <>
            <Navbar />
            <CheckYourEmail />
          </>
        ),
      },
      {
        path: "/ResetPassword",
        element: (
          <>
            <Navbar />
            <ResetPassword />
          </>
        ),
      },
    ],
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
        <Toaster toastOptions={{ style: { zIndex: "99999" } }} />
      </QueryClientProvider>
    </>
  );
}

export default App;
