import { useState } from "react";
import { runAction } from "../lib/runAction";

// Changes refreshKey so the table reloads
export function useRefresh() {
  const [key, setKey] = useState(0);
  const refresh = () => setKey((n) => n + 1);
  // Run a task (e.g. delete), then refresh the table, and return success/failure
  const act = async (task, successText) => {
    const ok = await runAction(task, successText);
    if (ok) refresh();
    return ok;
  };
  return { key, refresh, act };
}
