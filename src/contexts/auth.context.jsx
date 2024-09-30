import { createContext, useState } from "react";
import { useContext } from "react";
import usersService from "../service/userService";

const fn_error_context_must_be_used = () => {
    throw new Error("must used authContext provider for consumer to work");
};

export const authContext = createContext({
    user: null,
    login: fn_error_context_must_be_used,
    logout: fn_error_context_must_be_used,
    createuser: fn_error_context_must_be_used,

});
authContext.displayName = "Auth"

export function AuthProvider({ children }) {

    const [user, setUser] = useState(usersService.getUser());

    const refreashUser = () => setUser(usersService.getUser());

    const login = async (credentials) => {
        const response = await usersService.login(credentials);
        refreashUser()
        return response;
    }

    const logout = () => {
        usersService.logout();
        refreashUser()
    }

    return <authContext.Provider value={{ user, login, logout, createuser: usersService.createUser }} >{children}</authContext.Provider>
}

export function useAuth() {
    return useContext(authContext)
}