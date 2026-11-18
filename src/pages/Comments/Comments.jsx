import { useState } from "react";
import { CheckCheck } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import RowAction from "../../components/ui/RowAction";
import StatusBadge from "../../components/ui/StatusBadge";
import { getComments, acceptComment } from "../../services/coursesApi";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import { jalaliDate } from "../../lib/format";

const isAccepted = (c) => Boolean(pick(c, ["accept", "accepted", "isAccept"]));
const commentId = (c) => pick(c, ["id", "commentId", "commentCourseId"]);

// ===== Table columns (fields are guesses) =====
const columns = [
  { label: "User", keys: ["userName", "fullName", "author"] },
  { label: "Course", keys: ["courseTitle", "courseName"] },
  { label: "Comment text", keys: ["describe", "commentText", "text"] },
  {
    label: "Date",
    render: (c) => jalaliDate(pick(c, ["insertDate", "createDate"])),
  },
  {
    label: "Status",
    render: (c) => (
      <StatusBadge tone={isAccepted(c) ? "success" : "warning"}>
        {isAccepted(c) ? "Approved" : "Pending"}
      </StatusBadge>
    ),
  },
];

// Status filter (Accept parameter in Swagger)
const filters = [
  { value: "", label: "All comments" },
  { value: "false", label: "Pending approval" },
  { value: "true", label: "Approved" },
];

export default function Comments() {
  const { key, act } = useRefresh();
  const [accept, setAccept] = useState("");

  return (
    <ListPage
      title="Course Comments"
      subtitle="Approve comments submitted by users"
      fetcher={getComments}
      refreshKey={key}
      extraParams={{ Accept: accept }}
      columns={columns}
      toolbar={
        <select
          className="field w-48"
          value={accept}
          onChange={(e) => setAccept(e.target.value)}
          aria-label="Status filter"
        >
          {filters.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      }
      rowActions={(c) =>
        !isAccepted(c) && (
          <RowAction
            icon={CheckCheck}
            label="Approve comment"
            onClick={() =>
              act(() => acceptComment(commentId(c)), "Comment approved")
            }
          />
        )
      }
    />
    // TODO: reply to comment (POST /Course/AddReplyCourseComment) — its body was empty in Swagger
  );
}
