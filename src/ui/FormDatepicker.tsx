import {
  type InputHTMLAttributes,
  type ReactElement,
  useRef,
  useId,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import usePrelineEffect from "@/hooks/usePrelineEffect";
import { formatDateString } from "@/utils/utils";
import useValidityEffect, {
  type ValidationMessage,
} from "@/hooks/useValidityEffect";

import IconDownArrow from "./dynamic-icons/IconDownArrow";
import Datepicker, { type Month } from "./Datepicker";

type FormDatepickerProps<TName> = {
  name?: TName;
  label?: string;
  placeholder?: string;
  className?: string;
  dropDownToggleButtonClassName?: string;
  dropDownMenuClassName?: string;
  icon?: ReactElement | null;
  validationMessage?: ValidationMessage;
};

const FormDatepicker = <TName extends string = string>({
  label,
  placeholder = "DD/MM/YYYY",
  className,
  dropDownToggleButtonClassName,
  dropDownMenuClassName,
  icon,
  validationMessage,

  // HTMLInputElement props
  name,
  defaultValue, // The format in Date Input element is `YYYY-MM-DD`
  accept,
  size,
  required,
  onInvalid,
  ...inputProps
}: FormDatepickerProps<TName> & InputHTMLAttributes<HTMLInputElement>) => {
  usePrelineEffect();

  const { ErrorMessage, errorMessage, setErrorMessage, handleInvalid } =
    useValidityEffect({
      name,
      dep: { required },
      validationMessage,
      onInvalid,
    });

  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const [
    dateDisplay = defaultValue
      ? formatDateString(defaultValue as string)
      : placeholder,
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
          className={twMerge(
            "hs-dropdown-toggle flex items-center justify-between gap-x-2 py-3.5 px-4 w-full rounded-lg text-[15px] shadow-sm border border-gray-200",
            errorMessage
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/25 focus:ring-4"
              : "border-gray-200 focus:border-gray-200 focus:ring-gray-200/25",
            "disabled:text-gray-300 disabled:bg-slate-50 disabled:pointer-events-none",
            dropDownToggleButtonClassName
          )}
        >
          {dateDisplay}

          {icon === undefined ? (
            <IconDownArrow className="hs-dropdown-open:rotate-180 size-4" />
          ) : (
            icon
          )}
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
        defaultValue={defaultValue}
        id={inputId}
        ref={inputRef}
        type="date"
        className="hidden"
        name={name}
        onInvalid={handleInvalid}
      />

      <ErrorMessage />
    </div>
  );
};

export default FormDatepicker;
