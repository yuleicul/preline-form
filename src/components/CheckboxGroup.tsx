import { type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import useValidityEffect, {
  type ValidationMessage,
} from "@/hooks/useValidityEffect";
import Checkbox from "./Checkbox";

type Value = string | number;

type OptionData = {
  label: string;
  value: Value;
};

type Props<TName> = {
  options: OptionData[];
  defaultValue?: Value[];
  label?: string;
  value?: Value[];
  name?: TName;
  className?: string;
  fieldsetClassName?: string;
  optionClassName?: string;
  validationMessage?: ValidationMessage;
  onChange?: (value: Value, checked: boolean) => void;
};

const CheckboxGroup = <TName extends string = string>({
  label,
  options,
  defaultValue,
  value,
  className,
  fieldsetClassName,
  optionClassName,
  validationMessage,
  onChange,

  // HTMLInputElement props
  name,
  required,
  onInvalid,
  ...otherInputProps
}: Props<TName> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue"
  >) => {
  const { ErrorMessage, setErrorMessage, handleInvalid } = useValidityEffect({
    name,
    required,
    validationMessage,
    onInvalid,
  });

  const isControlled = value !== undefined;
  const hasDefaultValue = defaultValue !== undefined;

  return (
    <div className={twMerge(className)}>
      {label && (
        <label className="block text-sm font-semibold mb-2.5">
          {label}
          {required && <span className="text-teal-600">*</span>}
        </label>
      )}

      <fieldset className={twMerge("flex gap-3", fieldsetClassName)}>
        {options.map((option, index) => (
          <div className="flex" key={option.label}>
            <Checkbox
              {...otherInputProps}
              id={`${name}-${option.value}`}
              name={`${name}.${index}`}
              label={option.label}
              // NOTE: HTML checkbox's value is alway string.
              //       We can use `onChange` to get the boolean value, but the form data is alway string.
              // @ts-ignore
              value={option.value}
              defaultChecked={
                hasDefaultValue
                  ? defaultValue.includes(option.value)
                  : undefined
              }
              checked={isControlled ? value.includes(option.value) : undefined}
              required={required}
              onChange={(e) => {
                setErrorMessage("");
                onChange?.(option.value, e.target.checked);
              }}
              onInvalid={handleInvalid}
            />
          </div>
        ))}
      </fieldset>

      <ErrorMessage />
    </div>
  );
};

export default CheckboxGroup;
