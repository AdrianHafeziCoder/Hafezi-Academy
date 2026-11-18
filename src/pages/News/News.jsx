import { useEffect, useState } from "react";
import * as yup from "yup";
import {
  Plus,
  Pencil,
  Eye,
  Newspaper,
  Power,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Layers,
} from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import Modal from "../../components/ui/Modal";
import StatusBadge from "../../components/ui/StatusBadge";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getAdminNewsList,
  getNewsDetails,
  createNews,
  updateNews,
  toggleNewsActive,
  getNewsCategories,
  createNewsCategory,
  getAdminNewsComments,
  updateNewsComment,
} from "../../services/newsApi";

// ===== Helpers =====
const nId = (n) => pick(n, ["id", "newsId", "Id"]);
const nTitle = (n) => pick(n, ["title", "newsTitle", "name"]) || "—";
const nActive = (n) =>
  pick(n, ["active", "isActive"]) === true ||
  pick(n, ["active", "isActive"]) === "true";
const nCategory = (n) => pick(n, ["categoryName", "categoryTitle"]) || "—";
const nDate = (n) => pick(n, ["insertDate", "createdAt", "date"]) || "—";

const catId = (c) => pick(c, ["id", "categoryId", "newsCategoryId", "Id"]);
const catName = (c) => pick(c, ["categoryName", "name", "title"]) || "—";

const comId = (c) => pick(c, ["id", "commentId", "Id"]);
const comTitle = (c) => pick(c, ["title", "subject"]) || "—";
const comDesc = (c) =>
  pick(c, ["describe", "description", "text", "comment"]) || "—";
const comAccepted = (c) =>
  pick(c, ["accept", "isAccepted", "accepted"]) === true;

// ===== Columns =====
const newsColumns = [
  {
    label: "News",
    render: (n) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
          <Newspaper size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground line-clamp-1">
            {nTitle(n)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            ID: {nId(n) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Category", render: (n) => nCategory(n) },
  {
    label: "Status",
    render: (n) => (
      <StatusBadge tone={nActive(n) ? "success" : "gray"}>
        {nActive(n) ? "Active" : "Inactive"}
      </StatusBadge>
    ),
  },
  { label: "Date", render: (n) => <span dir="ltr">{nDate(n)}</span> },
];

const categoryColumns = [
  {
    label: "Category",
    render: (c) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <Layers size={17} />
        </span>
        <p className="font-semibold text-foreground">{catName(c)}</p>
      </div>
    ),
  },
  { label: "ID", render: (c) => catId(c) ?? "—" },
];

const commentColumns = [
  {
    label: "Comment",
    render: (c) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-warning/15 text-amber-600">
          <MessageSquare size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground line-clamp-1">
            {comTitle(c)}
          </p>
          <p className="text-[11px] text-muted-foreground line-clamp-1">
            {comDesc(c)}
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Status",
    render: (c) =>
      comAccepted(c) ? (
        <StatusBadge tone="success">Approved</StatusBadge>
      ) : (
        <StatusBadge tone="warning">Pending</StatusBadge>
      ),
  },
];

// ===== Schemas =====
const newsSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  describe: yup.string().trim().required("Description is required"),
});
const categorySchema = yup.object({
  categoryName: yup.string().trim().required("Category name is required"),
});

const newsFields = [
  { name: "title", label: "News title" },
  { name: "describe", label: "Description", type: "textarea" },
];
const categoryFields = [{ name: "categoryName", label: "Category name" }];

const newsValuesFrom = (n = {}) => ({
  title: pick(n, ["title", "newsTitle"]) || "",
  describe: pick(n, ["describe", "description"]) || "",
});
const categoryValuesFrom = () => ({ categoryName: "" });

// ===== News details =====
function NewsDetails({ news, onClose }) {
  const [details, setDetails] = useState(news);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = nId(news);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getNewsDetails(id)
      .then((res) => setDetails(res.data?.data ?? res.data?.result ?? res.data))
      .catch((err) =>
        setError(err?.response?.data?.message || "Failed to load details"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const info = [
    ["Title", nTitle(details)],
    ["ID", id],
    ["Category", nCategory(details)],
    ["Status", nActive(details) ? "Active" : "Inactive"],
    ["Description", pick(details, ["describe", "description"])],
    ["Date", nDate(details)],
  ];

  return (
    <Modal title="News details" onClose={onClose}>
      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Loading…
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {info.map(([label, value]) => (
            <div
              key={label}
              className={`rounded-xl bg-surface-2 p-3 dark:bg-muted ${
                label === "Description" ? "sm:col-span-2" : ""
              }`}
            >
              <p className="mb-1 text-xs text-muted-foreground">{label}</p>
              <p className="break-words text-sm font-medium">
                {value === null || value === undefined || value === ""
                  ? "—"
                  : String(value)}
              </p>
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-error">{error}</p>}
    </Modal>
  );
}

// ===== Tabs =====
const TABS = [
  { key: "news", label: "News" },
  { key: "categories", label: "Categories" },
  { key: "comments", label: "Comments" },
];

export default function News() {
  const { key, refresh, act } = useRefresh();
  const [tab, setTab] = useState("news");

  // News
  const [creatingN, setCreatingN] = useState(false);
  const [editingN, setEditingN] = useState(null);
  const [viewingN, setViewingN] = useState(null);

  // Category
  const [creatingC, setCreatingC] = useState(false);

  // Comment
  const [viewingCom, setViewingCom] = useState(null);

  const saveNews = async (values) => {
    if (editingN) {
      await updateNews({ ...values, id: nId(editingN) });
    } else {
      await createNews(values);
    }
    refresh();
  };

  const saveCategory = async (values) => {
    await createNewsCategory(values);
    refresh();
  };

  const toggleActive = async (n) => {
    await act(
      () => toggleNewsActive({ id: nId(n), active: !nActive(n) }),
      "News status changed",
    );
  };

  const acceptComment = async (c, accept) => {
    await act(
      () =>
        updateNewsComment({
          id: comId(c),
          newsId: pick(c, ["newsId"]),
          title: comTitle(c),
          describe: comDesc(c),
          accept,
        }),
      accept ? "Comment approved" : "Comment rejected",
    );
  };

  return (
    <>
      <div className="mb-4 flex gap-2 border-b border-hairline" data-reveal>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-body-sm font-medium transition-colors ${
              tab === t.key
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "news" && (
        <ListPage
          key="news"
          title="News"
          subtitle="Manage academy news"
          fetcher={getAdminNewsList}
          paged={false}
          refreshKey={key}
          columns={newsColumns}
          toolbar={
            <Button onClick={() => setCreatingN(true)}>
              <Plus size={16} /> New news item
            </Button>
          }
          rowActions={(n) => (
            <>
              <RowAction
                icon={Eye}
                label="Details"
                onClick={() => setViewingN(n)}
              />
              <RowAction
                icon={Pencil}
                label="Edit"
                onClick={() => setEditingN(n)}
              />
              <RowAction
                icon={Power}
                label={nActive(n) ? "Inactive" : "Active"}
                onClick={() => toggleActive(n)}
              />
            </>
          )}
        />
      )}

      {tab === "categories" && (
        <ListPage
          key="categories"
          title="News categories"
          subtitle="Manage categories"
          fetcher={getNewsCategories}
          paged={false}
          refreshKey={key}
          columns={categoryColumns}
          toolbar={
            <Button onClick={() => setCreatingC(true)}>
              <Plus size={16} /> New category
            </Button>
          }
        />
      )}

      {tab === "comments" && (
        <ListPage
          key="comments"
          title="News comments"
          subtitle="Approve or reject user comments"
          fetcher={getAdminNewsComments}
          paged={false}
          refreshKey={key}
          columns={commentColumns}
          rowActions={(c) => (
            <>
              <RowAction
                icon={CheckCircle2}
                label="Approve"
                onClick={() => acceptComment(c, true)}
              />
              <RowAction
                icon={XCircle}
                label="Reject"
                danger
                onClick={() => acceptComment(c, false)}
              />
            </>
          )}
        />
      )}

      {/* News form */}
      {(creatingN || editingN) && (
        <FormModal
          title={creatingN ? "New news item" : "Edit news"}
          fields={newsFields}
          initialValues={
            creatingN ? newsValuesFrom() : newsValuesFrom(editingN)
          }
          schema={newsSchema}
          onSubmit={saveNews}
          onClose={() => {
            setCreatingN(false);
            setEditingN(null);
          }}
          successText={creatingN ? "News created" : "News updated"}
        />
      )}

      {/* Category form */}
      {creatingC && (
        <FormModal
          title="New category"
          fields={categoryFields}
          initialValues={categoryValuesFrom()}
          schema={categorySchema}
          onSubmit={saveCategory}
          onClose={() => setCreatingC(false)}
          successText="Category created"
        />
      )}

      {/* News details */}
      {viewingN && (
        <NewsDetails news={viewingN} onClose={() => setViewingN(null)} />
      )}
    </>
  );
}
