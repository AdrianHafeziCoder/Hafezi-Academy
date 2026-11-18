// ===== Admin settings =====
// API URL (if you set VITE_ADMIN_API_URL in the .env file, that value is used)
export const API_URL =
  import.meta.env.VITE_ADMIN_API_URL || "https://fe-api.hexorix.net";
export const ADMIN_BASE = "/admin"; // Base path of the panel on the site
export const ROWS_PER_PAGE = 10; // Number of rows per table page
export const TOKEN_KEY = "admin_token"; // Name of the token storage key
