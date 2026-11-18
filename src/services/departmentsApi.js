import { academyApi } from "./academyApi";

// ===== Departments (Department) =====

export const getDepartments = (params = {}) =>
  academyApi.getDepartment({ params });

export const getDepartmentDetails = (id) =>
  academyApi.getDepartmentId({ path: { Id: id } });

// body: { id, depName, buildingId }
export const createDepartment = (data) => academyApi.postDepartment({ data });

// body: { id, depName, buildingId }
export const updateDepartment = (data) => academyApi.putDepartment({ data });
