import axios from "axios";
import Cookies from "js-cookie";


const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    let accessToken = Cookies.get("accesstoken");
    if (accessToken && accessToken.trim()) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
