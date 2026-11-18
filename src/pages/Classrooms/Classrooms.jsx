import { useEffect, useState } from "react";
import * as yup from "yup";
import { Plus, Pencil, Eye, DoorOpen, Users } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import Modal from "../../components/ui/Modal";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getClassrooms,
  getClassroomDetails,
  createClassroom,
  updateClassroom,
} from "../../services/classroomsApi";

const cId = (c) => pick(c, ["id", "classroomId", "classRoomId", "Id"]);
const cName = (c) => pick(c, ["classRoomName", "name", "roomName"]) || "—";
const cCapacity = (c) => pick(c, ["capacity"]) ?? "—";

// Extract the building name from a nested object or string
const cBuildingName = (c) => {
  const b = c?.building;
  if (b && typeof b === "object") return b.buildingName || b.name || "—";
  return pick(c, ["buildingName"]) || "—";
};

// Extract buildingId for the edit form
const cBuildingId = (c) => {
  const b = c?.building;
  if (b && typeof b === "object") return b.id ?? "";
  return pick(c, ["buildingId"]) ?? "";
};

const columns = [
  {
    label: "Classroom",
    render: (c) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <DoorOpen size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{cName(c)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {cId(c) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Capacity",
    render: (c) => (
      <div className="flex items-center gap-1.5">
        <Users size={13} className="text-muted-foreground" />
        <span>{cCapacity(c)}</span>
      </div>
    ),
  },
  { label: "Building", render: (c) => cBuildingName(c) },
];

const makeSchema = () =>
  yup.object({
    classRoomName: yup.string().trim().required("Classroom name is required"),
    capacity: yup.number().min(1, "At least 1 person").required("Capacity is required"),
    buildingId: yup.string().trim().required("Building ID is required"),
  });

const fields = [
  { name: "classRoomName", label: "Classroom name" },
  { name: "capacity", label: "Capacity", type: "number" },
  { name: "buildingId", label: "Building ID" },
];

const valuesFrom = (c = {}) => ({
  classRoomName: pick(c, ["classRoomName", "name"]) || "",
  capacity: pick(c, ["capacity"]) ?? "",
  buildingId: cBuildingId(c),
});

function ClassroomDetails({ classroom, onClose }) {
  const [details, setDetails] = useState(classroom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = cId(classroom);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getClassroomDetails(id)
      .then((res) => setDetails(res.data?.data ?? res.data?.result ?? res.data))
      .catch((err) =>
        setError(err?.response?.data?.message || "Failed to load details"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const info = [
    ["Name", cName(details)],
    ["ID", id],
    ["Capacity", cCapacity(details)],
    ["Building", cBuildingName(details)],
  ];

  return (
    <Modal title="Classroom details" onClose={onClose}>
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

export default function Classrooms() {
  const { key, refresh } = useRefresh();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  const save = async (values) => {
    const body = {
      classRoomName: values.classRoomName,
      capacity: Number(values.capacity),
      buildingId: values.buildingId,
    };
    if (editing) {
      await updateClassroom({ ...body, id: cId(editing) });
    } else {
      await createClassroom(body);
    }
    refresh();
  };

  return (
    <>
      <ListPage
        title="Classrooms"
        subtitle="Manage academy classrooms"
        fetcher={getClassrooms}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setCreating(true)}>
            <Plus size={16} /> New classroom
          </Button>
        }
        rowActions={(c) => (
          <>
            <RowAction
              icon={Eye}
              label="View"
              onClick={() => setViewing(c)}
            />
            <RowAction
              icon={Pencil}
              label="Edit"
              onClick={() => setEditing(c)}
            />
          </>
        )}
      />

      {(creating || editing) && (
        <FormModal
          title={creating ? "New classroom" : "Edit classroom"}
          fields={fields}
          initialValues={creating ? valuesFrom() : valuesFrom(editing)}
          schema={makeSchema()}
          onSubmit={save}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          successText={creating ? "Classroom created" : "Classroom updated"}
        />
      )}

      {viewing && (
        <ClassroomDetails
          classroom={viewing}
          onClose={() => setViewing(null)}
        />
      )}
    </>
  );
}
