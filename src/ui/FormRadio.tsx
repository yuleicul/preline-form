import { type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import usePrelineEffect from "@/hooks/usePrelineEffect";
import useValidityEffect, {
  type ValidationMessage,
} from "@/hooks/useValidityEffect";
import "./FormRadio.css";

type RadioValue = InputHTMLAttributes<HTMLInputElement>["value"] | boolean;

type OptionData<TValue> = {
  label: string;
  value: TValue;
};

type Props<TName, TValue> = {
  options: OptionData<TValue>[];
  defaultValue?: RadioValue;
  label?: string;
  value?: RadioValue;
  name?: TName;
  className?: string;
  fieldsetClassName?: string;
  optionClassName?: string;
  validationMessage?: ValidationMessage;
  validationMessageClassName?: string;
  onChange?: (value: TValue) => void;
};

const FormRadio = <
  TName extends string = string,
  TValue extends RadioValue = string
>({
  label,
  options,
  defaultValue,
  value,
  className,
  fieldsetClassName,
  optionClassName,
  validationMessage,
  validationMessageClassName,
  onChange,

  // HTMLInputElement props
  name,
  required,
  onInvalid,
  ...otherInputProps
}: Props<TName, TValue> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue"
  >) => {
  usePrelineEffect();

  const { ErrorMessage, setErrorMessage, handleInvalid } = useValidityEffect({
    name,
    dep: { required },
    validationMessage,
    onInvalid,
    validationMessageClassName,
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
        {options.map((option) => (
          <div className="flex" key={option.label}>
            <input
              {...otherInputProps}
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              className={twMerge(
                "shrink-0 mt-0.5 border-gray-200 rounded-full text-ft-brand focus:ring-ft-brand disabled:opacity-50 disabled:pointer-events-none",
                optionClassName
              )}
              // NOTE: HTML radio's value is alway string.
              //       We can use `onChange` to get the boolean value, but the form data is alway string.
              // @ts-ignore
              value={option.value}
              defaultChecked={
                hasDefaultValue ? defaultValue === option.value : undefined
              }
              checked={isControlled ? value === option.value : undefined}
              required={required}
              onChange={() => {
                setErrorMessage("");
                onChange?.(option.value);
              }}
              onInvalid={handleInvalid}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={twMerge(
                "text-sm ms-4",
                otherInputProps.disabled && "opacity-40"
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </fieldset>

      <ErrorMessage />
    </div>
  );
};

export default FormRadio;
