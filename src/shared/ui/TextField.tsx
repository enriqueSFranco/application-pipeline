import clsx from "clsx";
import { useId } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  state?: "default" | "error" | "warning" | "info";
}

export function TextField({
  label,
  helperText,
  errorMessage,
  state,
  disabled,
  ...rest
}: TextFieldProps) {
  const inputHintId = useId();

  const hasError = state === "error" || !!errorMessage;

  return (
    <div className="w-full flex flex-col gap-1.5">
      <label htmlFor={inputHintId} className="text-sm text-gray-700 px-1.5">
        {label}
      </label>
      <div className="flex flex-col gap-1.5">
        <input
          autoComplete="off"
          aria-invalid={hasError}
          disabled={disabled}
          className={clsx(
            "w-full h-10 px-1.5 text-sm font-semibold text-gray-600 border rounded-xs transition-colors duration-300 ease-in-out placeholder:text-gray-500 placeholder:text-sm",
            "focus:outline-none focus:ring-2",
            disabled && "bg-gray-100 text-gray-400 cursor-not-allowed",
            !disabled && !hasError && "hover:bg-gray-50",
            state === "default" &&
              "border-gray-300 focus:border-sky-500 focus:ring-sky-200",
            hasError &&
              "border-red-500 focus:border-red-600 focus:ring-red-100 bg-red-50"
          )}
          {...rest}
        />
        {helperText && (
          <p className="text-xs text-gray-500 px-1.5">{helperText}</p>
        )}
        {errorMessage && (
          <p className="text-xs text-red-500 px-1.5">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
