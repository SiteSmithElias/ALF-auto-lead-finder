import { useQuery } from "@tanstack/react-query";
import { getLeads, getLead } from "../../../api";
import { mapLead } from "../mappers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLead } from "../../../api/leads";

export function useLeads() {
    return useQuery({
        queryKey:["leads"],
        queryFn: async()=>{
            const response = await getLeads();
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