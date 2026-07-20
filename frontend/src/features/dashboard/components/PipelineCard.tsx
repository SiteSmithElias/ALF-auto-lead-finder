import Card from "../../../components/ui/Card";

const statuses = [
  {
    name: "New",
    amount: 120,
    color: "bg-blue-500",
  },
  {
    name: "Contacted",
    amount: 54,
    color: "bg-yellow-500",
  },
  {
    name: "Clients",
    amount: 23,
    color: "bg-green-500",
  },
];

export default function PipelineCard() {
  return (
    <Card>
      <h2 className="font-semibold mb-5">Lead Pipeline</h2>

      <div className="flex justify-between">
        {statuses.map((status) => (
          <div key={status.name}>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <span>{status.name}</span>
            </div>

            <p className="text-2xl font-bold mt-2">
              {status.amount}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}