// Panel logo
export default function Logo({ size = 40 }) {
  return (
    <span
      className="grid place-items-center rounded-2xl bg-primary font-heading font-bold leading-none text-white"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.62) }}
    >
      H
    </span>
  );
}
