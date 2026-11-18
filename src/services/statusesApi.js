import { academyApi } from "./academyApi";

export const getStatuses = (params = {}) => academyApi.getStatus({ params });

// body: { statusName, describe, statusNumber }
export const createStatus = (data) => academyApi.postStatus({ data });

// body: { statusName, describe, statusNumber, id }
export const updateStatus = (data) => academyApi.putStatus({ data });
