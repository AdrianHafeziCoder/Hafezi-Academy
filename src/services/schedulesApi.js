import { academyApi } from "./academyApi";

// ===== Schedule (Schedual) =====
// params: { startDate, endDate }
export const getAdminSchedules = (params = {}) =>
  academyApi.getSchedualGetAdminScheduals({ params });

// body: { courseGroupId, startDate, startTime, endTime, weekNumber, rowEffect }
// params: { currentCurseId }
export const createSchedule = (params, data) =>
  academyApi.postSchedualAddSchedualSingle({ params, data });

// body: { active, id }
export const toggleLockToRiase = (data) =>
  academyApi.putSchedualLockToRiase({ data });
