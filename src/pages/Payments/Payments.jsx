import { useEffect, useState } from "react";
import { CreditCard, Eye } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import RowAction from "../../components/ui/RowAction";
import Modal from "../../components/ui/Modal";
import StatusBadge from "../../components/ui/StatusBadge";
import { pick } from "../../lib/apiData";
import {
  getCoursePayments,
  getPaymentDetails,
  getListOfWhoIsPay,
} from "../../services/paymentsApi";

const pId = (p) => pick(p, ["id", "paymentId", "coursePaymentId", "Id"]);
const pCourse = (p) =>
  pick(p, ["courseName", "courseTitle", "courseId"]) || "—";
const pStudent = (p) =>
  pick(p, ["studentName", "userName", "fullName", "studentId"]) || "—";
const pAmount = (p) => pick(p, ["cost", "amount", "price"]) ?? "—";
const pStatus = (p) => pick(p, ["paymentStatus", "status", "isPay"]) ?? "—";
const pDate = (p) =>
  pick(p, ["insertDate", "createdAt", "date", "paymentDate"]) || "—";

const isPaid = (p) => {
  const s = pStatus(p);
  return (
    s === true ||
    ["paid", "Paid", "success"].includes(String(s).toLowerCase())
  );
};

const columns = [
  {
    label: "Payment",
    render: (p) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
          <CreditCard size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{pStudent(p)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {pId(p) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  { label: "Course", render: (p) => pCourse(p) },
  {
    label: "Amount",
    render: (p) => <span dir="ltr">{String(pAmount(p))}</span>,
  },
  {
    label: "Status",
    render: (p) => (
      <StatusBadge tone={isPaid(p) ? "success" : "warning"}>
        {isPaid(p) ? "Paid" : "Pending"}
      </StatusBadge>
    ),
  },
  { label: "Date", render: (p) => <span dir="ltr">{pDate(p)}</span> },
];

function PaymentDetails({ payment, onClose }) {
  const [details, setDetails] = useState(payment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = pId(payment);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPaymentDetails(id)
      .then((res) => setDetails(res.data?.data ?? res.data?.result ?? res.data))
      .catch((err) =>
        setError(err?.response?.data?.message || "Failed to load details"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const info = [
    ["ID", id],
    ["Student", pStudent(details)],
    ["Course", pCourse(details)],
    ["Amount", pAmount(details)],
    ["Status", isPaid(details) ? "Paid" : "Pending"],
    ["Date", pDate(details)],
  ];

  return (
    <Modal title="Payment details" onClose={onClose}>
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

const TABS = [
  { key: "payments", label: "All payments", fetcher: getCoursePayments },
  { key: "whoIsPay", label: "Payers list", fetcher: getListOfWhoIsPay },
];

export default function Payments() {
  const [tab, setTab] = useState("payments");
  const [viewing, setViewing] = useState(null);
  const current = TABS.find((t) => t.key === tab);

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
        title="Payments"
        subtitle="Manage course payments"
        fetcher={current.fetcher}
        paged={false}
        refreshKey={0}
        columns={columns}
        rowActions={(p) => (
          <RowAction icon={Eye} label="Details" onClick={() => setViewing(p)} />
        )}
      />

      {viewing && (
        <PaymentDetails payment={viewing} onClose={() => setViewing(null)} />
      )}
    </>
  );
}
