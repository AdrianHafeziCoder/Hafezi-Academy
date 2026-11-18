import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Terms from "../pages/Terms/Terms";
import Courses from "../pages/Courses/Courses";
import CourseGroups from "../pages/CourseGroups/CourseGroups";
import Reserves from "../pages/Reserves/Reserves";
import Comments from "../pages/Comments/Comments";
import Account from "../pages/Account/Account";
import Users from "../pages/Users/Users";
import ComingSoon from "../pages/ComingSoon/ComingSoon";
import { waitingItems } from "../config/menu";
import { ADMIN_BASE } from "../config/settings";
import Ban from "../pages/Ban/Ban";
import Tournaments from "../pages/Tournaments/Tournaments";
import Tickets from "../pages/Tickets/Tickets";
import Community from "../pages/Community/Community";
import Departments from "../pages/Departments/Departments";
import Buildings from "../pages/Buildings/Buildings";
import Classrooms from "../pages/Classrooms/Classrooms";
import News from "../pages/News/News";
import Notifications from "../pages/Notifications/Notifications";
import CourseLevels from "../pages/CourseLevels/CourseLevels";
import Assistants from "../pages/Assistants/Assistants";
import Schedules from "../pages/Schedules/Schedules";
import Sessions from "../pages/Sessions/Sessions";
import Technologies from "../pages/Technologies/Technologies";
import Statuses from "../pages/Statuses/Statuses";
import Payments from "../pages/Payments/Payments";
import Reports from "../pages/Reports/Reports";
//  Entry of the admin panel
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="terms" element={<Terms />} />
        <Route path="courses" element={<Courses />} />
        <Route path="course-groups" element={<CourseGroups />} />
        <Route path="reserves" element={<Reserves />} />
        <Route path="comments" element={<Comments />} />
        <Route path="account" element={<Account />} />
        <Route path="users" element={<Users />} />
        <Route path="ban-system" element={<Ban />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="community" element={<Community />} />
        <Route path="departments" element={<Departments />} />
        <Route path="buildings" element={<Buildings />} />
        <Route path="classrooms" element={<Classrooms />} />
        <Route path="news" element={<News />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="course-levels" element={<CourseLevels />} />
        <Route path="assistants" element={<Assistants />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="sessions" element={<Sessions />} />
        <Route path="technologies" element={<Technologies />} />
        <Route path="statuses" element={<Statuses />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reports" element={<Reports />} />

        <Route
          path="courses/new"
          element={
            <ComingSoon
              title="Create course"
              tag="Courses"
              note="The course creation form (three-step) has not been built yet."
            />
          }
        />

        {waitingItems.map(({ path, label, tag, note }) => (
          <Route
            key={path}
            path={path}
            element={<ComingSoon title={label} tag={tag} note={note} />}
          />
        ))}
      </Route>

      <Route path="*" element={<Navigate to={ADMIN_BASE} replace />} />
    </Routes>
  );
}
