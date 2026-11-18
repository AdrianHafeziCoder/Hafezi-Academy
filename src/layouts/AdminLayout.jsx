import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useReveal } from "../hooks/useReveal";
import { isLoggedIn } from "../services/authStorage";
import { ADMIN_BASE } from "../config/settings";

//  Layout of all admin pages
export default function AdminLayout() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef(null);

  useReveal(pageRef, pathname); // Load and scroll animation
  useEffect(() => setMenuOpen(false), [pathname]); // Close the mobile menu when the page changes

  // If not logged in, go to the login page
  // TODO: the user role can also be checked here (Admin only) once the role structure is known
  if (!isLoggedIn()) return <Navigate to={`${ADMIN_BASE}/login`} replace />;

  return (
    <div dir="ltr" className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" dir="ltr" />
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:ms-64">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <main ref={pageRef} className="mx-auto max-w-7xl p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
