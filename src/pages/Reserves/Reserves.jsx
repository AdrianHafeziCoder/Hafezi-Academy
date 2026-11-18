import { useState } from "react";
import * as yup from "yup";
import { UserCheck, Trash2 } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import {
  getReserves,
  deleteReserve,
  reserveToStudent,
} from "../../services/coursesApi";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import { jalaliDate } from "../../lib/format";

// ===== Table columns (fields are guesses) =====
const columns = [
  { label: "Student", keys: ["studentName", "fullName", "userName"] },
  { label: "Course", keys: ["courseTitle", "courseName"] },
  {
    label: "Reservation date",
    render: (r) => jalaliDate(pick(r, ["reserveDate", "insertDate"])),
  },
];

const schema = yup.object({
  courseGroupId: yup.number().typeError("Enter a number").required("Required"),
});
// TODO: instead of entering an ID, show the list of course groups (GET /CourseGroup/GetCourseGroup?CourseId=)
const fields = [
  { name: "courseGroupId", label: "Course group ID", type: "number" },
];

export default function Reserves() {
  const { key, refresh, act } = useRefresh();
  const [convert, setConvert] = useState(null); // The reservation we want to convert to a student
  const [toDelete, setToDelete] = useState(null);

  // Convert a reservation to a course student (admin only)
  const makeStudent = async (v) => {
    await reserveToStudent({
      courseId: pick(convert, ["courseId"]),
      studentId: pick(convert, ["studentId", "userId"]),
      courseGroupId: Number(v.courseGroupId),
    });
    refresh();
  };

  return (
    <>
      <ListPage
        title="Course reservations"
        subtitle="Reservation requests awaiting approval"
        fetcher={getReserves}
        paged={false}
        refreshKey={key}
        columns={columns}
        rowActions={(r) => (
          <>
            <RowAction
              icon={UserCheck}
              label="Convert to student"
              onClick={() => setConvert(r)}
            />
            <RowAction
              icon={Trash2}
              label="Delete reservation"
              danger
              onClick={() => setToDelete(r)}
            />
          </>
        )}
      />

      {convert && (
        <FormModal
          title="Convert reservation to student"
          fields={fields}
          schema={schema}
          initialValues={{ courseGroupId: "" }}
          onSubmit={makeStudent}
          successText="Student added to the course"
          onClose={() => setConvert(null)}
        />
      )}
      {toDelete && (
        <ConfirmDialog
          message="This reservation will be deleted. Are you sure?"
          confirmText="Delete reservation"
          onClose={() => setToDelete(null)}
          onConfirm={() =>
            act(() => deleteReserve(pick(toDelete, ["id"])), "Reservation deleted")
          }
        />
      )}
    </>
  );
}
