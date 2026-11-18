import { useState } from "react";
import * as yup from "yup";
import { Plus, Pencil, UserCheck, ClipboardList } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getAssistances,
  createAssistance,
  updateAssistance,
  getAssistanceWorks,
  createAssistanceWork,
  updateAssistanceWork,
} from "../../services/assistantsApi";

const aId = (a) => pick(a, ["id", "assistanceId", "Id"]);
const aCourse = (a) =>
  pick(a, ["courseName", "courseTitle", "courseId"]) || "—";
const aUser = (a) => pick(a, ["userName", "fullName", "userId", "name"]) || "—";

const wId = (w) => pick(w, ["id", "workId", "Id"]);
const wTitle = (w) => pick(w, ["worktitle", "title", "workTitle"]) || "—";
const wDesc = (w) =>
  pick(w, ["workDescribe", "describe", "description"]) || "—";
const wDate = (w) => pick(w, ["workDate", "date", "createdAt"]) || "—";

const assistanceColumns = [
  {
    label: "Assistant",
    render: (a) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <UserCheck size={17} />
        </span>
        <div>
          <p className="font-semibold text-foreground">{aUser(a)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {aId(a) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Course", render: (a) => aCourse(a) },
];

const workColumns = [
  {
    label: "Task",
    render: (w) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
          <ClipboardList size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{wTitle(w)}</p>
          <p className="text-[11px] text-muted-foreground line-clamp-1">
            {wDesc(w)}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Date", render: (w) => <span dir="ltr">{wDate(w)}</span> },
];

const assistanceSchema = yup.object({
  courseId: yup.string().trim().required("Course ID is required"),
  userId: yup.string().trim().required("User ID is required"),
});

const workSchema = yup.object({
  worktitle: yup.string().trim().required("Task title is required"),
  workDescribe: yup.string().trim().required("Description is required"),
  assistanceId: yup.string().trim().required("Assistant ID is required"),
  workDate: yup.string().trim().required("Date is required"),
});

const assistanceFields = [
  { name: "courseId", label: "Course ID" },
  { name: "userId", label: "User ID" },
];
const workFields = [
  { name: "worktitle", label: "Task title" },
  { name: "workDescribe", label: "Description", type: "textarea" },
  { name: "assistanceId", label: "Assistant ID" },
  { name: "workDate", label: "Date", type: "date" },
];

const assistValues = () => ({ courseId: "", userId: "" });
const workValues = () => ({
  worktitle: "",
  workDescribe: "",
  assistanceId: "",
  workDate: "",
});

const TABS = [
  { key: "assistants", label: "Course Assistants" },
  { key: "works", label: "Assistant Tasks" },
];

export default function Assistants() {
  const { key, refresh } = useRefresh();
  const [tab, setTab] = useState("assistants");
  const [creatingA, setCreatingA] = useState(false);
  const [editingA, setEditingA] = useState(null);
  const [creatingW, setCreatingW] = useState(false);
  const [editingW, setEditingW] = useState(null);

  const saveA = async (values) => {
    if (editingA) {
      await updateAssistance({ ...values, id: aId(editingA) });
    } else {
      await createAssistance(values);
    }
    refresh();
  };

  const saveW = async (values) => {
    if (editingW) {
      await updateAssistanceWork({ ...values, id: wId(editingW) });
    } else {
      await createAssistanceWork(values);
    }
    refresh();
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

      {tab === "assistants" && (
        <ListPage
          key="assistants"
          title="Course Assistants"
          subtitle="Manage course assistants"
          fetcher={getAssistances}
          paged={false}
          refreshKey={key}
          columns={assistanceColumns}
          toolbar={
            <Button onClick={() => setCreatingA(true)}>
              <Plus size={16} /> New assistant
            </Button>
          }
          rowActions={(a) => (
            <RowAction
              icon={Pencil}
              label="Edit"
              onClick={() => setEditingA(a)}
            />
          )}
        />
      )}

      {tab === "works" && (
        <ListPage
          key="works"
          title="Assistant Tasks"
          subtitle="Manage tasks assigned to assistants"
          fetcher={getAssistanceWorks}
          paged={false}
          refreshKey={key}
          columns={workColumns}
          toolbar={
            <Button onClick={() => setCreatingW(true)}>
              <Plus size={16} /> New task
            </Button>
          }
          rowActions={(w) => (
            <RowAction
              icon={Pencil}
              label="Edit"
              onClick={() => setEditingW(w)}
            />
          )}
        />
      )}

      {(creatingA || editingA) && (
        <FormModal
          title={creatingA ? "New assistant" : "Edit assistant"}
          fields={assistanceFields}
          initialValues={
            creatingA
              ? assistValues()
              : {
                  courseId: pick(editingA, ["courseId"]) || "",
                  userId: pick(editingA, ["userId"]) || "",
                }
          }
          schema={assistanceSchema}
          onSubmit={saveA}
          onClose={() => {
            setCreatingA(false);
            setEditingA(null);
          }}
          successText={creatingA ? "Assistant added" : "Assistant updated"}
        />
      )}

      {(creatingW || editingW) && (
        <FormModal
          title={creatingW ? "New task" : "Edit task"}
          fields={workFields}
          initialValues={
            creatingW
              ? workValues()
              : {
                  worktitle: wTitle(editingW),
                  workDescribe: wDesc(editingW),
                  assistanceId: pick(editingW, ["assistanceId"]) || "",
                  workDate: pick(editingW, ["workDate"]) || "",
                }
          }
          schema={workSchema}
          onSubmit={saveW}
          onClose={() => {
            setCreatingW(false);
            setEditingW(null);
          }}
          successText={creatingW ? "Task created" : "Task updated"}
        />
      )}
    </>
  );
}
