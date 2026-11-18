import { useEffect, useState } from "react";
import * as yup from "yup";
import { Plus, Pencil, Eye, Building2, Power } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import StatusBadge from "../../components/ui/StatusBadge";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getBuildings,
  getBuildingDetails,
  createBuilding,
  updateBuilding,
  toggleBuildingActive,
} from "../../services/buildingsApi";

const bId = (b) => pick(b, ["id", "buildingId", "Id"]);
const bName = (b) => pick(b, ["buildingName", "name"]) || "—";
const bFloor = (b) => pick(b, ["floor"]) ?? "—";
const bLat = (b) => pick(b, ["latitude"]) || "—";
const bLng = (b) => pick(b, ["longitude"]) || "—";
const bActive = (b) =>
  pick(b, ["active", "isActive"]) === true ||
  pick(b, ["active", "isActive"]) === "true";

const columns = [
  {
    label: "Building",
    render: (b) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <Building2 size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{bName(b)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {bId(b) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Floor", render: (b) => String(bFloor(b)) },
  {
    label: "Location",
    render: (b) => (
      <span dir="ltr" className="text-[11px]">
        {String(bLat(b))}, {String(bLng(b))}
      </span>
    ),
  },
  {
    label: "Status",
    render: (b) => (
      <StatusBadge tone={bActive(b) ? "success" : "gray"}>
        {bActive(b) ? "Active" : "Inactive"}
      </StatusBadge>
    ),
  },
];

const makeSchema = () =>
  yup.object({
    buildingName: yup.string().trim().required("Building name is required"),
    floor: yup
      .number()
      .min(0, "Must be a positive number")
      .required("Floor is required"),
    latitude: yup.string().trim().nullable(),
    longitude: yup.string().trim().nullable(),
  });

const fields = [
  { name: "buildingName", label: "Building name" },
  { name: "floor", label: "Number of floors", type: "number" },
  { name: "latitude", label: "Latitude (lat)" },
  { name: "longitude", label: "Longitude (lng)" },
];

const valuesFrom = (b = {}) => ({
  buildingName: pick(b, ["buildingName", "name"]) || "",
  floor: pick(b, ["floor"]) ?? "",
  latitude: pick(b, ["latitude"]) || "",
  longitude: pick(b, ["longitude"]) || "",
});

function BuildingDetails({ building, onClose }) {
  const [details, setDetails] = useState(building);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = bId(building);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getBuildingDetails(id)
      .then((res) => setDetails(res.data?.data ?? res.data?.result ?? res.data))
      .catch((err) =>
        setError(err?.response?.data?.message || "Failed to load details"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const info = [
    ["Name", bName(details)],
    ["ID", id],
    ["Floor", bFloor(details)],
    ["Latitude", bLat(details)],
    ["Longitude", bLng(details)],
    ["Status", bActive(details) ? "Active" : "Inactive"],
  ];

  return (
    <Modal title="Building details" onClose={onClose}>
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

export default function Buildings() {
  const { key, refresh, act } = useRefresh();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [changing, setChanging] = useState(null);

  const save = async (values) => {
    const body = {
      buildingName: values.buildingName,
      floor: Number(values.floor),
      latitude: values.latitude || "",
      longitude: values.longitude || "",
    };
    if (editing) {
      await updateBuilding({
        ...body,
        id: bId(editing),
        active: bActive(editing),
      });
    } else {
      await createBuilding(body);
    }
    refresh();
  };

  return (
    <>
      <ListPage
        title="Buildings"
        subtitle="Manage academy buildings"
        fetcher={getBuildings}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setCreating(true)}>
            <Plus size={16} /> New building
          </Button>
        }
        rowActions={(b) => (
          <>
            <RowAction
              icon={Eye}
              label="View"
              onClick={() => setViewing(b)}
            />
            <RowAction
              icon={Pencil}
              label="Edit"
              onClick={() => setEditing(b)}
            />
            <RowAction
              icon={Power}
              label={bActive(b) ? "Deactivate" : "Activate"}
              onClick={() => setChanging(b)}
            />
          </>
        )}
      />

      {(creating || editing) && (
        <FormModal
          title={creating ? "New building" : "Edit building"}
          fields={fields}
          initialValues={creating ? valuesFrom() : valuesFrom(editing)}
          schema={makeSchema()}
          onSubmit={save}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          successText={creating ? "Building created" : "Building updated"}
        />
      )}

      {viewing && (
        <BuildingDetails building={viewing} onClose={() => setViewing(null)} />
      )}

      {changing && (
        <ConfirmDialog
          message={`Building status “${bName(changing)}” will be changed. Continue?`}
          confirmText="Change status"
          onClose={() => setChanging(null)}
          onConfirm={async () => {
            const ok = await act(
              () =>
                toggleBuildingActive({
                  id: bId(changing),
                  active: !bActive(changing),
                }),
              "Building status changed",
            );
            if (ok) setChanging(null);
            return ok;
          }}
        />
      )}
    </>
  );
}
