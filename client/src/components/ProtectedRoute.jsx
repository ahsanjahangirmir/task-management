import {Navigate, Outlet} from "react-router-dom";
import { useSession } from "@/context/SessionContext";

export default function ProtectedRoute() 
{
    const user = useSession()

    if (!user)
    
    {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}