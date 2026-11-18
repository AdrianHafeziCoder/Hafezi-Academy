import ListPage from "../../components/ui/ListPage";
import { getGroups } from "../../services/coursesApi";
import { pick } from "../../lib/apiData";
import { jalaliDate } from "../../lib/format";

// ===== Table columns (fields are guesses, fix after seeing the real response) =====
const columns = [
  { label: "Group name", keys: ["groupName", "name", "title"] },
  { label: "Course", keys: ["courseTitle", "courseName"] },
  { label: "Instructor", keys: ["teacherName", "fullName"] },
  { label: "Capacity", keys: ["capacity", "groupCapacity"] },
  {
    label: "Registration date",
    render: (g) => jalaliDate(pick(g, ["insertDate", "createDate"])),
  },
];

// TODO: add, edit and delete group (POST/PUT/DELETE /CourseGroup) — their bodies were empty in Swagger
export default function CourseGroups() {
  return (
    <ListPage
      title="Course Groups"
      subtitle="Grouping students in each course"
      fetcher={getGroups}
      columns={columns}
    />
  );
}
