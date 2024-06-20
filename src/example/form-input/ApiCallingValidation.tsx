import FormInput, { type InputImperativeHandle } from "@/components/FormInput";
import { useRef, useState } from "react";

const ApiCallingValidation = () => {
  const inputRef = useRef<InputImperativeHandle>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const handleBlurEmail = async (email: string) => {
    if (!email) return;

    setIsCheckingEmail(true);
    // Mock request
    setTimeout(() => {
      // Suppose request failed since the email is already used
      setIsCheckingEmail(false);
      inputRef.current?.setErrorMessage("This email address is already used");
    }, 3000);
  };

  return (
    <FormInput
      ref={inputRef}
      label="Email"
      placeholder="Input an email, then blur"
      loading={isCheckingEmail}
      onBlur={(e) => handleBlurEmail(e.currentTarget.value)}
    />
  );
};

export default ApiCallingValidation;
