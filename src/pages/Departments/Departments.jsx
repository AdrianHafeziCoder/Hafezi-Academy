import { useEffect, useState } from "react";
import * as yup from "yup";
import { Plus, Pencil, Eye, Landmark } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import Modal from "../../components/ui/Modal";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getDepartments,
  getDepartmentDetails,
  createDepartment,
  updateDepartment,
} from "../../services/departmentsApi";

const depId = (d) => pick(d, ["id", "departmentId", "depId", "Id"]);
const depName = (d) => pick(d, ["depName", "name", "departmentName"]) || "—";

const depBuildingName = (d) => {
  const b = d?.building;
  if (b && typeof b === "object") return b.buildingName || b.name || "—";
  return pick(d, ["buildingName"]) || "—";
};

const depBuildingId = (d) => {
  const b = d?.building;
  if (b && typeof b === "object") return b.id ?? "";
  return pick(d, ["buildingId"]) ?? "";
};

const columns = [
  {
    label: "Department",
    render: (d) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <Landmark size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{depName(d)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {depId(d) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Building", render: (d) => depBuildingName(d) },
];

const makeSchema = () =>
  yup.object({
    depName: yup.string().trim().required("Department name is required"),
    buildingId: yup.string().trim().required("Building ID is required"),
  });

const fields = [
  { name: "depName", label: "Department name" },
  { name: "buildingId", label: "Building ID" },
];

const valuesFrom = (d = {}) => ({
  depName: pick(d, ["depName", "name"]) || "",
  buildingId: depBuildingId(d),
});

function DepartmentDetails({ department, onClose }) {
  const [details, setDetails] = useState(department);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = depId(department);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getDepartmentDetails(id)
      .then((res) => setDetails(res.data?.data ?? res.data?.result ?? res.data))
      .catch((err) =>
        setError(err?.response?.data?.message || "Failed to load details"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const info = [
    ["Name", depName(details)],
    ["ID", id],
    ["Building", depBuildingName(details)],
  ];

  return (
    <Modal title="Department details" onClose={onClose}>
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

export default function Departments() {
  const { key, refresh } = useRefresh();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  const save = async (values) => {
    if (editing) {
      await updateDepartment({
        id: depId(editing),
        depName: values.depName,
        buildingId: values.buildingId,
      });
    } else {
      await createDepartment({
        depName: values.depName,
        buildingId: values.buildingId,
      });
    }
    refresh();
  };

  return (
    <>
      <ListPage
        title="Departments"
        subtitle="Manage academy departments"
        fetcher={getDepartments}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setCreating(true)}>
            <Plus size={16} /> New department
          </Button>
        }
        rowActions={(d) => (
          <>
            <RowAction
              icon={Eye}
              label="View"
              onClick={() => setViewing(d)}
            />
            <RowAction
              icon={Pencil}
              label="Edit"
              onClick={() => setEditing(d)}
            />
          </>
        )}
      />

      {(creating || editing) && (
        <FormModal
          title={creating ? "New department" : "Edit department"}
          fields={fields}
          initialValues={creating ? valuesFrom() : valuesFrom(editing)}
          schema={makeSchema()}
          onSubmit={save}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          successText={creating ? "Department created" : "Department updated"}
        />
      )}

      {viewing && (
        <DepartmentDetails
          department={viewing}
          onClose={() => setViewing(null)}
        />
      )}
    </>
  );
}
