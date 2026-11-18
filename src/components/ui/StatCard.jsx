import { Link } from "react-router-dom";

// Dashboard stat card (links to the related page)
export default function StatCard({ label, value, icon: Icon, to }) {
  return (
    <Link
      to={to}
      data-reveal
      className="card flex items-center gap-4 bg-card p-5 transition-shadow hover:shadow-hafezi-card"
    >
      <span className="grid size-12 place-items-center rounded-full bg-primary-light text-primary">
        <Icon size={22} />
      </span>
      <span>
        <span className="block text-body-sm text-muted-foreground">
          {label}
        </span>
        <span className="block text-h2-md font-bold text-foreground">
          {value === null ? (
            <span className="inline-block h-6 w-12 animate-pulse rounded bg-surface-2" />
          ) : (
            value
          )}
        </span>
      </span>
    </Link>
  );
}
