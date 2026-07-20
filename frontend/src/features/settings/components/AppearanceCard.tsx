import { useTheme } from "../../../context/ThemeContext";

export default function AppearanceCard() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 space-y-5">
      <h2 className="text-lg font-semibold">
        Appearance
      </h2>

      <p className="opacity-70">
        Current theme: {theme}
      </p>

      <button
        onClick={toggleTheme}
        className="px-5 py-3 border border-[var(--border)] rounded-lg"
      >
        Switch to {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}