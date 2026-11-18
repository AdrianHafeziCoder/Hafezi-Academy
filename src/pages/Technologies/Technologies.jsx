import { useState } from "react";
import * as yup from "yup";
import { Plus, Pencil, Cpu } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getTechnologies,
  createTechnology,
  updateTechnology,
} from "../../services/technologiesApi";

const tId = (t) => pick(t, ["id", "techId", "technologyId", "Id"]);
const tName = (t) => pick(t, ["techName", "name", "title"]) || "—";
const tDesc = (t) => pick(t, ["describe", "description"]) || "—";
const tParent = (t) => pick(t, ["parentId", "parent"]) ?? "—";

const columns = [
  {
    label: "Technology",
    render: (t) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <Cpu size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{tName(t)}</p>
          <p className="text-[11px] text-muted-foreground line-clamp-1">
            {tDesc(t)}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Parent", render: (t) => tParent(t) },
];

const schema = yup.object({
  techName: yup.string().trim().required("Technology name is required"),
  describe: yup.string().trim().nullable(),
  parentId: yup.number().nullable(),
  iconAddress: yup.string().trim().nullable(),
});

const fields = [
  { name: "techName", label: "Technology name" },
  { name: "describe", label: "Description", type: "textarea" },
  { name: "parentId", label: "Parent ID (optional)", type: "number" },
  { name: "iconAddress", label: "Icon URL" },
];

const valuesFrom = (t = {}) => ({
  techName: pick(t, ["techName", "name"]) || "",
  describe: pick(t, ["describe", "description"]) || "",
  parentId: pick(t, ["parentId", "parent"]) ?? "",
  iconAddress: pick(t, ["iconAddress", "icon"]) || "",
});

export default function Technologies() {
  const { key, refresh } = useRefresh();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);

  const save = async (values) => {
    const body = {
      techName: values.techName,
      describe: values.describe || "",
      parentId: values.parentId ? Number(values.parentId) : null,
      iconAddress: values.iconAddress || "",
    };
    if (editing) {
      await updateTechnology({ ...body, id: tId(editing) });
    } else {
      await createTechnology(body);
    }
    refresh();
  };

  return (
    <>
      <ListPage
        title="Technologies"
        subtitle="Manage academy technologies"
        fetcher={getTechnologies}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setCreating(true)}>
            <Plus size={16} /> New technology
          </Button>
        }
        rowActions={(t) => (
          <RowAction
            icon={Pencil}
            label="Edit"
            onClick={() => setEditing(t)}
          />
        )}
      />

      {(creating || editing) && (
        <FormModal
          title={creating ? "New technology" : "Edit technology"}
          fields={fields}
          initialValues={creating ? valuesFrom() : valuesFrom(editing)}
          schema={schema}
          onSubmit={save}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          successText={creating ? "Technology created" : "Technology updated"}
        />
      )}
    </>
  );
}
