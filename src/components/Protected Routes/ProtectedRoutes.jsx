import React from 'react';
import { Navigate } from 'react-router';

export default function ProtectedRoutes({ children }) {
    if (localStorage.getItem("token") !== null) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" />;
    }
}


