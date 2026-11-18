import { academyApi } from "./academyApi";

export const getSocialGroups = (params = {}) =>
  academyApi.getCoursesocialgroup({ params });

export const getSocialGroup = (id) =>
  academyApi.getCoursesocialgroupId({ path: { Id: id } });

// body: { groupName, groupLink, courseId }
export const createSocialGroup = (data) =>
  academyApi.postCoursesocialgroup({ data });
