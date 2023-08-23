import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://5.101.50.171/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
