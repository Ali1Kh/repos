import React from "react";
import { Navigate } from "react-router";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
export default function ProtectedRoutes({ children, role }) {
  if (localStorage.getItem("token") !== null) {
    const payload = jwtDecode(localStorage.getItem("token"));
    if (role) {
      if (role != payload.role) {
        toast.error(`You Must Be ${role} To Access This Page`);
        return <Navigate to="/login" />;
      }
    }
    return <>{children}</>;
  } else {
    toast.error("Login To Access This Page");
    return <Navigate to="/login" />;
  }
}
