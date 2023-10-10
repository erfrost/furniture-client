import axios from "axios";

// Создание экземпляра Axios с настройками
const axiosInstance = axios.create({
  baseURL: "https://api.dom888.ru/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
