import { useState } from "react";
import * as yup from "yup";
import { toast } from "sonner";
import { KeyRound, ShieldCheck, UserRound } from "lucide-react";
import PageTitle from "../../components/ui/PageTitle";
import FormModal from "../../components/ui/FormModal";
import Button from "../../components/ui/Button";
import {
  changePassword,
  getSecurityInfo,
  editSecurity,
} from "../../services/accountApi";
import { errorText } from "../../lib/apiData";

// ===== Validation =====
const passwordSchema = yup.object({
  oldPassword: yup.string().required("Enter your current password"),
  newPassword: yup
    .string()
    .min(8, "At least 8 characters")
    .required("Enter your new password"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Repeat your password"),
});
const securitySchema = yup.object({
  recoveryEmail: yup.string().email("Invalid email"),
});

// ===== Form fields =====
const passwordFields = [
  { name: "oldPassword", label: "Current password", type: "password" },
  { name: "newPassword", label: "New password", type: "password" },
  { name: "repeatPassword", label: "Repeat new password", type: "password" },
];
const securityFields = [
  { name: "twoStepAuth", label: "Two-factor authentication", type: "checkbox" },
  { name: "recoveryEmail", label: "Recovery email", type: "email" },
  { name: "telegramUsername", label: "Telegram username" },
];

// ===== Cards on this page =====
const cards = [
  {
    id: "password",
    icon: KeyRound,
    title: "Change password",
    text: "Change your admin panel login password.",
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Security settings",
    text: "Two-factor authentication, recovery email and Telegram.",
  },
];

export default function Account() {
  const [modal, setModal] = useState(null); // { type, values }
  const close = () => setModal(null);

  // First fetch the current settings from the server, then open the dialog
  const openSecurity = async () => {
    try {
      const res = await getSecurityInfo();
      const d = res.data?.data ?? res.data ?? {};
      setModal({
        type: "security",
        values: {
          twoStepAuth: Boolean(d.twoStepAuth),
          recoveryEmail: d.recoveryEmail ?? "",
          telegramUsername: d.telegramUsername ?? "",
        },
      });
    } catch (err) {
      toast.error(errorText(err));
    }
  };
  const open = (id) =>
    id === "security" ? openSecurity() : setModal({ type: id });

  return (
    <>
      <PageTitle title="My Account" subtitle="Admin password and account security" />

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map(({ id, icon: Icon, title, text }) => (
          <div
            key={id}
            className="card flex items-center gap-4 bg-card p-5"
            data-reveal
          >
            <span className="grid size-12 place-items-center rounded-full bg-primary-light text-primary">
              <Icon size={22} />
            </span>
            <div className="flex-1">
              <h2 className="text-body-lg font-bold text-foreground">
                {title}
              </h2>
              <p className="text-body-sm text-muted-foreground">{text}</p>
            </div>
            <Button look="soft" size="small" onClick={() => open(id)}>
              Unlock
            </Button>
          </div>
        ))}

        {/* TODO: edit profile and photo (PUT /SharePanel/UpdateProfileInfo and AddProfileImage) — their bodies were empty in Swagger */}
        <div
          className="card flex items-center gap-4 border-dashed bg-card p-5 text-muted-foreground"
          data-reveal
        >
          <span className="grid size-12 place-items-center rounded-full bg-surface-2">
            <UserRound size={22} />
          </span>
          <p className="text-body-sm">
            Profile and photo editing will be added soon.
          </p>
        </div>
      </div>

      {modal?.type === "password" && (
        <FormModal
          title="Change password"
          fields={passwordFields}
          schema={passwordSchema}
          initialValues={{
            oldPassword: "",
            newPassword: "",
            repeatPassword: "",
          }}
          onSubmit={(v) =>
            changePassword({
              oldPassword: v.oldPassword,
              newPassword: v.newPassword,
            })
          }
          successText="Password changed"
          onClose={close}
        />
      )}
      {modal?.type === "security" && (
        <FormModal
          title="Security settings"
          fields={securityFields}
          schema={securitySchema}
          initialValues={modal.values}
          onSubmit={editSecurity}
          successText="Security settings saved"
          onClose={close}
        />
      )}
    </>
  );
}
