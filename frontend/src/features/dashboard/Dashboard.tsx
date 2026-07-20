import MetricCard from "./components/MetricCard";
import PipelineCard from "./components/PipelineCard";
import RecentSearches from "./components/RecentSearches";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="opacity-70 mt-2">
          Overview of your lead generation activity
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <MetricCard title="Businesses Discovered" value="12,430" />
        <MetricCard title="Total Leads" value="542" />
        <MetricCard title="Clients" value="23" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <MetricCard title="Contacted" value="140" />
        <MetricCard title="Conversion Rate" value="4.2%" />
      </div>

      <PipelineCard />

      <RecentSearches />
    </div>
  );
}