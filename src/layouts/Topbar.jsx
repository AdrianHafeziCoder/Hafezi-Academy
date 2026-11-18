import { useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, LogOut } from "lucide-react";
import { clearToken } from "../services/authStorage";
import { useDarkMode } from "../hooks/useDarkMode";
import { ADMIN_BASE } from "../config/settings";

//  Top bar
export default function Topbar({ onMenu }) {
  const navigate = useNavigate();
  const [dark, toggleDark] = useDarkMode();

  const logout = () => {
    clearToken();
    navigate(`${ADMIN_BASE}/login`);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-hairline bg-background/80 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          className="icon-btn size-10 lg:hidden"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <span className="text-body-sm text-muted-foreground">
          Academy Admin Panel
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* TODO: show the admin's name and photo from GET /SharePanel/GetProfileInfo (its fields were not specified in Swagger) */}
        <button
          className="icon-btn size-10"
          onClick={toggleDark}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          className="icon-btn size-10 hover:text-error"
          onClick={logout}
          aria-label="Log out"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
