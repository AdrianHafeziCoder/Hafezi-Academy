import { useState } from "react";
import { toast } from "sonner";
import Modal from "./Modal";
import Button from "./Button";
import { errorText } from "../../lib/apiData";

// Confirmation dialog
export default function ConfirmDialog({
  message,
  confirmText = "Yes, proceed",
  onConfirm,
  onClose,
}) {
  const [sending, setSending] = useState(false);

  const sure = async () => {
    setSending(true);
    try {
      const ok = await onConfirm();
      if (ok === false) return setSending(false); // The error was already shown, keep the dialog open
      onClose();
    } catch (err) {
      toast.error(errorText(err));
      setSending(false);
    }
  };

  return (
    <Modal title="Confirm action" onClose={onClose}>
      <p className="mb-6 text-body-sm text-muted-foreground">{message}</p>
      <div className="flex justify-end gap-2">
        <Button look="ghost" sending={sending} onClick={onClose}>
          Cancel
        </Button>
        <Button look="danger" sending={sending} onClick={sure}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
