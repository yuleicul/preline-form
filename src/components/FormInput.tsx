import {
  type InputHTMLAttributes,
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";
import useValidityEffect, {
  type ValidationMessage,
} from "@/hooks/useValidityEffect";

type FormInputProps<TName> = {
  label?: string;
  validationMessage?: ValidationMessage;
  inputClassName?: string;
  loading?: boolean;
  name?: TName;
};

export type InputImperativeHandle = {
  validate: () => void;
  setErrorMessage: (message: string) => void;
};

const FormInput = <TName extends string = string>(
  {
    children,
    // Component props
    label,
    className,
    validationMessage,
    inputClassName,
    loading,

    // HTMLInputElement props
    name,
    id,
    required,
    onInvalid,
    onBlur,
    ...otherInputProps
  }: InputHTMLAttributes<HTMLInputElement> & FormInputProps<TName>,
  ref: ForwardedRef<InputImperativeHandle>
) => {
  const {
    ErrorMessage,
    errorMessage,
    setErrorMessage,
    handleBlur,
    handleInvalid,
  } = useValidityEffect({
    name,
    required,
    validationMessage,
    onBlur,
    onInvalid,
  });

  const inputRef = useRef<HTMLInputElement>(null);

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
        <label htmlFor={id} className="block text-sm font-semibold mb-2.5">
          {label}
          {required && <span className="text-teal-600">*</span>}
        </label>
      )}
      <div className="flex items-center relative">
        <input
          {...otherInputProps}
          ref={inputRef}
          id={id}
          className={twMerge(
            "py-3.5 px-4 block w-full rounded-lg text-[15px] shadow-sm",
            errorMessage
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/25 focus:ring-4"
              : "border-gray-200 focus:border-gray-200 focus:ring-gray-200/25",
            "disabled:text-gray-300 disabled:bg-slate-50 disabled:pointer-events-none",
            inputClassName
          )}
          onInvalid={handleInvalid}
          onBlur={handleBlur}
          required={required}
          name={name}
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
    </div>
  );
};

export default forwardRef(FormInput) as <TName extends string = string>(
  props: InputHTMLAttributes<HTMLInputElement> &
    FormInputProps<TName> & { ref?: ForwardedRef<InputImperativeHandle> }
) => ReturnType<typeof FormInput<TName>>;
