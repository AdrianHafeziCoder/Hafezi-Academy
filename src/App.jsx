import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import { ADMIN_BASE } from "./config/settings";

// ===== Root routes =====
// All panel pages live under /admin; the site root redirects there
export default function App() {
  return (
    <Routes>
      <Route path={`${ADMIN_BASE}/*`} element={<AdminRoutes />} />
      <Route path="*" element={<Navigate to={ADMIN_BASE} replace />} />
    </Routes>
  );
}
