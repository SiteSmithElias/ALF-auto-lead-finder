import type { InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  value,
  onChange,
  className = "",
  ...props
}: InputProps) {

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full
        rounded-lg
        border
        border-[var(--border)]
        bg-transparent
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
}