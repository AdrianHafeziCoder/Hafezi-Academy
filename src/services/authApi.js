import http from "./http";

// Simple login (email or number + password)
export const login = (body) => http.post("/Sign/Login", body);
