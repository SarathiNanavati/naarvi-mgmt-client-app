import axios from "axios";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const instance = axios.create({
  baseURL: process.env.BACKEND_URL + "/api/v1/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": true,
  },
});

instance.interceptors.request.use(async function (config) {
  const token = await AsyncLocalStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
