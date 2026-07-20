import Card from "../../../components/ui/Card";

interface Props {
  status: string;
  found: number;
  percentage: number;
}

export default function DiscoveryProgress({
  status,
  found,
  percentage,
}: Props) {
  return (
    <Card>
      <div className="space-y-5">
        <h2 className="text-lg font-semibold">
          Discovery Progress
        </h2>

        <p className="text-[var(--muted)]">
          {status}
        </p>

        <div>
          <p>
            Businesses Found:
            <strong className="ml-2">
              {found}
            </strong>
          </p>
        </div>

        <div className="h-3 rounded-full bg-[var(--hover)] overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    </Card>
  );
}