import type { Lead } from "../lead";

export default function LeadInfoCard({ lead }: { lead: Lead }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-3">
      <h2 className="font-semibold text-lg">Business Information</h2>

      <p>
        <strong>Name:</strong> {lead.business}
      </p>

      <p>
        <strong>Category:</strong> {lead.category}
      </p>

      <p>
        <strong>Address:</strong> {lead.address || "-"}
      </p>

      <p>
        <strong>Phone:</strong> {lead.phone || "-"}
      </p>

      <p>
        <strong>Email:</strong> {lead.email || "-"}
      </p>

      <p>
        <strong>Website:</strong> {lead.website || "No website"}
      </p>
    </div>
  );
}