import { cn } from "../../lib/cn";

// Small icon button inside a table row
export default function RowAction({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "icon-btn size-8",
        danger && "hover:border-error/30 hover:bg-error/10 hover:text-error",
      )}
    >
      <Icon size={15} />
    </button>
  );
}
