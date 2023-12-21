import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import NewMeeting from "./components/secretary/Meeting/new meeting/NewMeeting";
import Sidebar from "./components/sidebar/Sidebar";

let router = createBrowserRouter([{
  path: "/", element: <Layout />, children: [{
    path: "login", element: <Login />
  },
  {
    path: "signup", element: <Signup />
  },
  {
    path: "sidebar", element: <Sidebar />
  }
]
}]);
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
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
