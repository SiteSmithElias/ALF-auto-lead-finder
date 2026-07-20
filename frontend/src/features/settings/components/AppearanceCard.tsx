import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { useTheme } from "../../../context/ThemeContext";

export default function AppearanceCard() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <Card>
      <div className="space-y-5">
        <h2 className="text-lg font-semibold">
          Appearance
        </h2>

        <p className="text-[var(--muted)]">
          Choose how ALF looks
        </p>

        <Button
          variant="secondary"
          onClick={toggleTheme}
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Button>
      </div>
    </Card>
  );
}