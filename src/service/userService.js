import axios from "axios";
import httpService from "./httpService";
import { jwtDecode } from "jwt-decode";

refreshTokenHeader();

export function refreshTokenHeader() {
    httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createUser(user) {
    return httpService.post("/users", user);
}

export async function login(credentials) {
    const response = await httpService.post("/users/login", credentials);
    localStorage.setItem("token", response.data);
    axios.defaults.headers.common["x-auth-token"] = response.data;
    return response.data;
}

export function logout() {
    localStorage.removeItem("token");
    refreshTokenHeader()
}

export function getJWT() {
    return localStorage.getItem("token");
}

export function getUser() {
    try {
        const token = getJWT();
        return jwtDecode(token);
    } catch {
        return null;
    }
}

const usersService = {
    createUser,
    login,
    logout,
    getUser,
    getJWT,


};

export default usersService;
