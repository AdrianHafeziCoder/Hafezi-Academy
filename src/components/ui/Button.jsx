import { cn } from "../../lib/cn";

const looks = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  soft: "bg-primary-light text-primary-dark hover:bg-brand-100",
  ghost: "border border-hairline hover:bg-surface-2",
  danger: "bg-error text-white hover:opacity-90", // Delete button
};
const sizes = { normal: "h-10 px-5 text-sm", small: "h-8 px-3 text-xs" };

export default function Button({
  look = "primary",
  size = "normal",
  sending,
  className,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={sending} // While the request is in flight, the button is locked
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60",
        looks[look],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
