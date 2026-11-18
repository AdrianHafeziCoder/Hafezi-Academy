import { academyApi } from "./academyApi";

// ===== News (News) =====

// params: { PageNumber, RowsOfPage, SortingCol, SortType, Query, IsActive }
export const getAdminNewsList = (params = {}) =>
  academyApi.getNewsAdminNewsFilterList({ params });

export const getNewsDetails = (id) =>
  academyApi.getNewsId({ path: { Id: id } });

// body: { title, describe, categoryId, ... }
export const createNews = (data) => academyApi.postNewsCreateNews({ data });

// body: { id, title, describe, categoryId, ... }
export const updateNews = (data) => academyApi.putNewsUpdateNews({ data });

// body: { id, active }
export const toggleNewsActive = (data) =>
  academyApi.putNewsActiveDeactiveNews({ data });

// ===== Categories =====
export const getNewsCategories = (params = {}) =>
  academyApi.getNewsGetListNewsCategory({ params });

// body: { categoryName, ... }
export const createNewsCategory = (data) =>
  academyApi.postNewsCreateNewsCategory({ data });

// ===== Comments =====
// params: { NewsId }
export const getAdminNewsComments = (params = {}) =>
  academyApi.getNewsGetAdminNewsComments({ params });

// body: { id, newsId, title, describe, accept }
export const updateNewsComment = (data) =>
  academyApi.putNewsUpdateNewsComment({ data });
