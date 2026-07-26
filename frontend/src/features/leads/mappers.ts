import type { Lead as ApiLead } from "../../types/lead";
import type { Lead, LeadStatus } from "./types";

const statusMap: Record<string, LeadStatus> = {
    new: "NEW",
    contacted: "CONTACTED",
    client: "CLIENT",
    rejected: "REJECTED",
    unknown: "UNKNOWN",
};

export function mapLead(apiLead: ApiLead): Lead {
    return {
        id: apiLead.id,
        business: apiLead.business.name,
        category: apiLead.business.category ?? "-",
        phone: apiLead.business.phone ?? "",
        email: apiLead.business.email ?? "",
        score: apiLead.score,
        status: statusMap[apiLead.status] ?? "UNKNOWN",
        hasWebsite: apiLead.hasWebsite,
        discoveredAt: "",
    };
}