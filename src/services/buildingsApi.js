import { academyApi } from "./academyApi";

// ===== Buildings (Building) =====

export const getBuildings = (params = {}) => academyApi.getBuilding({ params });

export const getBuildingDetails = (id) =>
  academyApi.getBuildingId({ path: { Id: id } });

// body: { id, buildingName, floor, latitude, longitude }
export const createBuilding = (data) => academyApi.postBuilding({ data });

// body: { id, buildingName, floor, latitude, longitude, active }
export const updateBuilding = (data) => academyApi.putBuilding({ data });

// body: { active, id }
export const toggleBuildingActive = (data) =>
  academyApi.putBuildingActive({ data });
