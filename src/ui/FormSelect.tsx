import { twMerge } from "tailwind-merge";
import {
  type SelectHTMLAttributes,
  type ReactElement,
  useId,
  useState,
} from "react";
import IconDownArrow from "@/ui/dynamic-icons/IconDownArrow";
import usePrelineEffect from "@/hooks/usePrelineEffect";
import useValidityEffect, {
  type ValidationMessage,
} from "@/hooks/useValidityEffect";

type SelectValue = SelectHTMLAttributes<HTMLSelectElement>["value"];

type OptionData<TValue> = {
  label: string;
  value: TValue;
};

type FormSelectProps<TName, TValue> = {
  options: OptionData<TValue>[];
  label?: string;
  placeholder?: string;
  className?: string;
  dropDownToggleButtonClassName?: string;
  dropDownMenuClassName?: string;
  dropDownOptionClassName?: string;
  icon?: ReactElement | null;
  name?: TName;
  validationMessage?: ValidationMessage;
  onChange?: (value: TValue) => void;
};

const FormSelect = <
  TName extends string = string,
  TValue extends SelectValue = string
>({
  options,
  label,
  className,
  placeholder,
  dropDownToggleButtonClassName,
  dropDownMenuClassName,
  dropDownOptionClassName,
  icon,
  validationMessage,

  // HTMLSelectElement props
  name,
  defaultValue,
  value,
  required,
  onChange,
  onInvalid,
  ...selectProps
}: FormSelectProps<TName, TValue> &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange">) => {
  usePrelineEffect();
  const selectId = useId();

  const { ErrorMessage, errorMessage, setErrorMessage, handleInvalid } =
    useValidityEffect({
      name,
      dep: { required },
      validationMessage,
      onInvalid,
    });
  const isControlled = value !== undefined;

  const getLabel = (
    value: SelectHTMLAttributes<HTMLSelectElement>["value"]
  ) => {
    return (
      options.find((option) => option.value === value)?.label ||
      placeholder ||
      "Please select"
    );
  };

  const [selectedOptionLabel = getLabel(defaultValue), setSelectedOptionLabel] =
    useState<string>();

  const handleClickOption = (value: TValue) => {
    const selectElement = document.getElementById(selectId)!;
    // @ts-ignore
    selectElement.value = value;

    setSelectedOptionLabel(getLabel(value));
    setErrorMessage("");

    onChange?.(value);
  };

  return (
    <div className={twMerge(className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-semibold mb-2.5"
        >
          {label}
          {required && <span className="text-teal-600">*</span>}
        </label>
      )}

      <div className="hs-dropdown [--placement:bottom-left] [--strategy:absolute] flex relative">
        <button
          type="button"
          className={twMerge(
            "hs-dropdown-toggle flex items-center justify-between gap-x-2 py-3.5 px-4 w-full rounded-lg text-[15px] shadow-sm border border-gray-200 overflow-hidden whitespace-nowrap text-ellipsis",
            errorMessage
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/25 focus:ring-4"
              : "border-gray-200 focus:border-gray-200 focus:ring-gray-200/25",
            "disabled:text-gray-300 disabled:bg-slate-50 disabled:pointer-events-none",
            dropDownToggleButtonClassName
          )}
        >
          <div className="text-ellipsis overflow-hidden whitespace-nowrap">
            {isControlled
              ? getLabel(value)
              : selectedOptionLabel || placeholder || "Please select"}
          </div>
          {icon === undefined ? (
            <IconDownArrow className="hs-dropdown-open:rotate-180 size-4" />
          ) : (
            icon
          )}
        </button>

        <div
          className={twMerge(
            "hs-dropdown-menu hs-dropdown-open:opacity-100",
            "min-w-full text-nowrap bg-white shadow-md rounded-lg p-2 border opacity-0 hidden z-10 transition-[opacity,margin] duration",
            dropDownMenuClassName
          )}
          aria-labelledby="selector"
        >
          {options.map((option) => (
            <Option
              value={option.value}
              label={option.label}
              className={dropDownOptionClassName}
              key={String(option.value)}
              onClick={handleClickOption}
            />
          ))}
        </div>
      </div>

      <ErrorMessage />

      {/* NOTE: This is the real select which constructs the form data */}
      <div className="hidden">
        <select
          {...selectProps}
          name={name}
          id={selectId}
          defaultValue={defaultValue}
          value={value}
          required={required}
          // HACK: `onChange` will never triggered. Just for fix React warning for controlled `select`
          onChange={(e) => onChange?.(e.target.value as TValue)}
          onInvalid={handleInvalid}
        >
          {/* HACK: `select`'s value will be the first option if `required` */}
          <option value={defaultValue || ""} />
          {options.map((option) => (
            <option key={String(option.value)}>{option.value}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

type OptionProps<TValue> = {
  value: TValue;
  label: string;
  className?: string;
  onClick: (value: TValue) => void;
};

const Option = <TValue extends SelectValue = string>({
  value,
  label,
  className,
  onClick,
}: OptionProps<TValue>) => {
  return (
    <div
      className={twMerge(
        "py-2 px-3 rounded-lg text-sm cursor-pointer",
        "hover:bg-gray-100",
        className
      )}
      onClick={() => onClick(value)}
    >
      {label}
    </div>
  );
};

export default FormSelect;
