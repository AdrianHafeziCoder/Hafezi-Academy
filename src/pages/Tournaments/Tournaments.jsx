import { useEffect, useState } from "react";
import * as yup from "yup";
import { Plus, Trophy, Users, Target, Eye } from "lucide-react";
import ListPage from "../../components/ui/ListPage";
import Button from "../../components/ui/Button";
import FormModal from "../../components/ui/FormModal";
import RowAction from "../../components/ui/RowAction";
import Modal from "../../components/ui/Modal";
import StatusBadge from "../../components/ui/StatusBadge";
import { useRefresh } from "../../hooks/useRefresh";
import { pick } from "../../lib/apiData";
import {
  getTournaments,
  getTournamentFull,
  createTournament,
  getMentors,
  createMentor,
  getScoreCriteria,
  createScoreCriterion,
} from "../../services/tournamentsApi";

const tId = (t) => pick(t, ["id", "tournamentId", "Id"]);
const tTitle = (t) => pick(t, ["name", "title", "tournamentName"]) || "—";
const tStatus = (t) => pick(t, ["status", "state"]) ?? "—";
const tDate = (t) => pick(t, ["startDate", "createdAt", "date"]) || "—";

const mId = (m) => pick(m, ["id", "mentorId", "Id"]);
const mName = (m) => pick(m, ["name", "fullName", "userName"]) || "—";

const cId = (c) => pick(c, ["id", "criterionId", "Id"]);
const cTitle = (c) => pick(c, ["name", "title", "criterionTitle"]) || "—";
const cMin = (c) => pick(c, ["min", "minScore"]) ?? "—";
const cMax = (c) => pick(c, ["max", "maxScore"]) ?? "—";

const tournamentColumns = [
  {
    label: "Tournament",
    render: (t) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-warning/15 text-amber-600">
          <Trophy size={17} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{tTitle(t)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {tId(t) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Status",
    render: (t) => (
      <StatusBadge
        tone={
          tStatus(t) === true || tStatus(t) === "active" ? "success" : "warning"
        }
      >
        {String(tStatus(t))}
      </StatusBadge>
    ),
  },
  { label: "Date", render: (t) => <span dir="ltr">{tDate(t)}</span> },
];

const mentorColumns = [
  {
    label: "Mentor",
    render: (m) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
          <Users size={17} />
        </span>
        <div>
          <p className="font-semibold text-foreground">{mName(m)}</p>
          <p className="text-[11px] text-muted-foreground">
            ID: {mId(m) ?? "—"}
          </p>
        </div>
      </div>
    ),
  },
];

const criterionColumns = [
  {
    label: "Criterion",
    render: (c) => (
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
          <Target size={17} />
        </span>
        <p className="font-semibold text-foreground">{cTitle(c)}</p>
      </div>
    ),
  },
  { label: "Minimum", render: (c) => cMin(c) },
  { label: "Maximum", render: (c) => cMax(c) },
];

const tournamentSchema = yup.object({
  name: yup.string().trim().required("Tournament name is required"),
  termId: yup.string().trim().required("Term ID is required"),
  courseId: yup.string().trim().required("Course ID is required"),
});
const mentorSchema = yup.object({
  name: yup.string().trim().required("Mentor name is required"),
});
const criterionSchema = yup.object({
  name: yup.string().trim().required("Criterion name is required"),
  min: yup.number().min(0).required("Minimum score is required"),
  max: yup.number().min(0).required("Maximum score is required"),
});

const tournamentFields = [
  { name: "name", label: "Tournament name" },
  { name: "termId", label: "Term ID" },
  { name: "courseId", label: "Course ID" },
];
const mentorFields = [{ name: "name", label: "Mentor name" }];
const criterionFields = [
  { name: "name", label: "Criterion name" },
  { name: "min", label: "Minimum score", type: "number" },
  { name: "max", label: "Maximum score", type: "number" },
];

function TournamentDetails({ tournament, onClose }) {
  const [details, setDetails] = useState(tournament);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = tId(tournament);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getTournamentFull(id)
      .then((res) => setDetails(res.data?.data ?? res.data?.result ?? res.data))
      .catch((err) =>
        setError(err?.response?.data?.message || "Failed to load details"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const info = [
    ["Name", tTitle(details)],
    ["ID", id],
    ["Status", tStatus(details)],
    ["Date", tDate(details)],
  ];

  return (
    <Modal title="Tournament details" onClose={onClose}>
      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Loading…
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {info.map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl bg-surface-2 p-3 dark:bg-muted"
            >
              <p className="mb-1 text-xs text-muted-foreground">{label}</p>
              <p className="break-words text-sm font-medium">{value || "—"}</p>
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-3 text-sm text-error">{error}</p>}
    </Modal>
  );
}

const TABS = [
  { key: "tournaments", label: "Tournaments" },
  { key: "mentors", label: "Mentors" },
  { key: "criteria", label: "Score criteria" },
];

export default function Tournaments() {
  const { key, refresh } = useRefresh();
  const [tab, setTab] = useState("tournaments");
  const [creatingT, setCreatingT] = useState(false);
  const [creatingM, setCreatingM] = useState(false);
  const [creatingC, setCreatingC] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const saveTournament = async (values) => {
    await createTournament(values);
    refresh();
  };
  const saveMentor = async (values) => {
    await createMentor(values);
    refresh();
  };
  const saveCriterion = async (values) => {
    await createScoreCriterion({
      name: values.name,
      tournamentId: tId(selectedTournament),
      min: Number(values.min),
      max: Number(values.max),
    });
    refresh();
  };

  const onSelectTournament = (t) => {
    setSelectedTournament(t);
    setTab("criteria");
  };

  return (
    <>
      <div className="mb-4 flex gap-2 border-b border-hairline" data-reveal>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-body-sm font-medium transition-colors ${
              tab === t.key
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "tournaments" && (
        <ListPage
          title="Tournaments"
          subtitle="Manage tournaments (admin section)"
          fetcher={getTournaments}
          paged={false}
          refreshKey={key}
          columns={tournamentColumns}
          toolbar={
            <Button onClick={() => setCreatingT(true)}>
              <Plus size={16} /> New tournament
            </Button>
          }
          rowActions={(t) => (
            <>
              <RowAction
                icon={Eye}
                label="Details"
                onClick={() => setViewing(t)}
              />
              <RowAction
                icon={Target}
                label="Score criteria"
                onClick={() => onSelectTournament(t)}
              />
            </>
          )}
        />
      )}

      {tab === "mentors" && (
        <ListPage
          title="Mentors"
          subtitle="Manage tournament mentors"
          fetcher={getMentors}
          paged={false}
          refreshKey={key}
          columns={mentorColumns}
          toolbar={
            <Button onClick={() => setCreatingM(true)}>
              <Plus size={16} /> New mentor
            </Button>
          }
        />
      )}

      {tab === "criteria" && (
        <>
          <div
            className="mb-3 rounded-2xl bg-surface-2 px-4 py-2 text-body-sm dark:bg-muted"
            data-reveal
          >
            {selectedTournament ? (
              <>
                Tournament criteria: <strong>{tTitle(selectedTournament)}</strong>
              </>
            ) : (
              <>To see the criteria, select a tournament from the “Tournaments” tab.</>
            )}
          </div>
          {selectedTournament && (
            <ListPage
              title="Score criteria"
              subtitle=""
              fetcher={() => getScoreCriteria(tId(selectedTournament))}
              paged={false}
              refreshKey={key}
              columns={criterionColumns}
              toolbar={
                <Button onClick={() => setCreatingC(true)}>
                  <Plus size={16} /> New criterion
                </Button>
              }
            />
          )}
        </>
      )}

      {creatingT && (
        <FormModal
          title="New tournament"
          fields={tournamentFields}
          initialValues={{ name: "", termId: "", courseId: "" }}
          schema={tournamentSchema}
          onSubmit={saveTournament}
          onClose={() => setCreatingT(false)}
          successText="Tournament created"
        />
      )}

      {creatingM && (
        <FormModal
          title="New mentor"
          fields={mentorFields}
          initialValues={{ name: "" }}
          schema={mentorSchema}
          onSubmit={saveMentor}
          onClose={() => setCreatingM(false)}
          successText="Mentor created"
        />
      )}

      {creatingC && (
        <FormModal
          title="New score criterion"
          fields={criterionFields}
          initialValues={{ name: "", min: "", max: "" }}
          schema={criterionSchema}
          onSubmit={saveCriterion}
          onClose={() => setCreatingC(false)}
          successText="Criterion created"
        />
      )}

      {viewing && (
        <TournamentDetails
          tournament={viewing}
          onClose={() => setViewing(null)}
        />
      )}
    </>
  );
}
