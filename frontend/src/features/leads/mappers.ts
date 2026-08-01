import type { Lead as ApiLead, LeadDetail } from "../../types/lead";
import type { Lead, LeadStatus } from "./types";

const statusMap: Record<string, LeadStatus> = {
    new: "new",
    contacted: "contacted",
    client: "client",
    rejected: "rejected",
    unknown: "unknown",
    ignore: "ignore",
};

export function mapLead(apiLead: ApiLead): Lead {
    return {
        id: apiLead.id,
        business: apiLead.business.name,
        category: apiLead.business.category ?? "-",
        phone: apiLead.business.phone ?? "",
        email: apiLead.business.email ?? "",
        score: apiLead.score,
        status: statusMap[apiLead.status] ?? "unknown",
        hasWebsite: apiLead.hasWebsite,
        discoveredAt: "",
    };
}

export interface LeadDetailView {
  id: number;

  business: string;
  category: string;

  phone: string;
  email: string;

  website: string;

  hasWebsite: boolean;

  score: number;
  status: string;

  notes: string;
}

export function mapLeadDetail(
  lead: LeadDetail
): LeadDetailView {
  return {
    id: lead.id,

    business: lead.business.name,

    category: lead.business.category ?? "-",

    phone: lead.business.phone ?? "",

    email: lead.business.email ?? "",

    website: lead.business.website ?? "",

    hasWebsite: !!lead.business.website,

    score: lead.score ?? 0,

    status: lead.status ?? "unknown",

    notes: lead.notes ?? "",
  };
}