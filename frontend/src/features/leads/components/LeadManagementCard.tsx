import Card from "../../../components/ui/Card";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import type { LeadDetailView } from "../mappers";

interface Props {
    lead:LeadDetailView;
}

export default function LeadManagementCard({ lead }: Props) {
  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">
        Lead Management
      </h2>

      <div className="space-y-5">
        <Select
          value={lead.status}
          onChange={() => {}}
          options={[
            {
              label: "New",
              value: "NEW",
            },
            {
              label: "Contacted",
              value: "CONTACTED",
            },
            {
              label: "Client",
              value: "CLIENT",
            },
            {
              label: "Rejected",
              value: "REJECTED",
            },
          ]}
        />

        <TextArea
          value={lead.notes ?? ""}
          onChange={() => {}}
          placeholder="Add notes..."
        />

        <Button>
          Save Changes
        </Button>
      </div>
    </Card>
  );
}