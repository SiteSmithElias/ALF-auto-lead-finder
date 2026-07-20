interface SelectProps {
  value: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
}

export default function Select({
  value,
  options,
  onChange,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}