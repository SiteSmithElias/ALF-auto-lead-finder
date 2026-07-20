import { useState } from "react";
import type { Lead } from "./lead";
import LeadTable from "./components/LeadTable";
import Pagination from "./components/Pagination";

const mockLeads: Lead[] = [
  {
    id: 1,
    business: "Plomberie Thomas",
    category: "Plumbing",
    phone: "047123456",
    score: 92,
    status: "NEW",
    hasWebsite: false,
    discoveredAt: "2026-07-20",
  },
  {
    id: 2,
    business: "Cafe Roma",
    category: "Restaurant",
    email: "contact@caferoma.com",
    score: 45,
    status: "UNKNOWN",
    hasWebsite: true,
    discoveredAt: "2026-07-19",
  },
];

export default function Leads() {
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Lead Database</h1>

        <p className="opacity-70 mt-2">
          Manage discovered businesses and prospects
        </p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 border rounded">
          No Website
        </button>

        <button className="px-4 py-2 border rounded">
          High Score
        </button>

        <button className="px-4 py-2 border rounded">
          Status
        </button>
      </div>

      <LeadTable leads={mockLeads} />

      <Pagination
        page={page}
        totalPages={20}
        onChange={setPage}
      />
    </div>
  );
}