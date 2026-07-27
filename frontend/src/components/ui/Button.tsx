import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border border-[var(--border)] hover-surface",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };


  return (
    <button
      {...props}
      className={`
        px-5 py-3 rounded-lg transition
        ${styles[variant]}
        ${className}
        disabled:opacity-50
        disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
}