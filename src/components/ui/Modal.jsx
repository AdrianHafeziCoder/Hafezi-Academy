import { Dialog } from "radix-ui";
import { X } from "lucide-react";

// Popup window. The parent opens and closes it with {show && <Modal/>}
export default function Modal({ title, onClose, children }) {
  return (
    <Dialog.Root open onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          dir="ltr"
          className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-hairline bg-card p-6 shadow-hafezi-4"
        >
          <Dialog.Title className="mb-5 text-h2-sm text-foreground">
            {title}
          </Dialog.Title>
          <Dialog.Description className="sr-only">{title}</Dialog.Description>
          {children}
          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close"
              className="icon-btn absolute right-4 top-4 size-8"
            >
              <X size={15} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
