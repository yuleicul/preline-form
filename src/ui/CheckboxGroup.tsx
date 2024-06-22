import { type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import usePrelineEffect from "@/hooks/usePrelineEffect";
import useValidityEffect, {
  type ValidationMessage,
} from "@/hooks/useValidityEffect";
import Checkbox from "./Checkbox";

// NOTE: HTML checkbox's value is alway string.
type Value = string;

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
  onChange?: (value: Value[]) => void;
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
  onInvalid,
  ...otherInputProps
}: Props<TName> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue" | "required" // NOTE: 'required' is not supported
  >) => {
  usePrelineEffect();

  const { ErrorMessage, setErrorMessage, handleInvalid } = useValidityEffect({
    name,
    validationMessage,
    onInvalid,
  });

  const isControlled = value !== undefined;
  const hasDefaultValue = defaultValue !== undefined;

  const handleCheck = (optionValue: Value, checked: boolean) => {
    setErrorMessage("");
    if (checked) {
      onChange?.((value || []).concat([optionValue]));
    } else {
      onChange?.((value || []).filter((v) => v !== optionValue));
    }
  };

  return (
    <div className={twMerge(className)}>
      {label && (
        <label className="block text-sm font-semibold mb-2.5">{label}</label>
      )}

      <fieldset className={twMerge("flex gap-3 flex-wrap", fieldsetClassName)}>
        {options.map((option, index) => (
          <div className="flex" key={option.label}>
            <Checkbox
              {...otherInputProps}
              id={`${name}-${option.value}`}
              name={`${name}.${index}`}
              label={option.label}
              value={option.value}
              defaultChecked={
                hasDefaultValue
                  ? defaultValue.includes(option.value)
                  : undefined
              }
              checked={isControlled ? value.includes(option.value) : undefined}
              onChange={(e) => handleCheck(option.value, e.target.checked)}
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
