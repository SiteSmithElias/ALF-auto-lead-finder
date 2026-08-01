import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import type { LeadStatus } from "../types";

interface Filters {
  search: string;
  status?: LeadStatus;
  hasWebsite?: boolean;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function LeadFilters({
  filters,
  onChange,
}: Props) {

  return (
    <Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <Input
          placeholder="Search leads..."
          value={filters.search}
          onChange={(value) =>
            onChange({
              ...filters,
              search: value,
            })
          }
        />


        <Select
          value={filters.status ?? "all"}
          onChange={(value) =>
            onChange({
              ...filters,
              status:
                value === "all"
                  ? undefined
                  : value as LeadStatus,
            })
          }
          options={[
            {
              label: "All Statuses",
              value: "all",
            },
            {
              label: "New",
              value: "new",
            },
            {
              label: "Contacted",
              value: "contacted",
            },
            {
              label: "Client",
              value: "client",
            },
            {
              label: "Rejected",
              value: "rejected",
            },
            {
              label: "Ignore",
              value: "ignore",
            },
          ]}
        />


        <Select
          value={
            filters.hasWebsite === undefined
              ? "all"
              : filters.hasWebsite
                ? "true"
                : "false"
          }
          onChange={(value) =>
            onChange({
              ...filters,
              hasWebsite:
                value === "all"
                  ? undefined
                  : value === "true",
            })
          }
          options={[
            {
              label: "Any Website Status",
              value: "all",
            },
            {
              label: "Has Website",
              value: "true",
            },
            {
              label: "No Website",
              value: "false",
            },
          ]}
        />

      </div>
    </Card>
  );
}