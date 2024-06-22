import { type InputHTMLAttributes, useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Calendar } from "lucide-react";
import usePrelineEffect from "@/hooks/usePrelineEffect";
import { formatDateString } from "@/utils/utils";
import useValidityEffect, {
  type ValidationMessage,
} from "@/hooks/useValidityEffect";

import Datepicker, { type Month } from "./Datepicker";

type FormDatepickerProps<TName> = {
  name?: TName;
  /** Format: YYYY-MM-DD */
  value?: string;
  /** Format: YYYY-MM-DD */
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  dropDownToggleButtonClassName?: string;
  dropDownMenuClassName?: string;
  validationMessage?: ValidationMessage;
  onChange?: (value: string) => void;
};

const FormDatepicker = <TName extends string = string>({
  label,
  placeholder = "DD/MM/YYYY",
  className,
  dropDownToggleButtonClassName,
  dropDownMenuClassName,
  validationMessage,
  value,
  defaultValue,
  onChange,

  // HTMLInputElement props
  name,
  accept,
  size,
  required,
  onInvalid,
  ...inputProps
}: FormDatepickerProps<TName> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
  >) => {
  usePrelineEffect();

  const isControlled = value !== undefined;

  const { ErrorMessage, errorMessage, setErrorMessage, handleInvalid } =
    useValidityEffect({
      name,
      dep: { required },
      validationMessage,
      onInvalid,
    });

  const inputId = useId();

  const [
    dateDisplay = isControlled
      ? formatDateString(value)
      : formatDateString(defaultValue),
    setDateDisplay,
  ] = useState<string>(); // `DD/MM/YYYY`

  const handleClickDay = (year: number, month: Month, day: number) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");

    const date = `${year}-${formattedMonth}-${formattedDay}`;

    const dateInputElement = document.getElementById(
      inputId
    )! as HTMLInputElement;
    dateInputElement.value = date;
    setDateDisplay(formatDateString(date));
    setErrorMessage("");

    onChange?.(date);
  };

  return (
    <div className={twMerge(className)}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold mb-2.5">
          {label}
          {required && <span className="text-teal-600">*</span>}
        </label>
      )}

      <div className="hs-dropdown [--placement:bottom-left] [--strategy:absolute] [--auto-close:inside] flex relative">
        <button
          type="button"
          disabled={inputProps.disabled}
          className={twMerge(
            "hs-dropdown-toggle flex items-center justify-between gap-x-2 py-3.5 px-4 w-full rounded-lg text-[15px] shadow-sm border border-gray-200",
            errorMessage
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/25 focus:ring-4"
              : "border-gray-200 focus:border-gray-200 focus:ring-gray-200/25",
            "disabled:text-gray-300 disabled:bg-slate-50 disabled:pointer-events-none",
            dropDownToggleButtonClassName
          )}
        >
          {dateDisplay || placeholder}
          <Calendar className="size-4" />
        </button>

        <div
          className={twMerge(
            "hs-dropdown-menu hs-dropdown-open:opacity-100",
            "text-nowrap bg-white shadow-md rounded-lg p-2 border opacity-0 hidden z-10 transition-[opacity,margin] duration",
            dropDownMenuClassName
          )}
          aria-labelledby="selector"
        >
          <Datepicker onChange={handleClickDay} />
        </div>
      </div>

      {/* NOTE: This is the real date input which constructs the form data */}
      <input
        {...inputProps}
        required={required}
        value={value}
        defaultValue={defaultValue}
        id={inputId}
        type="date"
        className="hidden"
        name={name}
        onInvalid={handleInvalid}
        // HACK: a fake `onChange` to skip the warning:
        //    Warning: You provided a `value` prop to a form field without an `onChange` handler.
        //    This will render a read-only field. If the field should be mutable use `defaultValue`.
        //    Otherwise, set either `onChange` or `readOnly`.
        // NOTE: `readOnly` will disable `required`
        onChange={() => {}}
      />

      <ErrorMessage />
    </div>
  );
};

export default FormDatepicker;
