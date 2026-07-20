interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-4 py-2 rounded border border-[var(--border)]"
      >
        Previous
      </button>

      <span className="px-4 py-2">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-4 py-2 rounded border border-[var(--border)]"
      >
        Next
      </button>
    </div>
  );
}