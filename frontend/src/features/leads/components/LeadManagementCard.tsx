import type { LeadStatus } from "../../types/lead";

interface Props {
  status: LeadStatus;
  notes: string;
  onStatusChange: (value: LeadStatus) => void;
  onNotesChange: (value: string) => void;
}

export default function LeadManagementCard({
  status,
  notes,
  onStatusChange,
  onNotesChange,
}: Props) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-5">
      <h2 className="font-semibold text-lg">Lead Management</h2>

      <div>
        <label className="block mb-2 opacity-70">
          Status
        </label>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
          className="px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
        >
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="REJECTED">Rejected</option>
          <option value="CLIENT">Client</option>
          <option value="UNKNOWN">Unknown</option>
          <option value="IGNORE">Ignore</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 opacity-70">
          Notes
        </label>

        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="w-full min-h-32 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
        />
      </div>
    </div>
  );
}