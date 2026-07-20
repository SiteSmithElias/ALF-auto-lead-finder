import ProfileCard from "../components/settings/ProfileCard";
import AppearanceCard from "../components/settings/AppearanceCard";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="opacity-70 mt-2">
          Manage your ALF preferences
        </p>
      </div>

      <div className="space-y-6">
        <ProfileCard />
        <AppearanceCard />
      </div>
    </div>
  );
}