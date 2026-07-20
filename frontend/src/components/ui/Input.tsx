interface InputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function Input({
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className="px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] focus:outline-none"
    />
  );
}