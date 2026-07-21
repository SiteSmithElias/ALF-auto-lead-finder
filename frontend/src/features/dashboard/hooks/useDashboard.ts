import { useQuery } from "@tanstack/react-query";
import {
    getDashboardMetrics,
    getRecentSearches
} from "../../../api";


export function useDashboardMetrics(){
    return useQuery({
        queryKey:["dashboard-metrics"],
        queryFn:getDashboardMetrics
    });
}

export function useRecentSearches(){
    return useQuery({
        queryKey:["recent-searches"],
        queryFn:getRecentSearches
    });
}