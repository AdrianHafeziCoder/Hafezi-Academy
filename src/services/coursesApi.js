// ===== Courses, groups, reserves, comments =====
import http from "./http";
import { pageParams } from "../lib/apiData";

// --- Courses
export const getCourses = (p) =>
  http.get("/Course/CourseList", { params: pageParams(p) });
export const setCourseActive = (id, active) =>
  http.put("/Course/ActiveAndDeactiveCourse", { id, active });
export const setCourseExpire = (id, active) =>
  http.put("/Course/SetExpireCourse", { id, active });
export const deleteCourse = (id) =>
  http.delete("/Course/DeleteCourse", { data: { id, active: false } });
// TODO: create and edit course (POST/PUT /Course), its body was empty in Swagger

// --- Groups
export const getGroups = (p) =>
  http.get("/CourseGroup", { params: pageParams(p) });
// TODO: add / edit / delete group (bodies were empty in Swagger)

// --- Reserves
export const getReserves = () => http.get("/CourseReserve");
export const deleteReserve = (id) =>
  http.delete("/CourseReserve", { data: { id } });
export const reserveToStudent = (body) =>
  http.post("/CourseReserve/SendReserveToCourse", body);

// --- Comments
export const getComments = (p) =>
  http.get("/Course/CommentManagment", { params: pageParams(p) });
export const acceptComment = (id) =>
  http.post("/Course/AcceptCourseComment", null, {
    params: { CommentCourseId: id },
  });
// TODO: reply to comment (POST /Course/AddReplyCourseComment), its body was empty in Swagger

// --- Additional course and group endpoints documented in Sepehr Academy
export const getCourseById = (id) =>
  http.get(`/Course/${encodeURIComponent(id)}`);
export const getTeacherCourses = (p) =>
  http.get("/Course/TeacherCourseList", { params: pageParams(p) });
export const getCourseGroups = (params = {}) =>
  http.get("/CourseGroup/GetCourseGroup", { params });
export const getCourseGroupDetails = (id) =>
  http.get("/CourseGroup/Details", { params: { Id: id } });
export const addCourseGroup = (body) => http.post("/CourseGroup", body);
export const updateCourseGroup = (body) => http.put("/CourseGroup", body);
export const deleteCourseGroup = (body) =>
  http.delete("/CourseGroup", { data: body });
export const getCourseTypes = () => http.get("/CourseType/GetCourseTypes");
export const getCourseLevels = () => http.get("/CourseLevel/GetAllCourseLevel");
export const getCourseUsers = (params = {}) =>
  http.get("/CourseUser/GetCourseUserList", { params });
export const getCourseUserId = (courseId) =>
  http.get("/CourseUser/GetCourseUserId", { params: { CourseId: courseId } });
export const getCourseUserIdAdmin = (params = {}) =>
  http.get("/CourseUser/GetCourseUserIdAdmin", { params });
export const getCourseAssistance = () => http.get("/CourseAssistance");
export const getCourseAssistanceById = (id) =>
  http.get(`/CourseAssistance/${encodeURIComponent(id)}`);
export const addCourseAssistance = (body) =>
  http.post("/CourseAssistance", body);
export const updateCourseAssistance = (body) =>
  http.put("/CourseAssistance", body);
export const getAssistanceWorks = () => http.get("/AssistanceWork");
export const getAssistanceWorkById = (id) =>
  http.get(`/AssistanceWork/${encodeURIComponent(id)}`);
export const addAssistanceWork = (body) => http.post("/AssistanceWork", body);
export const updateAssistanceWork = (body) => http.put("/AssistanceWork", body);
export const getCourseComments = (courseId) =>
  http.get(`/Course/GetCourseCommnets/${encodeURIComponent(courseId)}`);
export const getCourseCommentReplies = (courseId, commentId) =>
  http.get(
    `/Course/GetCourseReplyCommnets/${encodeURIComponent(courseId)}/${encodeURIComponent(commentId)}`,
  );
