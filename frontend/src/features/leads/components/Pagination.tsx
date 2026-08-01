import Button from "../../../components/ui/Button";

interface Props {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  total,
  onChange,
}: Props) {
  const pageSize = 20;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="secondary"
        onClick={() => onChange(Math.max(1, page - 1))}
      >
        Previous
      </Button>

      <span>
        Page {page} of {totalPages}
      </span>

      <Button
        variant="secondary"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
      >
        Next
      </Button>
    </div>
  );
}