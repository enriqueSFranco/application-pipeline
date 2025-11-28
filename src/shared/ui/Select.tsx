import clsx from "clsx";
import { useId } from "react";

type SelectOption = {
  id: string;
  value: string;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[];
  helperText?: string
  errorMessage?: string
  state?: "default" | "error" | "disabled";
}

export function Select({ label, options, helperText, errorMessage, state = "default", ...rest }: SelectProps) {
  const selectHintId = useId()

  const hasError = state === "error"
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <select className={clsx(
        "appearance-none border rounded-xs font-semibold px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
        hasError && "border-red-500 focus:ring-red-500",
        !hasError && "border-gray-300 focus:border-blue-500"
      )} id={selectHintId} {...rest}>
        {options.map((option) => (
          <option key={`option-${option.id}`} value={option.value}>{option.value}</option>
        ))}
      </select>
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
      {hasError && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}
