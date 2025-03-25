interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TextField({ label, ...rest }: TextFieldProps) {
  return (
    <div className="w-full flex flex-col gap-2 justify-start">
      <label htmlFor="photo" className="capitalize">
        {label}
      </label>
      <input className="w-full outline-none p-4 dark:bg-white/15 dark:text-white bg-gray-200 text-black rounded-lg" {...rest} />
    </div>
  );
}
