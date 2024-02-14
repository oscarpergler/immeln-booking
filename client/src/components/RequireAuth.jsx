import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const { auth } = useAuth();


    return (
        auth?.data?.accessToken
            ? 
            <Outlet />
            : 
            <Navigate to="/login"/>
    )
}

export default RequireAuth;