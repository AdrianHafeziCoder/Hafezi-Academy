import { academyApi } from "./academyApi";

// ===== Payments (CoursePayment) =====
// params: { CourseId }
export const getCoursePayments = (params = {}) =>
  academyApi.getCoursepayment({ params });

export const getPaymentDetails = (id) =>
  academyApi.getCoursepaymentId({ path: { Id: id } });

// params: { CourseId, StudentId }
export const getUserPayList = (params = {}) =>
  academyApi.getCoursepaymentUserPayList({ params });

// params: { CourseId }
export const getStudentUserPayList = (params = {}) =>
  academyApi.getCoursepaymentStudentUserPayList({ params });

// params: { CourseId }
export const getListOfWhoIsPay = (params = {}) =>
  academyApi.getCoursepaymentListOfWhoIsPay({ params });
