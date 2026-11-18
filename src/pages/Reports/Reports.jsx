import { useEffect, useState } from "react";
import {
  FileText,
  Cpu,
  Users,
  Bookmark,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import PageTitle from "../../components/ui/PageTitle";
import Button from "../../components/ui/Button";
import StatCard from "../../components/ui/StatCard";
import { toast } from "sonner";
import { errorText, pick } from "../../lib/apiData";
import {
  getDashboardReport,
  getDashboardTechnologyReport,
} from "../../services/reportsApi";

export default function Reports() {
  const [main, setMain] = useState(null);
  const [tech, setTech] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [r1, r2] = await Promise.all([
        getDashboardReport(),
        getDashboardTechnologyReport(),
      ]);
      setMain(r1.data?.data ?? r1.data?.result ?? r1.data);
      setTech(r2.data?.data ?? r2.data?.result ?? r2.data);
      toast.success("Reports refreshed");
    } catch (err) {
      toast.error(errorText(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats = [
    {
      label: "Total users",
      value: pick(main, ["totalUsers", "userCount", "usersCount"]) ?? "—",
      icon: Users,
    },
    {
      label: "Total reservations",
      value:
        pick(main, ["totalReserves", "reserveCount", "reservesCount"]) ?? "—",
      icon: Bookmark,
    },
    {
      label: "Total payments",
      value:
        pick(main, ["totalPayments", "paymentAmount", "totalIncome"]) ?? "—",
      icon: CreditCard,
    },
  ];

  const techList = Array.isArray(tech?.technologies)
    ? tech.technologies
    : Array.isArray(tech)
      ? tech
      : [];

  return (
    <>
      <PageTitle title="Reports" subtitle="Statistical and technical reports">
        <Button onClick={load} disabled={loading}>
          <RefreshCw size={16} /> {loading ? "…" : "Refresh"}
        </Button>
      </PageTitle>

      {/* Stat cards */}
      <div
        className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        data-reveal
      >
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={String(s.value)}
            icon={s.icon}
          />
        ))}
      </div>

      {/* Technologies */}
      <h2
        className="mb-3 flex items-center gap-2 text-h2-sm text-foreground"
        data-reveal
      >
        <Cpu size={18} /> Technology usage
      </h2>
      <div
        className="overflow-x-auto rounded-2xl border border-hairline bg-card"
        data-reveal
      >
        <table className="w-full min-w-[480px] border-collapse">
          <thead className="bg-surface-2 dark:bg-muted">
            <tr className="h-11">
              <th className="th">Technology</th>
              <th className="th">Number of courses</th>
            </tr>
          </thead>
          <tbody>
            {techList.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="h-24 text-center text-body-sm text-muted-foreground"
                >
                  No data available
                </td>
              </tr>
            )}
            {techList.map((t, i) => (
              <tr key={i} className="h-12 border-t border-hairline">
                <td className="td">
                  {pick(t, ["techName", "name", "technologyName"]) || "—"}
                </td>
                <td className="td">
                  {pick(t, ["courseCount", "count", "usageCount"]) ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
