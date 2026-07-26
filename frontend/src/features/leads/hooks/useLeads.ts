import { useQuery } from "@tanstack/react-query";
import { getLeads, getLead } from "../../../api";
import { mapLead } from "../mappers";

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