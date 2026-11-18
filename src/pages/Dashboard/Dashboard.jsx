import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  GraduationCap,
  MessageSquare,
  Bookmark,
  Users,
  UserCheck,
  CreditCard,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import PageTitle from "../../components/ui/PageTitle";
import StatCard from "../../components/ui/StatCard";

import { getTerms } from "../../services/termsApi";
import {
  getCourses,
  getComments,
  getReserves,
} from "../../services/coursesApi";

import {
  getDashboardReport,
  getDashboardTechnologyReport,
} from "../../services/reportsApi";

import { normalizeList, pageParams } from "../../lib/apiData";
import { menuGroups } from "../../config/menu";
import { ADMIN_BASE } from "../../config/settings";

// Current panel stats
const cards = [
  {
    label: "Terms",
    icon: CalendarDays,
    to: "terms",
    load: () => getTerms(),
  },
  {
    label: "Courses",
    icon: GraduationCap,
    to: "courses",
    load: () => getCourses(pageParams({ rows: 1 })),
  },
  {
    label: "Unapproved comments",
    icon: MessageSquare,
    to: "comments",
    load: () => getComments(pageParams({ rows: 1, Accept: false })),
  },
  {
    label: "Reservations",
    icon: Bookmark,
    to: "reserves",
    load: () => getReserves(),
  },
];

const formatNumber = (value) => Number(value || 0).toLocaleString("fa-IR");

const formatMoney = (value) =>
  new Intl.NumberFormat("fa-IR").format(Number(value || 0));

function ReportCard({ title, children }) {
  return (
    <section
      className="card min-w-0 w-full overflow-hidden p-3 sm:p-5"
      data-reveal
    >
      <h3 className="mb-5 text-body font-semibold text-foreground">{title}</h3>

      {children}
    </section>
  );
}

function MetricCard({ title, value, icon: Icon }) {
  return (
    <div className="card flex min-w-0 items-center gap-3 p-3 sm:p-4">
      <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon size={21} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-caption text-muted-foreground">{title}</p>

        <p className="mt-1 truncate text-h2-sm font-bold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

const chartColors = ["#3B82F6", "#A855F7"];

function DonutReport({ title, data, loading }) {
  const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);

  return (
    <ReportCard title={title}>
      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Loading data...
        </div>
      ) : total > 0 ? (
        <div className="grid items-center gap-5 sm:grid-cols-2">
          <div className="relative mx-auto h-64 w-full max-w-[280px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter id="donutGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="65%"
                  outerRadius="85%"
                  paddingAngle={5}
                  stroke="none"
                  cornerRadius={5}
                  animationDuration={1200}
                >
                  {data.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={chartColors[index % chartColors.length]}
                      filter="url(#donutGlow)"
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [`${formatNumber(value)}%`, "Percent"]}
                  contentStyle={{
                    borderRadius: "14px",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    background: "#111827",
                    color: "#fff",
                    boxShadow: "0 0 25px rgba(139, 92, 246, 0.18)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-caption text-muted-foreground">Total</span>
              <strong className="mt-1 text-2xl font-bold text-foreground">
                {formatNumber(total)}%
              </strong>
            </div>
          </div>

          <div className="space-y-5">
            {data.map((item, index) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          chartColors[index % chartColors.length],
                      }}
                    />
                    <span className="text-body-sm text-muted-foreground">
                      {item.name}
                    </span>
                  </div>

                  <strong className="text-body-sm text-foreground">
                    {formatNumber(item.value)}%
                  </strong>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.max(0, Math.min(100, Number(item.value) || 0))}%`,
                      backgroundColor: chartColors[index % chartColors.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          No data to display.
        </div>
      )}
    </ReportCard>
  );
}

export default function Dashboard() {
  const [totals, setTotals] = useState(cards.map(() => null));

  const [report, setReport] = useState(null);
  const [technologies, setTechnologies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    const results = await Promise.allSettled([
      ...cards.map((card) => card.load()),
      getDashboardReport(),
      getDashboardTechnologyReport(),
    ]);

    const cardResults = results.slice(0, cards.length);

    setTotals(
      cardResults.map((result) =>
        result.status === "fulfilled"
          ? normalizeList(result.value.data).total.toLocaleString("fa-IR")
          : "?",
      ),
    );

    const reportResult = results[cards.length];
    const technologyResult = results[cards.length + 1];

    if (reportResult.status === "fulfilled") {
      setReport(reportResult.value.data);
    }

    if (technologyResult.status === "fulfilled") {
      const data = technologyResult.value.data;

      setTechnologies(
        Array.isArray(data)
          ? data
              .filter((item) => item.countUsed > 0)
              .sort((a, b) => b.countUsed - a.countUsed)
          : [],
      );
    }

    if (
      reportResult.status === "rejected" &&
      technologyResult.status === "rejected"
    ) {
      setError("Failed to load dashboard reports.");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <>
      <PageTitle title="Dashboard" subtitle="Academy overview" />
      {/* Current panel stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <StatCard
            key={card.label}
            label={card.label}
            icon={card.icon}
            to={`${ADMIN_BASE}/${card.to}`}
            value={totals[index] ?? "..."}
          />
        ))}
      </div>
      {/* Main reports */}
      <div className="mb-5 mt-10 flex items-center justify-between gap-3">
        <h2 className="text-h2-sm font-semibold text-foreground">Reports</h2>

        <button
          type="button"
          onClick={loadDashboard}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-caption text-foreground transition hover:bg-muted disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>
      {error && (
        <div className="mb-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-body-sm text-destructive">
          {error}
        </div>
      )}
      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total users"
          value={report ? formatNumber(report.allUser) : "..."}
          icon={Users}
        />

        <MetricCard
          title="Incomplete users"
          value={report ? formatNumber(report.inCompeletUserCount) : "..."}
          icon={UserCheck}
        />

        <MetricCard
          title="Total reservations"
          value={report ? formatNumber(report.allReserve) : "..."}
          icon={Bookmark}
        />

        <MetricCard
          title="Total payments"
          value={report ? formatMoney(report.allPaymentCost) : "..."}
          icon={CreditCard}
        />
      </div>
      {/* Chart reports */}
      <div className="mt-6 space-y-5">
        {/* Status charts */}
        <div className="grid gap-5 xl:grid-cols-2">
          <DonutReport
            title="User status"
            loading={loading && !report}
            data={
              report
                ? [
                    {
                      name: "Active users",
                      value: Number(report.activeUserPercent || 0),
                    },
                    {
                      name: "Inactive users",
                      value: Number(report.interActiveUserPercent || 0),
                    },
                  ]
                : []
            }
          />

          <DonutReport
            title="Reservation status"
            loading={loading && !report}
            data={
              report
                ? [
                    {
                      name: "Approved reservations",
                      value: Number(report.reserveAcceptPercent || 0),
                    },
                    {
                      name: "Unapproved reservations",
                      value: Number(report.reserveNotAcceptPercent || 0),
                    },
                  ]
                : []
            }
          />
        </div>

        {/* Technology chart */}
        <ReportCard title="Technology usage across courses">
          {loading && technologies.length === 0 ? (
            <div className="flex h-80 items-center justify-center text-muted-foreground">
              Loading data...
            </div>
          ) : technologies.length > 0 ? (
            <div className="h-80 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={technologies}
                  margin={{ top: 25, right: 20, left: 5, bottom: 65 }}
                >
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>

                    <filter
                      id="lineGlow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 5"
                    vertical={false}
                    stroke="#64748b"
                    opacity={0.16}
                  />

                  <XAxis
                    dataKey="techName"
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={75}
                    tick={{ fill: "currentColor", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    type="number"
                    domain={[0, "dataMax"]}
                    allowDecimals={false}
                    tickCount={6}
                    interval={0}
                    tickFormatter={(value) =>
                      Number(value).toLocaleString("fa-IR")
                    }
                    tick={{ fill: "currentColor", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    formatter={(value) => [
                      Number(value).toLocaleString("fa-IR"),
                      "Usage count",
                    ]}
                    contentStyle={{
                      borderRadius: "14px",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      background: "#111827",
                      color: "#fff",
                      boxShadow: "0 0 25px rgba(139, 92, 246, 0.18)",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="countUsed"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#8B5CF6",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#A855F7",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    filter="url(#lineGlow)"
                    animationDuration={1200}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-80 items-center justify-center text-muted-foreground">
              No data to display.
            </div>
          )}
        </ReportCard>
      </div>
      <h2 className="mb-3 mt-10 text-h2-sm text-foreground" data-reveal>
        Panel sections
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {menuGroups
          .flatMap((group) => group.items)
          .filter((item) => item.path)
          .map(({ label, path, icon: Icon, ready }) => (
            <Link
              key={path}
              to={`${ADMIN_BASE}/${path}`}
              data-reveal
              className="card flex items-center gap-3 bg-card px-4 py-3 text-body-sm transition-colors hover:border-primary"
            >
              <Icon size={18} className="text-primary" />

              <span className="flex-1">{label}</span>

              {!ready && (
                <span className="text-caption text-muted-foreground">
                  Coming soon
                </span>
              )}
            </Link>
          ))}
      </div>
    </>
  );
}
