import {
  type FormEventHandler,
  type FocusEventHandler,
  useState,
  useEffect,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

export const VALIDITY_STATES: Array<keyof ValidityState> = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooLong",
  "tooShort",
  "rangeUnderflow",
  "rangeOverflow",
  "stepMismatch",
  "badInput",
  "customError",
  "valid",
];

export type ValidationMessage = Partial<Record<keyof ValidityState, string>>;

type Props = {
  name?: string;
  required?: boolean;
  validationMessage?: ValidationMessage;
  validationMessageClassName?: string;
  onInvalid?: FormEventHandler<HTMLInputElement | HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const useValidityEffect = ({
  name,
  required,
  validationMessage,
  validationMessageClassName,
  onInvalid,
  onBlur,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const targetRef = useRef<
    EventTarget & (HTMLInputElement | HTMLSelectElement)
  >();

  const handleInvalid: FormEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    event.preventDefault();
    targetRef.current = event.currentTarget;

    const validityState = VALIDITY_STATES.find(
      (state) => event.currentTarget.validity[state]
    )!;
    if (validationMessage?.[validityState]) {
      setErrorMessage(validationMessage[validityState]!);
    } else if (validityState === "valueMissing") {
      setErrorMessage("Please fill in the mandatory field");
    } else {
      console.warn(`Please set validationMessage.${validityState} for ${name}`);
    }

    onInvalid?.(event);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    // NOTE: `checkValidity()` will trigger `oninvalid` if it returns `false`
    const isValid = event.target.checkValidity();
    if (isValid) {
      setErrorMessage("");
      onBlur?.(event);
    }
  };

  useEffect(() => {
    if (!required) {
      const isValid = targetRef.current?.checkValidity();
      if (isValid) {
        setErrorMessage("");
      }
    }
  }, [required]);

  const ErrorMessage = () => {
    return (
      errorMessage && (
        <p
          className={twMerge(
            "text-sm text-red-500 font-medium break-words mt-2.5",
            validationMessageClassName
          )}
        >
          {errorMessage}
        </p>
      )
    );
  };

  return {
    ErrorMessage,
    errorMessage,
    setErrorMessage,
    handleInvalid,
    handleBlur,
  };
};

export default useValidityEffect;
