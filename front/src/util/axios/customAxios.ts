import axios, { AxiosInstance } from 'axios';

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export const customAxios: AxiosInstance = axios.create({
    baseURL: SERVER_HOST,
});
