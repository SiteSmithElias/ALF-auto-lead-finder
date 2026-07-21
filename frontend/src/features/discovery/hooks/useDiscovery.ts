import { useQuery } from "@tanstack/react-query";
import {
    getDiscoveryHistory
} from "../../../api";


export function useDiscoveryHistory(){
    return useQuery({
        queryKey:["discovery-history"],
        queryFn:getDiscoveryHistory
    });
}