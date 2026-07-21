import { useQuery } from "@tanstack/react-query";
import { getLeads } from "../../../api";
import { mapLead } from "../mappers";

export function useLeads() {
    return useQuery({
        queryKey:["leads"],
        queryFn: async()=>{
            const response = await getLeads();
            return response.map(mapLead);
        },
        staleTime:1000 * 60 * 2,
    });
}