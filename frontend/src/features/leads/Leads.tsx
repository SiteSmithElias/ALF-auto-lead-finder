import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import LeadFilters from "./components/LeadFilters";
import LeadTable from "./components/LeadTable";
import Pagination from "./components/Pagination";
import { useNavigate } from "react-router-dom";
import type { Lead } from "./types";

const mockLeads: Lead[] = [
  {
    id: 1,
    business: "John Plumbing",
    category: "Plumbing",
    phone: "047xxx",
    score: 85,
    status: "NEW",
    hasWebsite: false,
    discoveredAt: "2026-07-20",
  },
  {
    id: 2,
    business: "Cafe Roma",
    category: "Restaurant",
    phone: "02xxx",
    score: 40,
    status: "REJECTED",
    hasWebsite: true,
    discoveredAt: "2026-07-19",
  },
];

export default function Leads() {
  const navigate = useNavigate();
  return (
    <Section>
      <PageHeader
        title="Lead Database"
        description="Manage discovered businesses and potential clients"
      />

      <LeadFilters />

      <LeadTable
        leads={mockLeads}
        onSelect={(lead)=>{
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