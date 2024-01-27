import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import useRefreshToken from '../hooks/useRefreshToken';

const RequireAuth = () => {
    const { auth } = useAuth();


    return (
        auth
            ? <Outlet />
            : <Navigate to="/login"/>
    )
}

export default RequireAuth;