import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.dom888.ru/api/",
  // baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
