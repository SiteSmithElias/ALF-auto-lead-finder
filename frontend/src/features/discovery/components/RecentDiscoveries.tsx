import Card from "../../../components/ui/Card";

const searches = [
  "Plumbers Brussels",
  "Restaurants Antwerp",
  "Electricians Ghent",
];

export default function RecentDiscoveries() {
  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold">
        Recent Searches
      </h2>

      <div className="space-y-3">
        {searches.map((search) => (
          <div
            key={search}
            className="rounded-lg p-3 hover-surface"
          >
            {search}
          </div>
        ))}
      </div>
    </Card>
  );
}