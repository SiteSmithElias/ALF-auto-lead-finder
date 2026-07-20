import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";

import SearchInput from "./components/SearchInput";
import DiscoveryProgress from "./components/DiscoveryProgress";
import RecentDiscoveries from "./components/RecentDiscoveries";

export default function Discovery() {
  return (
    <Section>
      <PageHeader
        title="Discovery"
        description="Find potential businesses and generate new leads"
      />

      <SearchInput
        onSearch={(query) => {
          console.log(query);
        }}
      />

      <DiscoveryProgress
        status="Ready to start"
        found={0}
        percentage={0}
      />

      <RecentDiscoveries />
    </Section>
  );
}