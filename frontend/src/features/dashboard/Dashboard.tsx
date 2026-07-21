import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import MetricCard from "./components/MetricCard";
import PipelineCard from "./components/PipelineCard";
import RecentSearches from "./components/RecentSearches";
import {
    useDashboardMetrics
} from "./hooks/useDashboard";


export default function Dashboard() {
    const {
        data,
        isLoading,
        isError
    } = useDashboardMetrics();

    if(isLoading){
        return (
            <Section>
                Loading dashboard...
            </Section>
        );
    }
    if(isError || !data){
        return (
            <Section>
                Failed to load dashboard
            </Section>
        );
    }

    const metrics = [
        {
            title:"Businesses Discovered",
            value:data.businesses_discovered.toLocaleString(),
            description:"Total businesses found"
        },
        {
            title:"Active Leads",
            value:data.total_leads.toLocaleString(),
            description:"Potential customers"
        },
        {
            title:"Clients",
            value:data.clients.toLocaleString(),
            description:"Converted customers"
        },
        {
            title:"Conversion Rate",
            value:`${data.conversion_rate}%`,
            description:"Lead conversion"
        }
    ];

    return (
        <Section>
            <PageHeader
                title="Dashboard"
                description="Overview of your lead generation activity"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric)=>(
                    <MetricCard
                        key={metric.title}
                        {...metric}
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <PipelineCard
                    statuses={[
                        {
                            name:"New",
                            amount:data.total_leads - data.contacted,
                            color:"bg-blue-500"
                        },
                        {
                            name:"Contacted",
                            amount:data.contacted,
                            color:"bg-yellow-500"
                        },
                        {
                            name:"Clients",
                            amount:data.clients,
                            color:"bg-green-500"
                        }
                    ]}

                />
                <RecentSearches />
            </div>
        </Section>
    );
}