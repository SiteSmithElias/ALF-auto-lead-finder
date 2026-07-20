import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";

import MetricCard from "./components/MetricCard";
import PipelineCard from "./components/PipelineCard";
import RecentSearches from "./components/RecentSearches";

const metrics = [
  {
    title: "Businesses Discovered",
    value: "12,430",
    description: "Total businesses found",
    trend: "+342 this week",
  },
  {
    title: "Active Leads",
    value: "850",
    description: "Potential customers",
  },
  {
    title: "Clients",
    value: "34",
    description: "Converted customers",
  },
  {
    title: "Conversion Rate",
    value: "4.2%",
    description: "Lead conversion",
  },
];

export default function Dashboard() {
  return (
    <Section>
      <PageHeader
        title="Dashboard"
        description="Overview of your lead generation activity"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            {...metric}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <PipelineCard />

        <RecentSearches />
      </div>
    </Section>
  );
}