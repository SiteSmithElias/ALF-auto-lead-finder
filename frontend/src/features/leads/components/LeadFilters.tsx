import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

export default function LeadFilters() {
  return (
    <Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Input
          placeholder="Search leads..."
          onChange={() => {}}
        />

        <Select
          value="all"
          onChange={() => {}}
          options={[
            {
              label: "All Statuses",
              value: "all",
            },
            {
              label: "New",
              value: "NEW",
            },
            {
              label: "Client",
              value: "CLIENT",
            },
          ]}
        />

        <Select
          value="all"
          onChange={() => {}}
          options={[
            {
              label: "All Categories",
              value: "all",
            },
          ]}
        />

        <Select
          value="all"
          onChange={() => {}}
          options={[
            {
              label: "Website",
              value: "website",
            },
            {
              label: "No Website",
              value: "none",
            },
          ]}
        />
      </div>
    </Card>
  );
}