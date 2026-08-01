import { useQuery } from "@tanstack/react-query";
import { getLeads, getLead } from "../../../api";
import { mapLead } from "../mappers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLead } from "../../../api/leads";
import type { LeadStatus } from "../types";

interface LeadFilters {
    search?: string;
    status?: LeadStatus;
    hasWebsite?: boolean;
    page?: number;
    limit?: number;
}

interface LeadListView {
    items: ReturnType<typeof mapLead>[];
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export function useLeads(
    filters?: LeadFilters
) {
    const normalizedFilters = {
        page: filters?.page ?? 1,
        limit: filters?.limit ?? 20,
        search: filters?.search?.trim() || undefined,
        status: filters?.status?.toLowerCase() as LeadStatus | undefined,
        hasWebsite: filters?.hasWebsite,
    };

    return useQuery<LeadListView>({
        queryKey: [
            "leads",
            normalizedFilters,
        ],
        placeholderData: (previousData) => previousData as LeadListView | undefined,

        queryFn: async()=>{

            const response = await getLeads(
                normalizedFilters
            );

            return {
                ...response,
                items: response.items.map(mapLead)
            };
        },
    });
}

export function useLead(id:number) {
    return useQuery({
        queryKey:["lead", id],
        queryFn:()=>getLead(id),
        enabled:!!id,
    });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });
}