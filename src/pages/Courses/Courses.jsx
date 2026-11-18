import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Power, Hourglass, Trash2 } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import RowAction from "../../components/ui/RowAction";
import StatusBadge from "../../components/ui/StatusBadge";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import {
  getCourses,
  setCourseActive,
  setCourseExpire,
  deleteCourse,
} from "../../services/coursesApi";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import { jalaliDate, money } from "../../lib/format";
import { ADMIN_BASE } from "../../config/settings";

// ===== Helpers: the exact field names are not known yet, so several possible names are tried =====
const courseId = (c) => c.courseId;
const isActive = (c) => c.active;
const isExpired = (c) => c.isExpire;
// ===== Table columns (sortKey uses the names Swagger lists for sorting) =====
const columns = [
  { label: "Course title", keys: ["title"] },
  { label: "Instructor", keys: ["fullName"] },
  { label: "Capacity", keys: ["capacity"] },
  { label: "Price", render: (c) => money(c.cost) },
  { label: "Start", render: (c) => jalaliDate(c.startTime) },
  { label: "End", render: (c) => jalaliDate(c.endTime) },
  {
    label: "Status",
    render: (c) => (
      <div className="flex gap-1.5">
        <StatusBadge tone={isActive(c) ? "success" : "gray"}>
          {isActive(c) ? "Active" : "Inactive"}
        </StatusBadge>
        {isExpired(c) && <StatusBadge tone="warning">Expired</StatusBadge>}
      </div>
    ),
  },
];

export default function Courses() {
  const { key, act } = useRefresh();
  const [toDelete, setToDelete] = useState(null); // The course awaiting delete confirmation

  return (
    <>
      <ListPage
        title="Courses"
        subtitle="Manage all academy courses"
        fetcher={getCourses}
        refreshKey={key}
        columns={columns}
        toolbar={
          <Link to={`${ADMIN_BASE}/courses/new`}>
            <Button>
              <Plus size={16} />
              New course
            </Button>
          </Link>
        }
        rowActions={(c) => (
          <>
            <RowAction
              icon={Power}
              label={isActive(c) ? "Deactivate" : "Activate"}
              onClick={() =>
                act(
                  () => setCourseActive(courseId(c), !isActive(c)),
                  "Course status changed",
                )
              }
            />
            <RowAction
              icon={Hourglass}
              label={isExpired(c) ? "Remove expiry" : "Mark as expired"}
              onClick={() =>
                act(
                  () => setCourseExpire(courseId(c), !isExpired(c)),
                  "Course expiry changed",
                )
              }
            />
            <RowAction
              icon={Trash2}
              label="Delete"
              danger
              onClick={() => setToDelete(c)}
            />
          </>
        )}
      />

      {toDelete && (
        <ConfirmDialog
          message="This course will be deleted. Are you sure?"
          confirmText="Delete course"
          onClose={() => setToDelete(null)}
          onConfirm={() =>
            act(() => deleteCourse(courseId(toDelete)), "Course deleted")
          }
        />
      )}
    </>
  );
}
