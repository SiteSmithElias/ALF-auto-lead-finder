import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

import {
  useContacts,
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

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Contacts
        </h2>

        <Button>
          Add Contact
        </Button>
      </div>

      <div className="mt-5 space-y-3">
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
            className="rounded-lg p-4 hover-surface"
          >
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
        ))}
      </div>
    </Card>
  );
}