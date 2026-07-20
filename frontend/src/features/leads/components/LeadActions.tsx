import Button from "../../../components/ui/Button";

interface Props {
  onView: () => void;
  onContact: () => void;
  onReject: () => void;
}

export default function LeadActions({
  onView,
  onContact,
  onReject,
}: Props) {
  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        onClick={onView}
      >
        View
      </Button>

      <Button
        variant="secondary"
        onClick={onContact}
      >
        Contact
      </Button>

      <Button
        variant="danger"
        onClick={onReject}
      >
        Reject
      </Button>
    </div>
  );
}