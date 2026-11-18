import { useState } from "react";
import * as yup from "yup";
import { Plus, ShieldOff, UserX, ShieldAlert } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import StatusBadge from "../../components/ui/StatusBadge";
import PageTitle from "../../components/ui/PageTitle";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import { isSuperAdmin } from "../../services/authStorage";
import { getBanCases, createBan, liftBan } from "../../services/banApi";

const caseId = (c) => pick(c, ["id", "caseId", "banId", "Id"]);
const caseUser = (c) =>
  pick(c, ["userName", "username", "fullName", "phoneNumber", "identity"]) ||
  "—";
const caseReason = (c) => pick(c, ["reason", "description", "note"]) || "—";
const caseType = (c) => pick(c, ["type", "banType", "kind"]) || "—";
const caseStatus = (c) => pick(c, ["status", "state", "isActive"]);
const caseDate = (c) =>
  pick(c, ["createdAt", "insertDate", "date", "banDate"]) || "—";

const isLifted = (c) => {
  const s = caseStatus(c);
  return s === false || ["lifted", "inactive", "Lifted"].includes(s);
};

const columns = [
  {
    label: "User",
    render: (c) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-error/10 text-error">
          <UserX size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{caseUser(c)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {caseId(c) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Type", render: (c) => caseType(c) },
  {
    label: "Reason",
    render: (c) => <span className="line-clamp-1">{caseReason(c)}</span>,
  },
  {
    label: "Status",
    render: (c) =>
      isLifted(c) ? (
        <StatusBadge tone="gray">Lifted</StatusBadge>
      ) : (
        <StatusBadge tone="error">Banned</StatusBadge>
      ),
  },
  { label: "Date", render: (c) => <span dir="ltr">{caseDate(c)}</span> },
];

const makeSchema = () =>
  yup.object({
    userId: yup.string().trim().required("User ID is required"),
    reason: yup.string().trim().required("Reason is required"),
    type: yup.string().trim().required("Ban type is required"),
    duration: yup.number().nullable().min(0, "Must be a positive number"),
  });

const fields = [
  { name: "userId", label: "User ID" },
  { name: "reason", label: "Reason", type: "textarea" },
  {
    name: "type",
    label: "Ban type",
    options: [
      { value: "permanent", label: "Permanent" },
      { value: "temporary", label: "Temporary" },
    ],
  },
  { name: "duration", label: "Duration (days, temporary only)", type: "number" },
];

const valuesFrom = () => ({
  userId: "",
  reason: "",
  type: "temporary",
  duration: "",
});

function NoAccess() {
  return (
    <>
      <PageTitle
        title="Bans"
        subtitle="Manage user bans (Ban System)"
      />
      <div
        className="card flex flex-col items-center gap-3 bg-card px-6 py-16 text-center"
        data-reveal
      >
        <span className="grid size-14 place-items-center rounded-full bg-error/10 text-error">
          <ShieldAlert size={24} />
        </span>
        <h2 className="text-h2-sm text-foreground">Restricted access</h2>
        <p className="max-w-md text-body-sm text-muted-foreground">
          This section is only available to <strong>SuperAdmin</strong> users.
          To get access, contact the system administrator.
        </p>
        <p className="max-w-md text-caption text-error/80">
          ⚠️ Warning: Retrying the request may cause your account to be
          banned.
        </p>
      </div>
    </>
  );
}

function BanContent() {
  const { key, refresh, act } = useRefresh();
  const [creating, setCreating] = useState(false);
  const [lifting, setLifting] = useState(null);

  const save = async (values) => {
    const body = {
      userId: values.userId,
      reason: values.reason,
      type: values.type,
      ...(values.type === "temporary" && values.duration
        ? { duration: Number(values.duration) }
        : {}),
    };
    await createBan(body);
    refresh();
  };

  return (
    <>
      <ListPage
        title="Bans"
        subtitle="Manage user bans (Ban System)"
        fetcher={getBanCases}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setCreating(true)}>
            <Plus size={16} /> New ban
          </Button>
        }
        rowActions={(c) => (
          <>
            {!isLifted(c) && (
              <RowAction
                icon={ShieldOff}
                label="Lift ban"
                onClick={() => setLifting(c)}
              />
            )}
          </>
        )}
      />

      {creating && (
        <FormModal
          title="New ban"
          fields={fields}
          initialValues={valuesFrom()}
          schema={makeSchema()}
          onSubmit={save}
          onClose={() => setCreating(false)}
          successText="User banned"
        />
      )}

      {lifting && (
        <ConfirmDialog
          message={`Ban for “${caseUser(lifting)}” will be lifted. Continue?`}
          confirmText="Lift ban"
          onClose={() => setLifting(null)}
          onConfirm={async () => {
            const ok = await act(
              () => liftBan({ caseId: caseId(lifting), id: caseId(lifting) }),
              "Ban lifted",
            );
            if (ok) setLifting(null);
            return ok;
          }}
        />
      )}
    </>
  );
}

export default function Ban() {
  if (!isSuperAdmin()) {
    return <NoAccess />;
  }
  return <BanContent />;
}
