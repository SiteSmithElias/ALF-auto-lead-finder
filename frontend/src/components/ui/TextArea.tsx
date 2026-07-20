interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextArea({
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-h-32 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
    ></textarea>
  );
}