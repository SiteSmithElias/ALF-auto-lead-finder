import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";

import ProfileCard from "./components/ProfileCard";
import AppearanceCard from "./components/AppearanceCard";

export default function Settings() {
  return (
    <Section>
      <PageHeader
        title="Settings"
        description="Manage your ALF profile and preferences"
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ProfileCard />

        <AppearanceCard />
      </div>
    </Section>
  );
}