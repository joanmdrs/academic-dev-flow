import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { useAuth } from "../hooks/AuthProvider";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Loading />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;