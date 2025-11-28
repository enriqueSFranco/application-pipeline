import { cn } from "../utils";

interface ChipProps {
  variant?: "outline" | "default";
  status?: "error" | "info" | "warning" | "success" | "default" | "disabled";
  label: string;
  icon?: React.ReactNode
}

const statusStyles = {
  error: "bg-red-200 text-red-500",
  info:  "bg-blue-200 text-blue-500",
  warning: "bg-yellow-200 text-yellow-700",
  success:  "bg-green-200 text-green-500",
  default:  "bg-gray-200 text-gray-500",
  disabled: "bg-gray-100 text-gray-400"
}

const variantStyles = {
  outline: "border border-current py-1 px-2",
  default: "font-semibold py-1 px-2"
}

export function Chip({
  variant="default",
  status="default",
  label,
  icon
}: ChipProps) {
  const classes = cn(
    "text-xs rounded-md inline-flex items-center justify-between",
    variantStyles[variant],
    statusStyles[status]
  )
  return (
    <div className={classes}>
      <p>{label}</p>
      {icon && (
      <span
        role="status"
        aria-label={label}
      >
        {icon}
      </span>
      )}
    </div>
  );
}
