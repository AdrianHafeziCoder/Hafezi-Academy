import { useState } from "react";
import * as yup from "yup";
import { Plus, Clock, Lock, Unlock } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import StatusBadge from "../../components/ui/StatusBadge";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getAdminSchedules,
  createSchedule,
  toggleLockToRiase,
} from "../../services/schedulesApi";

const sId = (s) => pick(s, ["id", "scheduleId", "schedualId", "Id"]);
const sCourse = (s) =>
  pick(s, ["courseName", "courseTitle", "courseId"]) || "—";
const sGroup = (s) =>
  pick(s, ["courseGroupName", "groupName", "courseGroupId"]) || "—";
const sStart = (s) => pick(s, ["startDate", "date"]) || "—";
const sTime = (s) => {
  const st = pick(s, ["startTime"]) || "—";
  const et = pick(s, ["endTime"]) || "—";
  return `${st} - ${et}`;
};
const sWeek = (s) => pick(s, ["weekNumber", "week"]) ?? "—";
const sLocked = (s) => pick(s, ["lockToRiase", "isLocked"]) === true;

const columns = [
  {
    label: "Schedule",
    render: (s) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
          <Clock size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{sCourse(s)}</p>
          <p className="text-[11px] text-muted-foreground">Group: {sGroup(s)}</p>
        </div>
      </div>
    ),
  },
  { label: "Date", render: (s) => <span dir="ltr">{sStart(s)}</span> },
  { label: "Time", render: (s) => <span dir="ltr">{sTime(s)}</span> },
  { label: "Week", render: (s) => sWeek(s) },
  {
    label: "Status",
    render: (s) => (
      <StatusBadge tone={sLocked(s) ? "error" : "success"}>
        {sLocked(s) ? "Locked" : "Open"}
      </StatusBadge>
    ),
  },
];

const schema = yup.object({
  currentCurseId: yup.string().trim().required("Course ID is required"),
  courseGroupId: yup.string().trim().required("Group ID is required"),
  startDate: yup.string().trim().required("Start date is required"),
  startTime: yup.string().trim().required("Start time is required"),
  endTime: yup.string().trim().required("End time is required"),
  weekNumber: yup.number().min(1).required("Week number is required"),
  rowEffect: yup.number().min(1).required("rowEffect is required"),
});

const fields = [
  { name: "currentCurseId", label: "Course ID (currentCurseId)" },
  { name: "courseGroupId", label: "Group ID" },
  { name: "startDate", label: "Start date", type: "date" },
  { name: "startTime", label: "Start time (e.g. 14:00)" },
  { name: "endTime", label: "End time (e.g. 15:00)" },
  { name: "weekNumber", label: "Week number", type: "number" },
  { name: "rowEffect", label: "rowEffect", type: "number" },
];

const valuesFrom = () => ({
  currentCurseId: "",
  courseGroupId: "",
  startDate: "",
  startTime: "14:00",
  endTime: "15:00",
  weekNumber: 1,
  rowEffect: 1,
});

export default function Schedules() {
  const { key, refresh, act } = useRefresh();
  const [creating, setCreating] = useState(false);

  const save = async (values) => {
    const { currentCurseId, ...data } = values;
    await createSchedule(
      { currentCurseId },
      {
        courseGroupId: values.courseGroupId,
        startDate: values.startDate,
        startTime: values.startTime,
        endTime: values.endTime,
        weekNumber: Number(values.weekNumber),
        rowEffect: Number(values.rowEffect),
      },
    );
    refresh();
  };

  const toggle = async (s) => {
    await act(
      () => toggleLockToRiase({ id: sId(s), active: !sLocked(s) }),
      "Lock status changed",
    );
  };

  return (
    <>
      <ListPage
        title="Schedule"
        subtitle="Manage class schedules"
        fetcher={getAdminSchedules}
        paged={false}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Button onClick={() => setCreating(true)}>
            <Plus size={16} /> New schedule
          </Button>
        }
        rowActions={(s) => (
          <RowAction
            icon={sLocked(s) ? Unlock : Lock}
            label={sLocked(s) ? "Unlock" : "Lock"}
            onClick={() => toggle(s)}
          />
        )}
      />

      {creating && (
        <FormModal
          title="New schedule"
          fields={fields}
          initialValues={valuesFrom()}
          schema={schema}
          onSubmit={save}
          onClose={() => setCreating(false)}
          successText="Schedule created"
        />
      )}
    </>
  );
}
