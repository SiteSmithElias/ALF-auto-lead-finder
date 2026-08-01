import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";

import SearchInput from "./components/SearchInput";
import DiscoveryProgress from "./components/DiscoveryProgress";

import {
  useDiscoveryJob,
  useStartDiscovery,
} from "./hooks/useDiscovery";

export default function Discovery() {
  const navigate = useNavigate();
  const [jobId, setJobId] = useState<string>();
  const startMutation = useStartDiscovery();

  const {
    data: job,
  } = useDiscoveryJob(jobId);

  function handleSearch(
  query: string,
  maxResults: number
  ) {
  startMutation.mutate(
    {
      queries: [query],
      max_results: maxResults,
    },
      {
        onSuccess(data) {
          setJobId(data.job_id);
        },
      }
    );
  }

  return (
    <Section>

      <PageHeader
        title="Discovery"
        description="Find potential businesses and generate new leads"
      />

      <SearchInput
        loading={startMutation.isPending}
        disabled={
          job?.status === "running"
        }
        onSearch={handleSearch}
      />

      {
        job && (
          <DiscoveryProgress
            status={
              job.current_action
            }
            found={
              job.businesses_found
            }
            percentage={
              job.progress
            }
            completed={
              job.status === "completed"
            }
            failed={
              job.status === "failed"
            }
            onViewLeads={() => navigate("/leads")}
          />
        )
      }

    </Section>
  );

}