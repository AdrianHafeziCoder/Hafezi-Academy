// ===== Formatting helpers =====
import { format } from "date-fns-jalali";

// Display Jalali (Persian calendar) date
export function jalaliDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "-" : format(d, "yyyy/MM/dd");
}

// Display price
export const money = (n) =>
  n === undefined || n === null
    ? "-"
    : `${Number(n).toLocaleString("fa-IR")} Toman`;

// Date for input of type date (yyyy-MM-dd only)
export const dateInput = (value) => (value ? String(value).slice(0, 10) : "");

// Convert input date to ISO format to send to the server
export const toIso = (value) => (value ? new Date(value).toISOString() : null);
