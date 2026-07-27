import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { useState } from "react";
import ContactForm from "./ContactForm";

import {
  useContacts,
  useCreateContact,
  useDeleteContact,
  useUpdateContact,
} from "../hooks/useContacts";

interface Props {
  leadId: number;
}

export default function ContactCard({
  leadId,
}: Props) {
  const {
    data: contacts = [],
    isLoading,
  } = useContacts(leadId);

  const createMutation = useCreateContact();
  const deleteMutation = useDeleteContact();
  const updateMutation = useUpdateContact();

  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Contacts
        </h2>

        <Button
          onClick={() => setAdding(!adding)}
        >
          {adding ? "Cancel" : "Add Contact"}
        </Button>
      </div>

      {adding && (
        <div className="mt-5">
          <ContactForm
            loading={createMutation.isPending}
            onSubmit={(data) => {
              createMutation.mutate(
                {
                  leadId,
                  data,
                },
                {
                  onSuccess() {
                    setAdding(false);
                  },
                }
              );
            }}
          />
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {isLoading && (
          <p>
            Loading contacts...
          </p>
        )}

        {!isLoading && contacts.length === 0 && (
          <div className="rounded-lg p-4 hover-surface">
            No contacts added
          </div>
        )}

        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="rounded-lg border border-[var(--border)] p-4 hover-surface"
          >
            {editing === contact.id ? (
              <ContactForm
                initialData={{
                  name: contact.name,
                  email: contact.email ?? "",
                  phone: contact.phone ?? "",
                  role: contact.role ?? "",
                }}
                loading={updateMutation.isPending}
                onSubmit={(data) => {
                  updateMutation.mutate(
                    {
                      id: contact.id,
                      data,
                    },
                    {
                      onSuccess() {
                        setEditing(null);
                      },
                    }
                  );
                }}
              />
            ) : (
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">
                    {contact.name}
                  </p>

                  <p className="text-sm text-[var(--muted)]">
                    {contact.role ?? "Unknown role"}
                  </p>

                  <p>
                    {contact.email ?? "-"}
                  </p>

                  <p>
                    {contact.phone ?? "-"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setEditing(contact.id)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      deleteMutation.mutate(contact.id)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}