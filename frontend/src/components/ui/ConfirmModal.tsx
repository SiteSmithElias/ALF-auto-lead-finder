import Button from "./Button";

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--background)]/70">
      <div
        className="w-full max-w-md rounded-xl border border-[var(--border)] p-6 shadow-xl"
        style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
      >
        <h2 className="text-xl font-semibold text-red-600">
          {title}
        </h2>

        <p className="mt-3 text-[var(--muted)]">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}