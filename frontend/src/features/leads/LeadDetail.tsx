import { useParams } from "react-router-dom";
import Section from "../../components/ui/Section";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import LeadHeader from "./components/LeadHeader";
import LeadInfoCard from "./components/LeadInfoCard";
import LeadManagementCard from "./components/LeadManagementCard";
import ContactCard from "./components/ContactCard";
import { useLead } from "./hooks/useLeads";
import { mapLeadDetail } from "./mappers";
import LeadExcludeButton from "./components/LeadExcludeButton";

export default function LeadDetail() {
  const { id } = useParams();

  const {
    data: lead,
    isLoading,
    isError,
  } = useLead(Number(id));

  if (isLoading) {
    return (
      <Section>
        <Loading />
      </Section>
    );
  }

  if (isError || !lead) {
    return (
      <Section>
        <ErrorState message="Failed to load lead." />
      </Section>
    );
  }

  const mappedLead = mapLeadDetail(lead);

  return (
    <Section>
      <LeadHeader
        name={mappedLead.business}
        category={mappedLead.category}
        status={mappedLead.status}
        score={mappedLead.score}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <LeadInfoCard lead={mappedLead} />

        <LeadManagementCard lead={mappedLead} />
      </div>

      <ContactCard leadId={mappedLead.id} />

        <div className="mt-6"> 
          <LeadExcludeButton leadId={lead.id}/>
        </div>
    </Section>
  );
}