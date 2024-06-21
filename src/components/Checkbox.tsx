import { useId, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props<TName> = {
  label?: string;
  name?: TName;
  className?: string;
  labelClassName?: string;
};

const Checkbox = <TName extends string = string>({
  label,
  name,
  className,
  labelClassName,

  id,
  ...otherInputProps
}: Props<TName> & InputHTMLAttributes<HTMLInputElement>) => {
  const inputId = useId();

  return (
    <div className={twMerge("flex align-middle", className)}>
      <input
        {...otherInputProps}
        name={name}
        id={id || inputId}
        type="checkbox"
        className="shrink-0 mt-0.5 border-gray-200 rounded text-ft-brand focus:ring-ft-brand"
      />
      <label
        htmlFor={id || inputId}
        className={twMerge(
          "text-sm ms-4",
          otherInputProps.disabled && "opacity-40",
          labelClassName
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
