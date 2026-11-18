// Page heading: page title + buttons next to it
export default function PageTitle({ title, subtitle, children }) {
  return (
    <div
      className="mb-6 flex flex-wrap items-center justify-between gap-3"
      data-reveal
    >
      <div>
        <h1 className="text-h2-md text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-body-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
