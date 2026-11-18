import { useState } from "react";
import * as yup from "yup";
import { Plus, Bell, CheckCircle2, User } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import StatusBadge from "../../components/ui/StatusBadge";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getMyUnseenNotifications,
  markNotificationSeen,
  sendNotification,
} from "../../services/notificationsApi";

const ntId = (n) => pick(n, ["id", "notificationId", "Id"]);
const ntMsg = (n) => pick(n, ["message", "text", "content"]) || "—";
const ntDate = (n) => pick(n, ["insertDate", "createdAt", "date"]) || "—";
const ntSeen = (n) => pick(n, ["isSeen", "seen"]) === true;

const columns = [
  {
    label: "Notification",
    render: (n) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
          <Bell size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground line-clamp-1">
            {ntMsg(n)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            ID: {ntId(n) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Status",
    render: (n) =>
      ntSeen(n) ? (
        <StatusBadge tone="gray">Seen</StatusBadge>
      ) : (
        <StatusBadge tone="warning">New</StatusBadge>
      ),
  },
  { label: "Date", render: (n) => <span dir="ltr">{ntDate(n)}</span> },
];

const sendSchema = yup.object({
  userId: yup.string().trim().required("User ID is required"),
  message: yup.string().trim().required("Message text is required"),
});

const sendFields = [
  { name: "userId", label: "Recipient user ID" },
  { name: "message", label: "Notification text", type: "textarea" },
];

const valuesFrom = () => ({ userId: "", message: "" });

export default function Notifications() {
  const { key, refresh, act } = useRefresh();
  const [sending, setSending] = useState(false);

  const send = async (values) => {
    await sendNotification({
      userId: Number(values.userId),
      message: values.message,
    });
    refresh();
  };

  const markSeen = async (n) => {
    await act(() => markNotificationSeen(ntId(n)), "Notification marked as seen");
  };

  return (
    <>
      <ListPage
        title="Notifications"
        subtitle="Your unseen notifications and sending notifications to users"
        fetcher={getMyUnseenNotifications}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setSending(true)}>
            <Plus size={16} /> Send notification
          </Button>
        }
        rowActions={(n) => (
          <>
            {!ntSeen(n) && (
              <RowAction
                icon={CheckCircle2}
                label="Seen"
                onClick={() => markSeen(n)}
              />
            )}
          </>
        )}
      />

      {sending && (
        <FormModal
          title="Send notification to user"
          fields={sendFields}
          initialValues={valuesFrom()}
          schema={sendSchema}
          onSubmit={send}
          onClose={() => setSending(false)}
          successText="Notification sent"
        />
      )}
    </>
  );
}
