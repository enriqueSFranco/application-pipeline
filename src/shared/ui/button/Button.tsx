import { cn } from "../../utils";
import { ButtonColors, ButtonVariants } from "./types";
import { colorClasses } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  variant?: ButtonVariants;
  color?: ButtonColors;
  className?: string;
}

export function Button({
  text,
  icon,
  variant="default",
  color="primary",
  className,
  ...rest
}: ButtonProps) {
  const variantColorClasses = colorClasses[variant as ButtonVariants][color as ButtonColors]
  const baseClasses = cn(
    "flex items-center justify-center gap-2 font-medium px-2.5 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed cursor-pointer",
    variantColorClasses
  );

  const combinedClasses = cn(baseClasses, className)
  return (
    <button className={combinedClasses} {...rest}>
      {icon && <span>{icon}</span>}
      {text && <span className="text-sm">{text}</span>}
    </button>
  );
}
