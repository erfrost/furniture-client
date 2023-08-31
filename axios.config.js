import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://5.101.50.171/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

// import axios from "axios";

// // Создание экземпляра Axios с настройками
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosInstance;
