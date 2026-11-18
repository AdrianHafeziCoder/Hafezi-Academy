// Run an API task and show a toast (avoids repeating try/catch in every page)
import { toast } from "sonner";
import { errorText } from "./apiData";

export async function runAction(task, successText) {
  try {
    await task();
    toast.success(successText);
    return true;
  } catch (err) {
    toast.error(errorText(err));
    return false;
  }
}
