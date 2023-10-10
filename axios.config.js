// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://80.249.144.137:8080/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosInstance;

import axios from "axios";

// Создание экземпляра Axios с настройками
const axiosInstance = axios.create({
  baseURL: "http://31.184.254.214:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
