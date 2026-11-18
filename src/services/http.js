// ===== Axios instance =====
import axios from "axios";
import { API_URL, ADMIN_BASE } from "../config/settings";
import { getToken, clearToken } from "./authStorage";

const http = axios.create({ baseURL: API_URL });

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const onLoginPage = window.location.pathname.endsWith("/login");
    const hadToken = Boolean(getToken());
    const message = String(err.response?.data?.message || "");

    // If the message was “access” or “ban” → don't log out (the token is valid, we just lack access)
    const isAccessDenied =
      message.includes("access") || message.includes("ban") || status === 403;

    if (status === 401 && hadToken && !onLoginPage && !isAccessDenied) {
      clearToken();
      window.location.assign(`${ADMIN_BASE}/login`);
    }

    return Promise.reject(err);
  },
);

export default http;
