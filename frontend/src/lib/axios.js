import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "https://chat-application-bxkv.onrender.com/api",
    withCredentials: true,
}); 