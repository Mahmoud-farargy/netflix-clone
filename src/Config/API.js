import axios from "axios";
import {tmdbBaseUrl} from "../Config/TMDB";
const API = () => {
    const axiosInstance = axios.create({
        baseURL: tmdbBaseUrl,
        headers: {
            Accept: "application/json",
            "Content-Type": "application.json"
        }
    })
    axios.defaults.timeout = 100000;
    axiosInstance.interceptors.request.use( request => {
        return request;
    },err => {
        return Promise.reject(err);
    })
    return axiosInstance;
}

export default API;