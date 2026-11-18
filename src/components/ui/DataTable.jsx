import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { pick } from "../../lib/apiData";

// ===== Reusable table =====
// columns = [{ label, keys:["field1","field2"], sortKey, render(row) }]
// actions(row) = buttons at the end of each row
export default function DataTable({
  columns,
  rows,
  loading,
  sort,
  onSort,
  actions,
}) {
  const sortIcon = (key) => {
    if (sort?.col !== key) return <ArrowUpDown size={13} />;
    return sort.type === "ASC" ? (
      <ArrowUp size={13} />
    ) : (
      <ArrowDown size={13} />
    );
  };
  const colCount = columns.length + (actions ? 1 : 0);

  return (
    <div
      className="overflow-x-auto rounded-2xl border border-hairline bg-card"
      data-reveal
    >
      <table className="w-full min-w-[680px] border-collapse">
        <thead className="bg-surface-2 dark:bg-muted">
          <tr className="h-11">
            {columns.map((col) => (
              <th key={col.label} className="th">
                {col.sortKey && onSort ? (
                  <button
                    className="inline-flex items-center gap-1 hover:text-primary"
                    onClick={() => onSort(col.sortKey)}
                  >
                    {col.label}
                    {sortIcon(col.sortKey)}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
            {actions && <th className="th">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {/* Loading state */}
          {loading &&
            Array.from({ length: 6 }, (_, i) => (
              <tr key={i} className="h-12 border-t border-hairline">
                <td colSpan={colCount} className="px-3">
                  <div className="h-4 animate-pulse rounded bg-surface-2" />
                </td>
              </tr>
            ))}
          {/* Empty state */}
          {!loading && rows.length === 0 && (
            <tr>
              <td
                colSpan={colCount}
                className="h-24 text-center text-body-sm text-muted-foreground"
              >
                No results found
              </td>
            </tr>
          )}
          {/* Rows */}
          {!loading &&
            rows.map((row, index) => (
              <tr
                key={row.id ?? row.courseId ?? index}
                className="h-12 border-t border-hairline hover:bg-surface-2/60 dark:hover:bg-muted"
              >
                {columns.map((col) => (
                  <td key={col.label} className="td">
                    {col.render
                      ? col.render(row)
                      : (pick(row, col.keys ?? []) ?? "-")}
                  </td>
                ))}
                {actions && (
                  <td className="td">
                    <div className="flex gap-1.5">{actions(row)}</div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
