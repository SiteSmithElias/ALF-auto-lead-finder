import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function ProfileCard() {
  return (
    <Card>
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">
          Profile
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)] text-2xl font-bold text-white">
            A
          </div>

          <Button variant="secondary">
            Change Photo
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">
              Name
            </label>

            <Input
              value="ALF User"
              onChange={() => {}}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[var(--muted)]">
              Email
            </label>

            <Input
              value=""
              placeholder="Coming soon"
              onChange={() => {}}
            />
          </div>
        </div>

        <Button>
          Save Profile
        </Button>
      </div>
    </Card>
  );
}