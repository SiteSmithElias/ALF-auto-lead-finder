import Card from "../../../components/ui/Card";
import type { LeadDetailView } from "../mappers";

interface Props {
    lead:LeadDetailView;
}

export default function LeadInfoCard({
  lead,
}: Props) {
  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">
        Business Information
      </h2>

      <div className="space-y-3">
        <p>
          <strong>Name:</strong> {lead.business}
        </p>

        <p>
          <strong>Category:</strong> {lead.category}
        </p>

        <p>
          <strong>Phone:</strong> {lead.phone ?? "-"}
        </p>

        <p>
          <strong>Email:</strong> {lead.email ?? "-"}
        </p>

        <p>
          <strong>Website:</strong>
          {lead.hasWebsite ? " Available" : " No website"}
        </p>
      </div>
    </Card>
  );
}