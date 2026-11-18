import { academyApi } from "./academyApi";

// ===== Sessions and attendance (Session) =====
// params: { SessionId }
export const getSessionDetail = (params) =>
  academyApi.getSessionSessionDetail({ params });

// params: { SessionId }
export const getSessionHomeWork = (params) =>
  academyApi.getSessionGetSessionHomeWork({ params });

// body: { sessionId, present, studentHand, absentReason }
export const markStudentAttendance = (data) =>
  academyApi.postSessionStudentAP({ data });

// body: { sessionId, hwTitle, hwDescribe }
export const addSessionHomeWork = (data) =>
  academyApi.postSessionAddSessionHomeWork({ data });
