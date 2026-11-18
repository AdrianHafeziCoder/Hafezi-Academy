import { useState } from "react";
import * as yup from "yup";
import { Plus, SlidersHorizontal, Layers } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getCourseLevels,
  createCourseLevel,
  getCourseTypes,
} from "../../services/courseLevelsApi";

const levelId = (l) => pick(l, ["id", "levelId", "Id"]);
const levelName = (l) => pick(l, ["levelName", "name", "title"]) || "—";

const typeId = (t) => pick(t, ["id", "typeId", "Id"]);
const typeName = (t) => pick(t, ["typeName", "name", "title"]) || "—";

const levelColumns = [
  {
    label: "Level",
    render: (l) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <SlidersHorizontal size={17} />
        </span>
        <div>
          <p className="font-semibold text-foreground">{levelName(l)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {levelId(l) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
];

const typeColumns = [
  {
    label: "Course type",
    render: (t) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
          <Layers size={17} />
        </span>
        <div>
          <p className="font-semibold text-foreground">{typeName(t)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {typeId(t) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
];

const levelSchema = yup.object({
  levelName: yup.string().trim().required("Level name is required"),
});

const levelFields = [{ name: "levelName", label: "Level name" }];
const levelValues = () => ({ levelName: "" });

const TABS = [
  { key: "levels", label: "Course levels" },
  { key: "types", label: "Course type (read-only)" },
];

export default function CourseLevels() {
  const { key, refresh } = useRefresh();
  const [tab, setTab] = useState("levels");
  const [creating, setCreating] = useState(false);

  const save = async (values) => {
    await createCourseLevel({ levelName: values.levelName });
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

      {tab === "levels" && (
        <ListPage
          key="levels"
          title="Course levels"
          subtitle="Manage course levels"
          fetcher={getCourseLevels}
          paged={false}
          refreshKey={key}
          columns={levelColumns}
          toolbar={
            <Button onClick={() => setCreating(true)}>
              <Plus size={16} /> New level
            </Button>
          }
        />
      )}

      {tab === "types" && (
        <ListPage
          key="types"
          title="Course type"
          subtitle="Course types (read-only)"
          fetcher={getCourseTypes}
          paged={false}
          refreshKey={key}
          columns={typeColumns}
        />
      )}

      {creating && (
        <FormModal
          title="New level"
          fields={levelFields}
          initialValues={levelValues()}
          schema={levelSchema}
          onSubmit={save}
          onClose={() => setCreating(false)}
          successText="Level created"
        />
      )}
    </>
  );
}
