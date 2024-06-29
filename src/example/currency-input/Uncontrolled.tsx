import { useState, type FormEventHandler } from "react";
import CurrencyInput from "@/ui/CurrencyInput";

const Uncontrolled = () => {
  const [formDataObj, setFormDataObj] =
    useState<Record<string, FormDataEntryValue>>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const updates = Object.fromEntries(formData);

    setFormDataObj(updates);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <CurrencyInput required label="MFA" name="mfa" />
      <CurrencyInput defaultValue="1000" label="AI" name="ai" />
      <button type="submit" className="border">
        Click here to submit (or press "Enter")
      </button>

      <p>formDataObj: {JSON.stringify(formDataObj)}</p>
    </form>
  );
};

export default Uncontrolled;
