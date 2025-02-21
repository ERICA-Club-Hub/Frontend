import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false, // jwt 쿠키로 관리 안해서 false로
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000,
});
