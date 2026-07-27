import { useState } from "react";

import Card from "../../../components/ui/Card";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";

import { useUpdateLead } from "../hooks/useUpdateLead";
import type { LeadDetailView } from "../mappers";

interface Props {
  lead: LeadDetailView;
}

export default function LeadManagementCard({
  lead,
}: Props) {
  const [status, setStatus] = useState(
    lead.status
  );

  const [notes, setNotes] = useState(
    lead.notes
  );

  const updateLeadMutation = useUpdateLead();

  function save() {
    updateLeadMutation.mutate({
      id: lead.id,

      data: {
        status,
        notes,
      },
    });
  }

  return (
    <Card>
      <h2 className="mb-5 text-lg font-semibold">
        Lead Management
      </h2>

      <div className="space-y-5">
        <Select
          value={status}
          onChange={(value) =>
            setStatus(value as typeof status)
          }
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
            {
              label: "Ignore",
              value: "IGNORE",
            },
          ]}
        />

        <TextArea
          value={notes}
          onChange={(value) =>
            setNotes(value)
          }
          placeholder="Add notes..."
        />

        <Button
          onClick={save}
          disabled={updateLeadMutation.isPending}
        >
          {updateLeadMutation.isPending
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}