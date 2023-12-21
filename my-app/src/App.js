import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

let router = createBrowserRouter([{
  path: "/", element: <Layout />, children: [{
    path: "login", element: <Login />
  },
  {
    path: "signup", element: <Signup />
  }
]
}]);

function App() {
  return <>
    <RouterProvider router={router} />
  </>


}

export default App;
