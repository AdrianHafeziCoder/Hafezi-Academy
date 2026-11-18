import { useState } from "react";
import * as yup from "yup";
import { Plus, Pencil, Flag } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getStatuses,
  createStatus,
  updateStatus,
} from "../../services/statusesApi";

const sId = (s) => pick(s, ["id", "statusId", "Id"]);
const sName = (s) => pick(s, ["statusName", "name"]) || "—";
const sDesc = (s) => pick(s, ["describe", "description"]) || "—";
const sNumber = (s) => pick(s, ["statusNumber", "number"]) ?? "—";

const columns = [
  {
    label: "Status",
    render: (s) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-warning/15 text-amber-600">
          <Flag size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{sName(s)}</p>
          <p className="text-[11px] text-muted-foreground line-clamp-1">
            {sDesc(s)}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Number", render: (s) => String(sNumber(s)) },
];

const schema = yup.object({
  statusName: yup.string().trim().required("Status name is required"),
  describe: yup.string().trim().nullable(),
  statusNumber: yup.number().min(0).required("Status number is required"),
});

const fields = [
  { name: "statusName", label: "Status name" },
  { name: "describe", label: "Description", type: "textarea" },
  { name: "statusNumber", label: "Number", type: "number" },
];

const valuesFrom = (s = {}) => ({
  statusName: pick(s, ["statusName", "name"]) || "",
  describe: pick(s, ["describe", "description"]) || "",
  statusNumber: pick(s, ["statusNumber", "number"]) ?? "",
});

export default function Statuses() {
  const { key, refresh } = useRefresh();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);

  const save = async (values) => {
    const body = {
      statusName: values.statusName,
      describe: values.describe || "",
      statusNumber: Number(values.statusNumber),
    };
    if (editing) {
      await updateStatus({ ...body, id: sId(editing) });
    } else {
      await createStatus(body);
    }
    refresh();
  };

  return (
    <>
      <ListPage
        title="Statuses"
        subtitle="Manage system statuses"
        fetcher={getStatuses}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setCreating(true)}>
            <Plus size={16} /> New status
          </Button>
        }
        rowActions={(s) => (
          <RowAction
            icon={Pencil}
            label="Edit"
            onClick={() => setEditing(s)}
          />
        )}
      />

      {(creating || editing) && (
        <FormModal
          title={creating ? "New status" : "Edit status"}
          fields={fields}
          initialValues={creating ? valuesFrom() : valuesFrom(editing)}
          schema={schema}
          onSubmit={save}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          successText={creating ? "Status created" : "Status updated"}
        />
      )}
    </>
  );
}
