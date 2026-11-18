// ===== Token and roles storage =====
import { TOKEN_KEY } from "../config/settings";

const ROLES_KEY = "admin_roles";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRoles = () => {
  try {
    return JSON.parse(localStorage.getItem(ROLES_KEY) || "[]");
  } catch {
    return [];
  }
};

export function saveLogin({ token, roles = [] }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLES_KEY);
}

// ===== Token expiry =====
function isExpired(token) {
  try {
    const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(part)).exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export const isLoggedIn = () => {
  const token = getToken();
  return Boolean(token) && !isExpired(token);
};

// ===== Is the user a SuperAdmin? =====
export function isSuperAdmin() {
  const roles = getRoles();
  if (!Array.isArray(roles)) return false;

  // If the string itself was “SuperAdmin”
  if (typeof roles === "string") {
    return roles.toLowerCase().includes("superadmin");
  }

  return roles.some((r) => {
    const name =
      typeof r === "string"
        ? r
        : r?.name || r?.role || r?.title || r?.roleName || r?.Name || "";
    return String(name)
      .toLowerCase()
      .replace(/[_\s]/g, "")
      .includes("superadmin");
  });
}
