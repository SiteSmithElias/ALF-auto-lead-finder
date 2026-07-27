import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLead } from "../../../api/leads";


export function useUpdateLead() {

    const queryClient = useQueryClient();


    return useMutation({

        mutationFn: ({
            id,
            data,
        }:{
            id:number;
            data:{
                status?:string;
                notes?:string;
            };
        }) =>
            updateLead(
                id,
                {
                    ...data,
                    status:data.status?.toLowerCase()
                }
            ),

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey:["lead", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey:["leads"],
            });

        }

    });
}