// Sidebar menu
import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  Layers,
  Bookmark,
  MessageSquare,
  UserCheck,
  Clock,
  Video,
  Cpu,
  Newspaper,
  Bell,
  Ticket,
  Users,
  Building2,
  Landmark,
  DoorOpen,
  Trophy,
  CreditCard,
  FileText,
  Ban,
  Settings,
  ScrollText,
  Share2,
  UserCog,
  SlidersHorizontal,
  Flag,
} from "lucide-react";

export const menuGroups = [
  {
    title: "Main",
    items: [{ label: "Dashboard", path: "", icon: LayoutDashboard, ready: true }],
  },
  {
    title: "Education",
    items: [
      { label: "Terms", path: "terms", icon: CalendarDays, ready: true },
      { label: "Courses", path: "courses", icon: GraduationCap, ready: true },
      {
        label: "Course Groups",
        path: "course-groups",
        icon: Layers,
        ready: true,
      },
      { label: "Reservations", path: "reserves", icon: Bookmark, ready: true },
      {
        label: "Course Comments",
        path: "comments",
        icon: MessageSquare,
        ready: true,
      },
      {
        label: "Course Levels & Types",
        path: "course-levels",
        icon: SlidersHorizontal,
        tag: "Courses",
        ready: true,
        note: "GET /CourseLevel/GetAllCourseLevel and POST /CourseLevel. Course type is read-only: GET /CourseType/GetCourseTypes",
      },
      {
        label: "Course Assistants",
        path: "assistants",
        icon: UserCheck,
        tag: "Attendance",
        ready: true,
        note: "/CourseAssistance (list, add, edit) and /AssistanceWork (assistant tasks)",
      },
      {
        label: "Schedule",
        path: "schedules",
        icon: Clock,
        tag: "Schedules",
        ready: true,
        note: "GetAdminScheduals, GetTeacherScheduals, AddSchedualSingle and LockToRiase",
      },
      {
        label: "Sessions & Attendance",
        path: "sessions",
        icon: Video,
        ready: true,
        tag: "Sessions",
        note: "SessionDetail, assignments, session file and Student_AP (student attendance)",
      },
      {
        label: "Technologies",
        path: "technologies",
        icon: Cpu,
        tag: "Technology",
        ready: true,
        note: "GET, POST and PUT on /Technology (the PUT body is missing from Swagger)",
      },
      {
        label: "Statuses",
        path: "statuses",
        icon: Flag,
        tag: "System",
        ready: true,
        note: "GET, POST and PUT on /Status",
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        label: "News",
        path: "news",
        icon: Newspaper,
        ready: true, // ← add this
        tag: "News",
        note: "Admin list, create and edit news, categories, files and comments",
      },
      {
        label: "Notifications",
        path: "notifications",
        icon: Bell,
        ready: true, // ← add this
        tag: "Notifications",
        note: "mineNoSeen, see/{id} and add",
      },
      {
        label: "Tickets",
        path: "tickets",
        icon: Ticket,
        ready: true, // ← add this
        tag: "Tickets",
        note: "...",
      },
      {
        label: "Course Community Groups",
        path: "community",
        icon: Share2,
        ready: true, // ← add this
        tag: "Community",
        note: "...",
      },
    ],
  },
  {
    title: "Finance & Reports",
    items: [
      {
        label: "Payments",
        path: "payments",
        icon: CreditCard,
        tag: "Payments",
        ready: true,
        note: "Read-only: UserPayList, ListOfWhoIsPay, payment list and details",
      },
      {
        label: "Reports",
        path: "reports",
        icon: FileText,
        tag: "Reports",
        ready: true,
        note: "DashboardReport and DashboardTechnologyReport (also used in the dashboard)",
      },
    ],
  },
  {
    title: "Users",
    items: [
      {
        label: "Users",
        path: "users",
        icon: Users,
        ready: true,
        tag: "Users",
        note: "UserMannage, UserDetails, CreateUser, UpdateUser, DeleteUser, ReverseToActiveUser, AddUserAccess",
      },
      {
        label: "Bans",
        path: "ban-system",
        icon: Ban,
        ready: true,
        tag: "Ban System",
        note: "SuperAdmin only: Preview, Create, Lift, Cases, Identities, Stats, Lookup",
      },
      {
        label: "Tournaments",
        path: "tournaments",
        icon: Trophy,
        ready: true,
        tag: "Tournaments",
        note: "Admin section: tournament, mentor, score criteria and scores.",
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        label: "Departments",
        path: "departments",
        icon: Landmark,
        ready: true, // ← add this
        tag: "Organization",
        note: "/Department (list, details, add, edit)",
      },
      {
        label: "Buildings",
        path: "buildings",
        icon: Building2,
        ready: true, // ← add this
        tag: "Infrastructure",
        note: "/Building and PUT /Building/Active",
      },
      {
        label: "Classrooms",
        path: "classrooms",
        icon: DoorOpen,
        ready: true, // ← add this
        tag: "Infrastructure",
        note: "/ClassRoom (list, details, add, edit)",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Site Settings",
        path: "settings",
        icon: Settings,
        tag: "Settings",
        note: "Only GET /SiteSetting/{Id} exists, no editing",
      },
      {
        label: "Request Log",
        path: "request-log",
        icon: ScrollText,
        tag: "System",
        note: "GET /log/request",
      },
    ],
  },
  {
    title: "My Account",
    items: [{ label: "My Account", path: "account", icon: UserCog, ready: true }],
  },
];

// Items without a page (used to auto-generate placeholder routes)
export const waitingItems = menuGroups
  .flatMap((g) => g.items)
  .filter((i) => !i.ready);
