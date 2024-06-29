import {
  type InputHTMLAttributes,
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useId,
  useState,
} from "react";
import CurrencyInputField, {
  type CurrencyInputProps,
} from "react-currency-input-field";
import { twMerge } from "tailwind-merge";
import { Info } from "lucide-react";
import useValidityEffect, {
  type ValidationMessage,
} from "@/hooks/useValidityEffect";

const DEFAULT_PLACEHOLDER = "$10,000";
const DEFAULT_CURRENCY = "HK";
const DEFAULT_CURRENCY_PREFIX = "$";

type FormInputProps<TName> = {
  label?: string;
  validationMessage?: ValidationMessage;
  inputClassName?: string;
  loading?: boolean;
  name?: TName;
  manualErrorMessage?: string;
  originalValue?: string;
  currency?: string;
};

export type InputImperativeHandle = {
  validate: () => void;
  setErrorMessage: (message: string) => void;
};

const CurrencyInput = <TName extends string = string>(
  {
    children,
    // Component props
    label,
    className,
    validationMessage,
    inputClassName,
    loading,
    manualErrorMessage,
    prefix = DEFAULT_CURRENCY_PREFIX,
    currency = DEFAULT_CURRENCY,
    onValueChange,

    // HTMLInputElement props
    name,
    id,
    required,
    min,
    max,
    onInvalid,
    onBlur,
    ...otherInputProps
  }: InputHTMLAttributes<HTMLInputElement> &
    FormInputProps<TName> &
    CurrencyInputProps,
  ref: ForwardedRef<InputImperativeHandle>
) => {
  const randomId = useId();

  const {
    ErrorMessage,
    errorMessage,
    setErrorMessage,
    handleBlur,
    handleInvalid,
  } = useValidityEffect({
    name,
    dep: { required, pattern: otherInputProps.pattern },
    validationMessage,
    onBlur,
    onInvalid,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [infoMessage, setInfoMessage] = useState("");

  const handleOnValueChange: CurrencyInputProps["onValueChange"] = (
    value,
    _name,
    _formattedValueObject
  ) => {
    if (Number(value) > Number(max)) {
      setInfoMessage(`Upper limit is ${currency}${prefix}${max}`);
    } else {
      setInfoMessage("");
    }

    onValueChange?.(value, _name, _formattedValueObject);
  };

  useImperativeHandle(
    ref,
    () => ({
      validate: () => {
        // NOTE: `checkValidity()` will trigger `oninvalid` if it returns `false`
        const isValid = inputRef.current?.checkValidity();
        if (isValid) {
          setErrorMessage("");
        }
      },
      setErrorMessage: (message: string) => {
        setErrorMessage(message);
      },
    }),
    [setErrorMessage]
  );

  return (
    <div className={twMerge(className)}>
      {label && (
        <label
          htmlFor={id || randomId}
          className="block text-sm font-semibold mb-2.5"
        >
          {label}
          {required && <span className="text-teal-600">*</span>}
        </label>
      )}

      <div className="flex items-center relative">
        {/* Docs: https://cchanxzy.github.io/react-currency-input-field/ */}
        <CurrencyInputField
          prefix="$"
          placeholder={DEFAULT_PLACEHOLDER}
          {...otherInputProps}
          ref={inputRef}
          id={id || randomId}
          onInvalid={handleInvalid}
          onBlur={handleBlur}
          required={required}
          name={name}
          className={twMerge(
            "py-3.5 px-4 block w-full rounded-lg text-[15px] shadow-sm",
            errorMessage
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/25 focus:ring-4"
              : "border-gray-200 focus:border-gray-200 focus:ring-gray-200/25",
            "disabled:text-gray-300 disabled:bg-slate-50 disabled:pointer-events-none",
            inputClassName
          )}
          onValueChange={handleOnValueChange}
        />

        {loading && (
          <span
            className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-gray-200 rounded-full absolute right-3.5"
            role="status"
            aria-label="loading"
          />
        )}
      </div>

      <ErrorMessage />

      {infoMessage && (
        <p className="text-sm font-medium text-gray-500 mt-2.5 flex items-center gap-2">
          <Info className="size-4" />
          <span>{infoMessage}</span>
        </p>
      )}
    </div>
  );
};

export default forwardRef(CurrencyInput) as <TName extends string = string>(
  props: InputHTMLAttributes<HTMLInputElement> &
    FormInputProps<TName> &
    CurrencyInputProps & { ref?: ForwardedRef<InputImperativeHandle> }
) => ReturnType<typeof CurrencyInput<TName>>;
