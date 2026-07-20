import StatusBadge from "./StatusBadge";

interface Props {
  name: string;
  category: string;
  status: any;
  score: number;
}

export default function LeadHeader({
  name,
  category,
  status,
  score,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          {name}
        </h1>

        <p className="text-[var(--muted)]">
          {category}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <StatusBadge status={status} />

        <div className="rounded-lg bg-[var(--hover)] px-4 py-2">
          Score:
          <strong className="ml-2">
            {score}
          </strong>
        </div>
      </div>
    </div>
  );
}