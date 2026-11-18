import { cn } from "../../lib/cn";

// Color for each status
const tones = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/15 text-amber-600",
  error: "border-error/30 bg-error/10 text-error",
  gray: "border-hairline bg-surface-2 text-muted-foreground",
};

export default function StatusBadge({ tone = "gray", children }) {
  return <span className={cn("chip", tones[tone])}>{children}</span>;
}
