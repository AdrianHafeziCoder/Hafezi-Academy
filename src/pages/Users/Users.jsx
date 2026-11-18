import { useEffect, useState } from "react";
import * as yup from "yup";
import { Plus, Pencil, Trash2, Eye, Power, UserRound } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Modal from "../../components/ui/Modal";
import StatusBadge from "../../components/ui/StatusBadge";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getUsers,
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
  reverseUserToActive,
} from "../../services/usersApi";

const userId = (u) => pick(u, ["id", "userId", "userID", "Id", "UserId"]);
const userName = (u) =>
  pick(u, ["fullName", "name", "userName", "fName", "firstName"]) || "—";
const isActive = (u) =>
  pick(u, ["isActive", "active", "status"]) === true ||
  ["active", "Active", 1].includes(pick(u, ["isActive", "active", "status"]));

const columns = [
  {
    label: "User",
    render: (u) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200">
          <UserRound size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{userName(u)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {userId(u) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Mobile number",
    render: (u) => (
      <span dir="ltr">
        {pick(u, ["phoneNumber", "phone", "mobile", "mobileNumber"]) || "—"}
      </span>
    ),
  },
  {
    label: "Email",
    render: (u) => (
      <span dir="ltr">
        {pick(u, ["gmail", "email", "emailAddress"]) || "—"}
      </span>
    ),
  },
  {
    label: "Status",
    render: (u) => (
      <StatusBadge tone={isActive(u) ? "success" : "gray"}>
        {isActive(u) ? "Active" : "Inactive"}
      </StatusBadge>
    ),
  },
];

const makeSchema = (creating) =>
  yup.object({
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string().trim().required("Last name is required"),
    phoneNumber: yup.string().trim().required("Mobile number is required"),
    email: yup.string().email("Invalid email").nullable(),
    ...(creating
      ? {
          password: yup
            .string()
            .required("Password is required")
            .min(6, "At least 6 characters"),
        }
      : {}),
  });

const fields = (creating) => [
  { name: "firstName", label: "Name" },
  { name: "lastName", label: "Last name" },
  { name: "phoneNumber", label: "Mobile number" },
  { name: "email", label: "Email", type: "email" },
  ...(creating
    ? [{ name: "password", label: "Password", type: "password" }]
    : []),
];

const valuesFrom = (u = {}) => ({
  firstName: pick(u, ["firstName", "fName", "name"]) || "",
  lastName: pick(u, ["lastName", "lName", "family"]) || "",
  phoneNumber: pick(u, ["phoneNumber", "phone", "mobile"]) || "",
  email: pick(u, ["gmail", "email", "emailAddress"]) || "",
  password: "",
});

function UserDetails({ user, onClose }) {
  const [details, setDetails] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = userId(user);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getUserDetails(id)
      .then((res) => setDetails(res.data?.data ?? res.data?.result ?? res.data))
      .catch((err) =>
        setError(
          err?.response?.data?.message || "Failed to load user details",
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const info = [
    ["Name", userName(details)],
    ["Mobile", pick(details, ["phoneNumber", "phone", "mobile"])],
    ["Email", pick(details, ["gmail", "email", "emailAddress"])],
    ["ID", id],
    ["Status", isActive(details) ? "Active" : "Inactive"],
    ["Registration date", pick(details, ["insertDate", "registerDate", "createdAt"])],
  ];

  return (
    <Modal title="User details" onClose={onClose}>
      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Loading data…
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

export default function Users() {
  const { key, refresh, act } = useRefresh();
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [changing, setChanging] = useState(null);

  const save = async (values) => {
    if (editing) {
      // Update: fName / lName / gmail
      const body = {
        id: userId(editing),
        fName: values.firstName,
        lName: values.lastName,
        gmail: values.email || "",
        phoneNumber: values.phoneNumber,
        active: isActive(editing),
        isDelete: false,
      };
      await updateUser(body);
    } else {
      // Create: firstName / lastName / gmail
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        gmail: values.email || "",
        password: values.password,
        phoneNumber: values.phoneNumber,
        isStudent: false,
        isTeacher: false,
      };
      await createUser(body);
    }
    refresh();
  };

  const toggleActive = async (u) => {
    const id = userId(u);
    const ok = await act(
      () => reverseUserToActive({ userId: id, id }),
      "User restored to active status",
    );
    if (ok) setChanging(null);
    return ok;
  };

  return (
    <>
      <ListPage
        title="User management"
        subtitle="View, search and manage academy user accounts"
        fetcher={getUsers}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setCreating(true)}>
            <Plus size={16} /> New user
          </Button>
        }
        rowActions={(u) => (
          <>
            <RowAction
              icon={Eye}
              label="View details"
              onClick={() => setViewing(u)}
            />
            <RowAction
              icon={Pencil}
              label="Edit"
              onClick={() => setEditing(u)}
            />
            {!isActive(u) && (
              <RowAction
                icon={Power}
                label="Restore to active"
                onClick={() => setChanging(u)}
              />
            )}
            <RowAction
              icon={Trash2}
              label="Delete user"
              danger
              onClick={() => setDeleting(u)}
            />
          </>
        )}
      />

      {(creating || editing) && (
        <FormModal
          title={creating ? "Add new user" : "Edit user"}
          fields={fields(creating)}
          initialValues={creating ? valuesFrom() : valuesFrom(editing)}
          schema={makeSchema(creating)}
          onSubmit={save}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          successText={creating ? "User created" : "User updated"}
        />
      )}

      {viewing && (
        <UserDetails user={viewing} onClose={() => setViewing(null)} />
      )}

      {deleting && (
        <ConfirmDialog
          message={`The user account “${userName(deleting)}” will be deleted. This action cannot be undone.`}
          confirmText="Delete user"
          onClose={() => setDeleting(null)}
          onConfirm={async () => {
            const ok = await act(
              () => deleteUser(userId(deleting)),
              "User deleted",
            );
            if (ok) setDeleting(null);
            return ok;
          }}
        />
      )}

      {changing && (
        <ConfirmDialog
          message={`Account status for “${userName(changing)}” will be changed. Continue?`}
          confirmText="Change status"
          onClose={() => setChanging(null)}
          onConfirm={() => toggleActive(changing)}
        />
      )}
    </>
  );
}
