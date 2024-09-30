import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { useEffect } from "react";

function LogOut({ redirect = "/home" }) {
    const navigate = useNavigate()
    const { logout } = useAuth();


    useEffect(() => {
        alert("You log out from your account");
        logout();

        navigate(redirect);
    }, [navigate, logout, redirect]);

    return null;

}

export default LogOut;