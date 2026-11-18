import { useEffect, useState } from "react";
import * as yup from "yup";
import { Plus, Users, Eye } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import Modal from "../../components/ui/Modal";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getSocialGroups,
  getSocialGroup,
  createSocialGroup,
} from "../../services/communityApi";

const groupId = (g) => pick(g, ["id", "courseSocialGroupId", "groupId", "Id"]);
const groupTitle = (g) => pick(g, ["groupName", "title", "name"]) || "—";
const groupCourse = (g) =>
  pick(g, ["courseName", "courseTitle", "courseId"]) || "—";
const groupLink = (g) => pick(g, ["groupLink", "link", "url"]) || "—";

const columns = [
  {
    label: "Group",
    render: (g) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <Users size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{groupTitle(g)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {groupId(g) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Course", render: (g) => groupCourse(g) },
  {
    label: "Link",
    render: (g) => (
      <a
        href={groupLink(g)}
        target="_blank"
        rel="noreferrer"
        dir="ltr"
        className="text-primary hover:underline line-clamp-1"
      >
        {groupLink(g)}
      </a>
    ),
  },
];

const makeSchema = () =>
  yup.object({
    groupName: yup.string().trim().required("Group name is required"),
    courseId: yup.string().trim().required("Course ID is required"),
    groupLink: yup
      .string()
      .trim()
      .url("Invalid link")
      .required("Link is required"),
  });

const fields = [
  { name: "groupName", label: "Group name" },
  { name: "courseId", label: "Course ID" },
  { name: "groupLink", label: "Group link" },
];

const valuesFrom = () => ({ groupName: "", courseId: "", groupLink: "" });

function GroupDetails({ group, onClose }) {
  const [details, setDetails] = useState(group);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = groupId(group);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSocialGroup(id)
      .then((res) => setDetails(res.data?.data ?? res.data?.result ?? res.data))
      .catch((err) =>
        setError(err?.response?.data?.message || "Failed to load details"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const info = [
    ["Group name", groupTitle(details)],
    ["ID", id],
    ["Course", groupCourse(details)],
    ["Link", groupLink(details)],
  ];

  return (
    <Modal title="Group details" onClose={onClose}>
      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Loading…
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {info.map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl bg-surface-2 p-3 dark:bg-muted"
            >
              <p className="mb-1 text-xs text-muted-foreground">{label}</p>
              <p className="break-words text-sm font-medium">{value || "—"}</p>
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-error">{error}</p>}
    </Modal>
  );
}

export default function Community() {
  const { key, refresh } = useRefresh();
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState(null);

  const save = async (values) => {
    await createSocialGroup(values);
    refresh();
  };

  return (
    <>
      <ListPage
        title="Course Community Groups"
        subtitle="Manage social groups linked to courses"
        fetcher={getSocialGroups}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setCreating(true)}>
            <Plus size={16} /> New group
          </Button>
        }
        rowActions={(g) => (
          <RowAction
            icon={Eye}
            label="View details"
            onClick={() => setViewing(g)}
          />
        )}
      />

      {creating && (
        <FormModal
          title="New social group"
          fields={fields}
          initialValues={valuesFrom()}
          schema={makeSchema()}
          onSubmit={save}
          onClose={() => setCreating(false)}
          successText="Group created"
        />
      )}

      {viewing && (
        <GroupDetails group={viewing} onClose={() => setViewing(null)} />
      )}
    </>
  );
}
