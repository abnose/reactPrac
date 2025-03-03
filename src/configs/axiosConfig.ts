import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { showSnackbar } from "./snackbarUtils";

// Base Axios instance
const api: AxiosInstance = axios.create({
  baseURL: "http://46.100.46.149:8069",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    showSnackbar("Request successful!", "success");
    return response;
  },
  (error: AxiosError) => {
    const errorMessage = error.response?.data?.message || "An error occurred!";
    showSnackbar(errorMessage, "error");
    return Promise.reject(error);
  }
);

export default api;
