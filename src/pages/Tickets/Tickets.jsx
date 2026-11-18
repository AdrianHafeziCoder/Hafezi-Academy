import { useEffect, useState } from "react";
import {
  Ticket as TicketIcon,
  User,
  MessageCircle,
  CheckCircle2,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import RowAction from "../../components/ui/RowAction";
import StatusBadge from "../../components/ui/StatusBadge";
import { useRefresh } from "../../hooks/useRefresh";
import { pick, errorText } from "../../lib/apiData";
import {
  getTicketsAll,
  getTicketsNotAccepted,
  getTicketsMine,
  getTicketChat,
  sendSupportMessage,
  acceptTicket,
} from "../../services/ticketsApi";

const tkId = (t) => pick(t, ["id", "ticketId", "Id"]);
const tkTitle = (t) =>
  pick(t, ["overview", "title", "subject", "problem"]) || "—";
const tkUser = (t) =>
  pick(t, ["userName", "fullName", "senderName", "phoneNumber"]) || "—";
const tkStatus = (t) => pick(t, ["status", "state", "solved"]);
const tkDate = (t) => pick(t, ["createdAt", "insertDate", "date"]) || "—";
const tkAccepted = (t) =>
  pick(t, ["isAccepted", "accepted", "solved"]) === true ||
  ["accepted", "Answered", "Closed"].includes(tkStatus(t));

const columns = [
  {
    label: "Ticket",
    render: (t) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
          <TicketIcon size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground line-clamp-1">
            {tkTitle(t)}
          </p>
          <p className="text-[11px] text-muted-foreground">
            ID: {tkId(t) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "User",
    render: (t) => (
      <div className="flex items-center gap-1.5">
        <User size={13} className="text-muted-foreground" />
        <span>{tkUser(t)}</span>
      </div>
    ),
  },
  {
    label: "Status",
    render: (t) =>
      tkAccepted(t) ? (
        <StatusBadge tone="success">Answered</StatusBadge>
      ) : (
        <StatusBadge tone="warning">Pending</StatusBadge>
      ),
  },
  { label: "Date", render: (t) => <span dir="ltr">{tkDate(t)}</span> },
];

function TicketChat({ ticket, onClose, onChanged }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const id = tkId(ticket);

  const reload = async () => {
    try {
      const res = await getTicketChat(id);
      const data = res.data?.data ?? res.data?.result ?? res.data;
      const arr = Array.isArray(data)
        ? data
        : (data?.messages ?? data?.chat ?? []);
      setMessages(arr);
    } catch (err) {
      setError(errorText(err));
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    reload().finally(() => setLoading(false));
  }, [id]);

  const send = async () => {
    if (!text.trim()) return;
    setSending(true);
    try {
      await sendSupportMessage({
        text: text.trim(),
        ticketId: id,
      });
      toast.success("Message sent");
      setText("");
      await reload();
      onChanged?.();
    } catch (err) {
      toast.error(errorText(err));
    } finally {
      setSending(false);
    }
  };

  const msgText = (m) => pick(m, ["text", "message", "content", "body"]) || "";
  const msgSender = (m) =>
    pick(m, ["sender", "senderName", "userName", "role"]) || "";
  const msgDate = (m) => pick(m, ["createdAt", "date", "insertDate"]) || "";

  return (
    <Modal title={`Ticket chat: ${tkTitle(ticket)}`} onClose={onClose}>
      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Loading messages…
        </p>
      ) : (
        <>
          {error && <p className="mb-3 text-sm text-error">{error}</p>}
          <div className="mb-4 max-h-80 space-y-2 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No messages
              </p>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-surface-2 p-3 dark:bg-muted"
                >
                  <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-medium">{msgSender(m)}</span>
                    <span dir="ltr">{msgDate(m)}</span>
                  </div>
                  <p className="text-body-sm">{msgText(m)}</p>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              className="field flex-1"
              placeholder="Support message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            />
            <Button onClick={send} disabled={sending || !text.trim()}>
              <Send size={15} /> {sending ? "…" : "Send"}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}

const TABS = [
  { key: "all", label: "All tickets", fetcher: getTicketsAll },
  { key: "notAccepted", label: "Unapproved", fetcher: getTicketsNotAccepted },
  { key: "mine", label: "My tickets", fetcher: getTicketsMine },
];

export default function Tickets() {
  const { key, refresh, act } = useRefresh();
  const [tab, setTab] = useState("all");
  const [chatting, setChatting] = useState(null);

  const current = TABS.find((t) => t.key === tab);

  const accept = async (t) => {
    const ok = await act(() => acceptTicket(tkId(t)), "Ticket accepted");
    return ok;
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

      <ListPage
        key={tab}
        title="Tickets"
        subtitle="Manage support tickets"
        fetcher={current.fetcher}
        paged={false}
        refreshKey={key}
        columns={columns}
        rowActions={(t) => (
          <>
            <RowAction
              icon={MessageCircle}
              label="Chat"
              onClick={() => setChatting(t)}
            />
            {!tkAccepted(t) && (
              <RowAction
                icon={CheckCircle2}
                label="Accept ticket"
                onClick={() => accept(t)}
              />
            )}
          </>
        )}
      />

      {chatting && (
        <TicketChat
          ticket={chatting}
          onClose={() => setChatting(null)}
          onChanged={refresh}
        />
      )}
    </>
  );
}
