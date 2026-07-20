import { useState } from "react";
import LeadInfoCard from "./components/LeadInfoCard";
import LeadManagementCard from "./components/LeadManagementCard";
import type { LeadStatus } from "./lead";

export default function LeadDetail() {
  const [status, setStatus] = useState<LeadStatus>("NEW");
  const [notes, setNotes] = useState("");

  const lead = {
    id: 1,
    business: "Plomberie Thomas",
    category: "Plumbing",
    phone: "047123456",
    email: "contact@test.com",
    website: "",
    score: 92,
    status,
    hasWebsite: false,
    discoveredAt: "2026-07-20",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {lead.business}
        </h1>

        <p className="opacity-70 mt-2">
          Lead Score: {lead.score}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <LeadInfoCard lead={lead} />

        <LeadManagementCard
          status={status}
          notes={notes}
          onStatusChange={setStatus}
          onNotesChange={setNotes}
        />
      </div>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
        Save Changes
      </button>
    </div>
  );
}