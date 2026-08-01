import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";

import LeadFilters from "./components/LeadFilters";
import LeadTable from "./components/LeadTable";
import Pagination from "./components/Pagination";

import { useLeads } from "./hooks/useLeads";
import type { LeadStatus } from "./types";


interface Filters {
    search: string;
    status?: LeadStatus;
    hasWebsite?: boolean;
}


export default function Leads() {

    const navigate = useNavigate();


    const [filters, setFilters] = useState<Filters>({
        search: "",
    });
    const [page, setPage] = useState(1);


    const {
        data,
        isLoading,
        isError,
        error,
    } = useLeads({
        ...filters,
        page,
        limit: 20,
    });


    const leads = data?.items ?? [];


    if (isLoading && !data) {
        return (
            <Section>
                <Loading />
            </Section>
        );
    }


    if (isError) {
        return (
            <Section>
                <ErrorState
                    title="Couldn't load leads"
                    message={
                        error instanceof Error
                            ? error.message
                            : "Unknown error"
                    }
                />
            </Section>
        );
    }


    return (
        <Section>

            <PageHeader
                title="Lead Database"
                description="Manage discovered businesses and potential clients"
            />


            <LeadFilters
                filters={filters}
                onChange={(nextFilters) => {
                    setFilters(nextFilters);
                    setPage(1);
                }}
            />


            <LeadTable
                leads={leads}
                onSelect={(lead) => {
                    navigate(`/leads/${lead.id}`);
                }}
            />


            <Pagination
                page={page}
                total={data?.total ?? 0}
                onChange={setPage}
            />

        </Section>
    );
}