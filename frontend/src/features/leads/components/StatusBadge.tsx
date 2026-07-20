import Badge from "../../../components/ui/Badge";
import { statusStyles } from "../../../theme/status";

interface Props {
  status: keyof typeof statusStyles;
}

export default function StatusBadge({
  status,
}: Props) {
  const config = statusStyles[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}