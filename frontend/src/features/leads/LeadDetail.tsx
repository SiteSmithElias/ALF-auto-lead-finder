import Section from "../../components/ui/Section";
import LeadHeader from "./components/LeadHeader";
import LeadInfoCard from "./components/LeadInfoCard";
import LeadManagementCard from "./components/LeadManagementCard";
import ContactCard from "./components/ContactCard";

const mockLead = {
  business: "John Plumbing",
  category: "Plumbing",
  status: "NEW",
  score: 85,
  phone: "047xxx",
  email: "",
  hasWebsite: false,
};

export default function LeadDetail() {
  return (
    <Section>
      <LeadHeader
        name={mockLead.business}
        category={mockLead.category}
        status={mockLead.status}
        score={mockLead.score}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <LeadInfoCard
          lead={mockLead}
        />

        <LeadManagementCard />
      </div>

      <ContactCard />
    </Section>
  );
}