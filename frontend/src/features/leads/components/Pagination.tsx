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
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="secondary"
        onClick={() => onChange(page - 1)}
      >
        Previous
      </Button>

      <span>
        Page {page}
      </span>

      <Button
        variant="secondary"
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}