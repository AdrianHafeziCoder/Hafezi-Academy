import { useRef, useLayoutEffect } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { menuGroups } from "../config/menu";
import { ADMIN_BASE } from "../config/settings";
import { cn } from "../lib/cn";
import Logo from "../components/ui/Logo";

//  Sidebar
export default function Sidebar({ open, onClose }) {
  const box = useRef(null);

  // Menu entrance animation on load (once)
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-menu-group]", {
        opacity: 0,
        x: -24,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      });
    }, box);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Dark overlay behind the menu on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        ref={box}
        className={cn(
          "fixed inset-y-0 start-0 z-40 flex w-64 flex-col border-e border-hairline bg-sidebar transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center gap-2 px-5">
          <Logo size={32} />
          <span className="font-heading text-xl font-bold text-primary">
            Hafezi Academy
          </span>
        </div>

        <nav
          className="sidebar-scroll flex-1 space-y-5 overflow-y-auto px-3 pb-6"
          aria-label="Admin menu"
        >
          {" "}
          {menuGroups.map((group) => (
            <div key={group.title} data-menu-group>
              <p className="mb-1.5 px-3 text-caption font-bold text-muted-foreground">
                {group.title}
              </p>
              {group.items.map(({ label, path, icon: Icon, ready }) => (
                <NavLink
                  key={path || "home"}
                  to={`${ADMIN_BASE}/${path}`}
                  end={path === ""}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn("nav-item h-10", isActive && "nav-item-active")
                  }
                >
                  <Icon size={17} />
                  <span className="flex-1">{label}</span>
                  {!ready && (
                    <span
                      className="size-1.5 rounded-full bg-hafezi-gray-400"
                      title="Coming soon"
                    />
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
