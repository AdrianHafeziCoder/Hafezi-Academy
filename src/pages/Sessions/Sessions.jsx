import { useState } from "react";
import * as yup from "yup";
import { Video, Search, CheckCircle2, XCircle, Plus } from "lucide-react";
import PageTitle from "../../components/ui/PageTitle";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import StatusBadge from "../../components/ui/StatusBadge";
import { toast } from "sonner";
import { errorText } from "../../lib/apiData";
import {
  getSessionDetail,
  markStudentAttendance,
  addSessionHomeWork,
} from "../../services/sessionsApi";

const hwSchema = yup.object({
  sessionId: yup.string().trim().required("Session ID is required"),
  hwTitle: yup.string().trim().required("Assignment title is required"),
  hwDescribe: yup.string().trim().required("Description is required"),
});

const hwFields = [
  { name: "sessionId", label: "Session ID" },
  { name: "hwTitle", label: "Assignment title" },
  { name: "hwDescribe", label: "Description", type: "textarea" },
];

const hwValues = () => ({ sessionId: "", hwTitle: "", hwDescribe: "" });

export default function Sessions() {
  const [sessionId, setSessionId] = useState("");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [creatingHw, setCreatingHw] = useState(false);

  const load = async () => {
    if (!sessionId.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await getSessionDetail({ SessionId: sessionId.trim() });
      setDetails(res.data?.data ?? res.data?.result ?? res.data);
    } catch (err) {
      setError(errorText(err));
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (student, present) => {
    try {
      await markStudentAttendance({
        sessionId: sessionId.trim(),
        present,
        studentHand: false,
        absentReason: present ? null : "Absent",
      });
      toast.success(present ? "Marked present" : "Marked absent");
      load();
    } catch (err) {
      toast.error(errorText(err));
    }
  };

  const saveHw = async (values) => {
    await addSessionHomeWork({
      sessionId: values.sessionId,
      hwTitle: values.hwTitle,
      hwDescribe: values.hwDescribe,
    });
  };

  // Extract the student list from details
  const students = Array.isArray(details?.students)
    ? details.students
    : Array.isArray(details?.courseUsers)
      ? details.courseUsers
      : [];

  return (
    <>
      <PageTitle
        title="Sessions & Attendance"
        subtitle="View session details and record attendance"
      />

      <div className="mb-4 flex gap-2" data-reveal>
        <input
          className="field flex-1 max-w-sm"
          placeholder="Enter the session ID (SessionId)…"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
        />
        <Button onClick={load} disabled={loading}>
          <Search size={16} /> {loading ? "…" : "Search"}
        </Button>
        <Button look="ghost" onClick={() => setCreatingHw(true)}>
          <Plus size={16} /> New assignment
        </Button>
      </div>

      {error && (
        <p className="mb-4 rounded-2xl bg-error/10 px-4 py-3 text-body-sm text-error">
          {error}
        </p>
      )}

      {details && (
        <>
          <div className="mb-4 grid gap-3 sm:grid-cols-3" data-reveal>
            {[
              ["Session ID", sessionId],
              ["Title", details.title || details.sessionTitle || "—"],
              ["Date", details.date || details.sessionDate || "—"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-surface-2 p-3 dark:bg-muted"
              >
                <p className="mb-1 text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{String(value)}</p>
              </div>
            ))}
          </div>

          <div
            className="overflow-x-auto rounded-2xl border border-hairline bg-card"
            data-reveal
          >
            <table className="w-full min-w-[680px] border-collapse">
              <thead className="bg-surface-2 dark:bg-muted">
                <tr className="h-11">
                  <th className="th">Student</th>
                  <th className="th">Status</th>
                  <th className="th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="h-24 text-center text-body-sm text-muted-foreground"
                    >
                      The student list is empty
                    </td>
                  </tr>
                )}
                {students.map((s, i) => {
                  const present = s.present === true;
                  const name =
                    s.fullName || s.name || s.userName || `Student ${i + 1}`;
                  return (
                    <tr key={i} className="h-12 border-t border-hairline">
                      <td className="td">{name}</td>
                      <td className="td">
                        <StatusBadge tone={present ? "success" : "error"}>
                          {present ? "Present" : "Absent"}
                        </StatusBadge>
                      </td>
                      <td className="td">
                        <div className="flex gap-1.5">
                          <button
                            className="icon-btn size-8 hover:text-success"
                            onClick={() => markAttendance(s, true)}
                            title="Present"
                          >
                            <CheckCircle2 size={15} />
                          </button>
                          <button
                            className="icon-btn size-8 hover:text-error"
                            onClick={() => markAttendance(s, false)}
                            title="Absent"
                          >
                            <XCircle size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!details && !error && !loading && (
        <div
          className="card flex flex-col items-center gap-3 bg-card px-6 py-16 text-center"
          data-reveal
        >
          <span className="grid size-14 place-items-center rounded-full bg-primary-light text-primary">
            <Video size={24} />
          </span>
          <h2 className="text-h2-sm text-foreground">
            Enter a session ID
          </h2>
          <p className="max-w-md text-body-sm text-muted-foreground">
            To see session details and the student list, enter the
            session ID (SessionId).
          </p>
        </div>
      )}

      {creatingHw && (
        <FormModal
          title="New assignment"
          fields={hwFields}
          initialValues={hwValues()}
          schema={hwSchema}
          onSubmit={saveHw}
          onClose={() => setCreatingHw(false)}
          successText="Assignment created"
        />
      )}
    </>
  );
}
