// ===== API data helpers =====
import { ROWS_PER_PAGE } from "../config/settings";

// First available value from several possible field names
export const pick = (row, keys) => {
  for (const key of keys)
    if (row?.[key] !== undefined && row?.[key] !== null) return row[key];
  return undefined;
};

// Name of the list array in each section's response (added as later pages are built)
const listKeys = ["courseDtos", "listUser"];

// Convert the server response to { rows, total }
export function normalizeList(data) {
  if (Array.isArray(data)) return { rows: data, total: data.length };
  const box = data?.data ?? data?.result ?? data ?? {};
  if (Array.isArray(box))
    return { rows: box, total: data?.totalCount ?? box.length };
  const arrayKey =
    listKeys.find((k) => Array.isArray(box[k])) ??
    Object.keys(box).find((k) => Array.isArray(box[k]));
  const rows = arrayKey ? box[arrayKey] : [];
  const total = box.totalCount ?? box.total ?? box.totalRecords ?? rows.length;
  return { rows, total };
}

// Remove empty parameters
const clean = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== "",
    ),
  );

// Pagination parameters for most sections
export function pageParams({
  page = 1,
  rows = ROWS_PER_PAGE,
  sort,
  query,
  ...rest
}) {
  return clean({
    PageNumber: page,
    RowsOfPage: rows,
    SortingCol: sort?.col,
    SortType: sort?.col ? sort.type : undefined, // Without a sort column, don't send its type
    Query: query,
    ...rest,
  });
}

// Parameters for tickets (pageName: "pageNumber") and tournaments (pageName: "page")
export function smallPageParams({
  page = 1,
  rows = ROWS_PER_PAGE,
  query,
  pageName = "page",
  ...rest
}) {
  return clean({ [pageName]: page, perPage: rows, query, ...rest });
}

// Error text to show to the user
export function errorText(err) {
  const d = err?.response?.data;
  return (
    d?.message ||
    d?.title ||
    (typeof d === "string" ? d : "") ||
    err?.message ||
    "Unknown error"
  );
}
