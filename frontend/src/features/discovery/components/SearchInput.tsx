import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchInput({
  onSearch,
}: Props) {
  const [query, setQuery] = useState("");

  return (
    <Card>
      <div className="space-y-5">
        <h2 className="text-lg font-semibold">
          Find businesses
        </h2>

        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Example: plumbers Brussels"
            value={query}
            onChange={setQuery}
          />

          <Button
            onClick={() => onSearch(query)}
          >
            Start Search
          </Button>
        </div>
      </div>
    </Card>
  );
}