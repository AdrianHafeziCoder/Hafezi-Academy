import http from "./http";

export const getProfileInfo = () => http.get("/SharePanel/GetProfileInfo");
export const updateProfileInfo = (body) =>
  http.put("/SharePanel/UpdateProfileInfo", body);
export const addProfileImage = (data, config = {}) =>
  http.post("/SharePanel/AddProfileImage", data, config);
export const selectProfileImage = (data, config = {}) =>
  http.post("/SharePanel/SelectProfileImage", data, config);
export const deleteProfileImage = () =>
  http.delete("/SharePanel/DeleteProfileImage");
export const changePassword = (body) =>
  http.post("/SharePanel/ChangePassword", body);
export const getSecurityInfo = () => http.get("/SharePanel/GetSecurityInfo");
export const editSecurity = (body) =>
  http.put("/SharePanel/EditSecurity", body);
export const getMyJobHistories = () =>
  http.get("/SharePanel/GetMyJobHistories");
export const getJobHistory = (historyId) =>
  http.get("/SharePanel/GetJobHistory", { params: { HistoryId: historyId } });
export const createJobHistory = (body) =>
  http.post("/SharePanel/CreateJobHistory", body);
export const updateJobHistory = (body) =>
  http.post("/SharePanel/UpdateJobHistory", body);
export const deleteJobHistory = (historyId) =>
  http.delete("/SharePanel/DeleteJobHistory", {
    params: { HistoryId: historyId },
  });
export const getMyCourses = (params) =>
  http.get("/SharePanel/GetMyCourses", { params });
export const getMyFavoriteCourses = () =>
  http.get("/SharePanel/GetMyFavoriteCourses");
export const getMyFavoriteNews = () =>
  http.get("/SharePanel/GetMyFavoriteNews");
export const getMyCoursesReserve = () =>
  http.get("/SharePanel/GetMyCoursesReserve");
export const getMyCoursesComments = () =>
  http.get("/SharePanel/GetMyCoursesComments");
export const getMyNewsComments = () =>
  http.get("/SharePanel/GetMyNewsComments");
