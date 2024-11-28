import axios from 'axios';
import {getCookie} from "cookies-next";
import {toast} from "react-toastify";
import {getCookieServer} from "@/utils/getCookieServer";
import isServerSide from "@/utils/isServerSide";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

axiosInstance.interceptors.request.use(async function (config) {
    const token = isServerSide() ? await getCookieServer('token') : getCookie('token')
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (typeof window !== 'undefined') toast.error(error.response?.data?.message)
    return Promise.reject(error);
});

export default axiosInstance;