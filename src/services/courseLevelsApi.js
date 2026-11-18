import { academyApi } from "./academyApi";

// ===== Course level (CourseLevel) =====
export const getCourseLevels = (params = {}) =>
  academyApi.getCourselevelGetAllCourseLevel({ params });

// body: { id, levelName }
export const createCourseLevel = (data) => academyApi.postCourselevel({ data });

// ===== Course type (CourseType) — read-only =====
export const getCourseTypes = (params = {}) =>
  academyApi.getCoursetypeGetCourseTypes({ params });
