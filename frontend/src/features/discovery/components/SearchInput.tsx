import { useState } from "react";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

interface Props {
  onSearch: (
    query: string,
    maxResults: number
  ) => void;

  loading?: boolean;
  disabled?: boolean;
}

export default function SearchInput({
  onSearch,
  loading = false,
  disabled = false,
}: Props) {
  const [query, setQuery] = useState("");
  const [maxResults, setMaxResults] = useState(100);

  function handleSearch() {
    if (!query.trim()) {
      return;
    }

    onSearch(
      query,
      maxResults
    );
  }

  return (
    <Card>
      <div className="space-y-5">
        <h2 className="text-lg font-semibold">
          Find businesses
        </h2>

        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Example: plumbers Brussels"
                value={query}
                onChange={setQuery}
                disabled={disabled}
              />
            </div>

            <Button
              disabled={
                disabled ||
                loading
              }
              onClick={handleSearch}
            >
              {loading
                ? "Starting..."
                : "Start Search"}
            </Button>
          </div>

          <div className="w-32">
            <label className="mb-1 block text-sm text-[var(--muted)]">
              Max results
            </label>

            <Input
              type="number"
              value={String(maxResults)}
              onChange={(value) =>
                setMaxResults(
                  Math.max(
                    1,
                    Number(value)
                  )
                )
              }
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}