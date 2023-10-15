import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.dom888.ru/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
