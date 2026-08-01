import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  startDiscovery,
  getDiscoveryJob,
} from "../../../api/discovery";

export function useStartDiscovery() {
  return useMutation({
    mutationFn: startDiscovery,
  });
}

export function useDiscoveryJob(
  jobId?: string
) {
  return useQuery({
    queryKey: ["discovery", jobId],
    queryFn: () => getDiscoveryJob(jobId!),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (
        status === "completed" ||
        status === "failed"
      ) {
        return false;
      }
      return 2000;
    },
  });
}