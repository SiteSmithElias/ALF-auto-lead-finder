interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onRemove: () => void;
}

export default function SearchInput({ value, onChange, onRemove }: SearchInputProps) {
    return (
        <div className="flex gap-3">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Example: plumbers Brussels"
                className="flex-1 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
            />

            <button
                onClick={onRemove}
                className="px-4 rounded-lg border border-[var(--border)] hover:bg-gray-100"
            >
                ✕
            </button>
        </div>
    );
}