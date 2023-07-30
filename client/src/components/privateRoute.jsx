import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/usercontext";
import { useContext } from "react";

export const PrivateRoute = () => {
    const [state] = useContext(UserContext)
    
    if (state.user.role === "tenant") {
        return <Outlet />
    }
    return <Navigate to="/" />
}

export function PrivateRouteOwner() {
    const [state] = useContext(UserContext);

    if (state.user.role === "owner") {
        return <Outlet />
    }
    return <Navigate to="/" />
}
