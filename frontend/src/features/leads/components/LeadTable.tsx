import StatusBadge from "./StatusBadge";
import Card from "../../../components/ui/Card";
import type { Lead } from "../types";
import LeadActions from "./LeadActions";

interface Props {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
}

export default function LeadTable({
  leads,
  onSelect,
}: Props) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[var(--border)] text-sm text-[var(--muted)]">
              <th className="p-4">
                Business
              </th>

              <th className="p-4">
                Category
              </th>

              <th className="p-4">
                Contact
              </th>

              <th className="p-4">
                Score
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onSelect(lead)}
                className="cursor-pointer border-b border-[var(--border)] hover-surface"
              >
                <td className="p-4 font-medium">
                  {lead.business}
                </td>

                <td className="p-4">
                  {lead.category}
                </td>

                <td className="p-4">
                  <div>
                    {lead.phone ?? "-"}
                  </div>

                  <div className="text-sm text-[var(--muted)]">
                    {lead.email ?? ""}
                  </div>
                </td>

                <td className="p-4">
                  <span className="font-semibold">
                    {lead.score}
                  </span>
                </td>

                <td className="p-4">
                  <StatusBadge status={lead.status} />
                </td>

                <td className="p-4">
                    <LeadActions
                    onView={()=>onSelect(lead)}
                    onContact={()=>console.log("contact",lead)}
                    onReject={()=>console.log("reject",lead)}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}