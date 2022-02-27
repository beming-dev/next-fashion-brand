import axios, { AxiosInstance } from "axios";

const SERVER_ADDRESS = "http://localhost:3031";

const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 15000,
});

export default customAxios;
