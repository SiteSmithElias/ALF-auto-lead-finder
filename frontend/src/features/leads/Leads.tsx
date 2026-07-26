import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import LeadFilters from "./components/LeadFilters";
import LeadTable from "./components/LeadTable";
import Pagination from "./components/Pagination";
import { useLeads } from "./hooks/useLeads";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";

export default function Leads() {
    const navigate = useNavigate();

    const {
    data,
    isLoading,
    isError,
    error,
    } = useLeads();

const leads = data?.items ?? [];

    if (isLoading) {
    return (
        <Section>
            <Loading />
        </Section>
      );
    }

    if (isError) {
        return (
            <Section>
                <ErrorState title="Couldn't load leads" message={error instanceof Error ? error.message : "Unknown error"} />
            </Section>
        );
    }

    return (
        <Section>
            <PageHeader
                title="Lead Database"
                description="Manage discovered businesses and potential clients"
            />

            <LeadFilters />

            <LeadTable
                leads={leads}
                onSelect={(lead) => {
                    navigate(`/leads/${lead.id}`);
                }}
            />

            <Pagination
                page={1}
                total={100}
                onChange={(page) => console.log(page)}
            />
        </Section>
    );
}