import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import PageTitle from "./PageTitle";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { useListData } from "../../hooks/useListData";
import { ROWS_PER_PAGE } from "../../config/settings";

//  One page template for every list
export default function ListPage({
  title,
  subtitle,
  fetcher,
  columns,
  rowActions,
  toolbar,
  extraParams,
  refreshKey = 0,
  paged = true,
}) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ col: "", type: "ASC" });
  const [text, setText] = useState("");
  const query = useDebounce(text);
  const extraKey = JSON.stringify(extraParams ?? {});

  // When the search or filter changes, go back to the first page
  useEffect(() => setPage(1), [query, extraKey]);

  const params = paged ? { page, sort, query, ...extraParams } : {};
  const { rows, total, loading, error } = useListData(
    fetcher,
    params,
    refreshKey,
  );

  // In-browser search for lists without pagination
  const shownRows =
    paged || !text
      ? rows
      : rows.filter((r) =>
          JSON.stringify(r).toLowerCase().includes(text.toLowerCase()),
        );

  // Click on a column header: ascending first, then descending
  const changeSort = (col) =>
    setSort((old) => ({
      col,
      type: old.col === col && old.type === "ASC" ? "DESC" : "ASC",
    }));

  return (
    <>
      <PageTitle title={title} subtitle={subtitle}>
        {toolbar}
      </PageTitle>

      <div className="relative mb-4 w-full max-w-sm" data-reveal>
        <Search
          size={16}
          className="absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          className="field ps-10"
          placeholder="Search…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Search"
        />
      </div>

      {error && (
        <p
          className="mb-4 rounded-2xl bg-error/10 px-4 py-3 text-body-sm text-error"
          role="alert"
        >
          {error}
        </p>
      )}

      <DataTable
        columns={columns}
        rows={shownRows}
        loading={loading}
        sort={paged ? sort : undefined}
        onSort={paged ? changeSort : undefined}
        actions={rowActions}
      />
      {paged && (
        <Pagination
          page={page}
          total={total}
          pageSize={ROWS_PER_PAGE}
          onChange={setPage}
        />
      )}
    </>
  );
}
