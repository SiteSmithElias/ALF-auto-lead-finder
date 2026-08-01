import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

interface Props {
  status: string;
  found: number;
  percentage: number;
  completed?: boolean;
  failed?: boolean;
  onViewLeads?: () => void;
}

export default function DiscoveryProgress({
  status,
  found,
  percentage,
  completed = false,
  failed = false,
  onViewLeads,
}: Props) {
  return (
    <Card>
      <div className="space-y-5">
        <h2 className="text-lg font-semibold">
          Discovery Progress
        </h2>
        <p className="text-[var(--muted)]">
          {failed
            ? "Discovery failed."
            : completed
            ? "Discovery completed."
            : status}
        </p>
        <div>
          <p>
            Businesses Found:
            <strong className="ml-2">
              {found}
            </strong>
          </p>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[var(--hover)]">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
        {completed && (
          <Button
            onClick={onViewLeads}
          >
            View Leads
          </Button>
        )}
      </div>
    </Card>
  );
}