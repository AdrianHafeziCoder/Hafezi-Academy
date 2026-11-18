import { academyApi } from "./academyApi";

// ===== Course assistants (CourseAssistance) =====
export const getAssistances = (params = {}) =>
  academyApi.getCourseassistance({ params });

export const getAssistanceDetails = (id) =>
  academyApi.getCourseassistanceId({ path: { Id: id } });

// body: { courseId, userId }
export const createAssistance = (data) =>
  academyApi.postCourseassistance({ data });

// body: { courseId, userId, id }
export const updateAssistance = (data) =>
  academyApi.putCourseassistance({ data });

// ===== Assistant tasks (AssistanceWork) =====
export const getAssistanceWorks = (params = {}) =>
  academyApi.getAssistancework({ params });

// body: { worktitle, workDescribe, assistanceId, workDate }
export const createAssistanceWork = (data) =>
  academyApi.postAssistancework({ data });

// body: { worktitle, workDescribe, assistanceId, workDate, id }
export const updateAssistanceWork = (data) =>
  academyApi.putAssistancework({ data });
