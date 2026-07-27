import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";

import { useDeleteLead } from "../hooks/useLeads";

interface Props {
  leadId: number;
}

export default function LeadExcludeButton({
  leadId,
}: Props) {
  const navigate = useNavigate();

  const mutation = useDeleteLead();

  const [open, setOpen] = useState(false);

  function confirmDelete() {
    mutation.mutate(
      leadId,
      {
        onSuccess() {
          navigate("/leads");
        },
      }
    );
  }

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setOpen(true)}
      >
        Exclude Lead
      </Button>

      <ConfirmModal
        open={open}
        title="Exclude Lead?"
        message="This action cannot be undone. The lead will be removed from your pipeline."
        confirmText="Exclude"
        cancelText="Cancel"
        loading={mutation.isPending}
        onCancel={() => setOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}