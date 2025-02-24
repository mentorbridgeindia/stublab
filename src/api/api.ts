import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const tokenType = "Bearer";
const baseURL = process.env.REACT_APP_BASE_API_URL;

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const clientId = localStorage.getItem("clientId");

  if (token) {
    console.log("token", token);
    config.headers.Authorization = `${tokenType} ${token}`;
  }
  if (clientId) {
    config.headers["X-Client-Id"] = clientId;
    config.headers["ClientId"] = clientId;
  }
  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Error in response:", error);
    if (
      error.response.status === 401 &&
      error.response.data.error === "JWT_EXPIRED"
    ) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("clientId");
      window.location.href = "https://stublab.securosphere.in/login";
    }
    return Promise.reject(error);
  }
);

// API Wrapper
const api = (axios: AxiosInstance) => ({
  get: <T>(url: string, config: AxiosRequestConfig = {}) =>
    axios.get<T>(url, config),
  delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
    axios.delete<T>(url, config),
  post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
    axios.post<T>(url, body, config),
  patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
    axios.patch<T>(url, body, config),
  put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
    axios.put<T>(url, body, config),
});

export default api(axiosInstance);
