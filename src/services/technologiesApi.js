import { academyApi } from "./academyApi";

export const getTechnologies = (params = {}) =>
  academyApi.getTechnology({ params });

// body: { techName, parentId, describe, iconAddress }
export const createTechnology = (data) => academyApi.postTechnology({ data });

// body: { id, techName, parentId, describe, iconAddress }
export const updateTechnology = (data) => academyApi.putTechnology({ data });
