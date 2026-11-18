import http from "./http";

// Overall dashboard stats
export const getDashboardReport = () => http.get("/Report/DashboardReport");

// Technologies used in courses
export const getDashboardTechnologyReport = () =>
  http.get("/Report/DashboardTechnologyReport");
