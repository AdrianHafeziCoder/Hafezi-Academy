import { Hourglass } from "lucide-react";
import PageTitle from "../../components/ui/PageTitle";
import StatusBadge from "../../components/ui/StatusBadge";

// ===== Empty place for unfinished sections =====
// Used for all sections whose endpoints are not known yet
export default function ComingSoon({ title, tag, note }) {
  return (
    <>
      <PageTitle title={title}>
        {tag && <StatusBadge tone="warning">Swagger: {tag}</StatusBadge>}
      </PageTitle>
      <div
        className="card flex flex-col items-center gap-3 bg-card px-6 py-16 text-center"
        data-reveal
      >
        <span className="grid size-14 place-items-center rounded-full bg-primary-light text-primary">
          <Hourglass size={24} />
        </span>
        <h2 className="text-h2-sm text-foreground">This section hasn't been built yet</h2>
        <p className="max-w-md text-body-sm text-muted-foreground">{note}</p>
      </div>
    </>
  );
}
