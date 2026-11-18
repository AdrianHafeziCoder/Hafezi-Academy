import { academyApi } from "./academyApi";

// ===== Bans (Ban System) =====

export const previewBan = (data) => academyApi.postBanPreview({ data });

export const createBan = (data) => academyApi.postBanCreate({ data });

export const liftBan = (data) => academyApi.postBanLift({ data });

export const getBanCases = (params = {}) => academyApi.getBanCases({ params });

export const getBanIdentities = (params = {}) =>
  academyApi.getBanIdentities({ params });

export const getBanStats = (params = {}) => academyApi.getBanStats({ params });

export const getBanLookup = (params = {}) =>
  academyApi.getBanLookup({ params });
