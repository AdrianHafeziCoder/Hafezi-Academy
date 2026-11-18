import { useState } from "react";
import * as yup from "yup";
import { Pencil, CalendarOff, Plus } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import FormModal from "../../components/ui/FormModal";
import Button from "../../components/ui/Button";
import RowAction from "../../components/ui/RowAction";
import StatusBadge from "../../components/ui/StatusBadge";
import {
  getTerms,
  addTerm,
  updateTerm,
  addTermCloseDate,
} from "../../services/termsApi";
import { useRefresh } from "../../hooks/useRefresh";
import { jalaliDate, dateInput, toIso } from "../../lib/format";

// ===== Validation =====
const required = "This field is required";
// The end date must not be before the start date (text comparison works for the yyyy-MM-dd format)
const afterStart = (startKey) =>
  yup
    .string()
    .required(required)
    .test("after", "End date is before the start date", function (end) {
      return !end || !this.parent[startKey] || end >= this.parent[startKey];
    });

const termSchema = yup.object({
  termName: yup.string().required(required),
  departmentId: yup.number().typeError("Enter a number").required(required),
  startDate: yup.string().required(required),
  endDate: afterStart("startDate"),
});
const closeSchema = yup.object({
  startCloseDate: yup.string().required(required),
  endCloseDate: afterStart("startCloseDate"),
  closeReason: yup.string().required(required),
});

// ===== Form fields =====
const termFields = [
  { name: "termName", label: "Term name" },
  { name: "departmentId", label: "Department ID", type: "number" }, // TODO: instead of a number, a list of departments (from the Organization section)
  { name: "startDate", label: "Start date", type: "date" }, // TODO: Jalali date picker
  { name: "endDate", label: "End date", type: "date" },
  { name: "expire", label: "Term has expired", type: "checkbox" },
];
const closeFields = [
  { name: "startCloseDate", label: "Closure start", type: "date" },
  { name: "endCloseDate", label: "Closure end", type: "date" },
  { name: "closeReason", label: "Closure reason", type: "textarea" },
];

// ===== Table columns =====
const columns = [
  { label: "Term name", keys: ["termName"] },
  { label: "Department", keys: ["departmentId"] },
  { label: "Start", render: (t) => jalaliDate(t.startDate) },
  { label: "End", render: (t) => jalaliDate(t.endDate) },
  {
    label: "Status",
    render: (t) => (
      <StatusBadge tone={t.expire ? "gray" : "success"}>
        {t.expire ? "Expired" : "Active"}
      </StatusBadge>
    ),
  },
];

const emptyTerm = {
  termName: "",
  departmentId: "",
  startDate: "",
  endDate: "",
  expire: false,
};

export default function Terms() {
  const { key, refresh } = useRefresh();
  const [modal, setModal] = useState(null); // { type: "term" | "close", term }
  const close = () => setModal(null);

  // Save term (add or edit)
  const saveTerm = async (v) => {
    const body = {
      termName: v.termName,
      departmentId: Number(v.departmentId),
      startDate: toIso(v.startDate),
      endDate: toIso(v.endDate),
    };
    if (modal.term) {
      await updateTerm({ ...body, expire: v.expire, id: modal.term.id });
    } else {
      await addTerm(body);
    }
    refresh();
  };

  // Save a holiday for a term
  // Note: in Swagger the term ID is text in one place and a number in another; for now the row value is sent as-is
  const saveClose = (v) =>
    addTermCloseDate({
      ...v,
      termId: modal.term.id,
      startCloseDate: toIso(v.startCloseDate),
      endCloseDate: toIso(v.endCloseDate),
    });

  const editing = modal?.term;
  return (
    <>
      <ListPage
        title="Terms"
        subtitle="Create and edit academic terms"
        fetcher={getTerms}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setModal({ type: "term" })}>
            <Plus size={16} />
            New term
          </Button>
        }
        rowActions={(t) => (
          <>
            <RowAction
              icon={Pencil}
              label="Edit"
              onClick={() => setModal({ type: "term", term: t })}
            />
            <RowAction
              icon={CalendarOff}
              label="Holidays"
              onClick={() => setModal({ type: "close", term: t })}
            />
          </>
        )}
      />

      {modal?.type === "term" && (
        <FormModal
          title={editing ? "Edit term" : "New term"}
          fields={termFields}
          schema={termSchema}
          onSubmit={saveTerm}
          onClose={close}
          initialValues={
            editing
              ? {
                  termName: editing.termName ?? "",
                  departmentId: editing.departmentId ?? "",
                  startDate: dateInput(editing.startDate),
                  endDate: dateInput(editing.endDate),
                  expire: Boolean(editing.expire),
                }
              : emptyTerm
          }
        />
      )}

      {modal?.type === "close" && (
        <FormModal
          title={`Holiday: ${modal.term.termName ?? ""}`}
          fields={closeFields}
          schema={closeSchema}
          onSubmit={saveClose}
          successText="Holiday saved"
          onClose={close}
          initialValues={{
            startCloseDate: "",
            endCloseDate: "",
            closeReason: "",
          }}
        />
      )}
    </>
  );
}
