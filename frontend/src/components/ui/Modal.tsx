interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({
  open,
  title,
  children,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-[var(--surface)] p-6">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <div className="mt-4">
          {children}
        </div>

        <button
          onClick={onClose}
          className="mt-5 hover-surface rounded-lg px-4 py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}