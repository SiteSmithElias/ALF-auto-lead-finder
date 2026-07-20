import Card from "../../../components/ui/Card";

interface Props {
  title: string;
  value: string;
  description: string;
  trend?: string;
}

export default function MetricCard({
  title,
  value,
  description,
  trend,
}: Props) {
  return (
    <Card>
      <div className="space-y-3">
        <p className="text-sm text-[var(--muted)]">
          {title}
        </p>

        <h2 className="text-3xl font-bold">
          {value}
        </h2>

        <p className="text-sm text-[var(--muted)]">
          {description}
        </p>

        {trend && (
          <p className="text-sm text-green-600">
            {trend}
          </p>
        )}
      </div>
    </Card>
  );
}