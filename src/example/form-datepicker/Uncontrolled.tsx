import { useState, type FormEventHandler } from "react";
import FormDatepicker from "@/ui/FormDatepicker";

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
      <FormDatepicker required name="dateOfBirth" label="Date of birth" />

      <FormDatepicker
        name="dateOfGraduation"
        defaultValue="2024-06-20"
        label="Date of graduation"
      />

      <button type="submit" className="border">
        Submit
      </button>

      <p>formDataObj: {JSON.stringify(formDataObj)}</p>
    </form>
  );
};

export default Uncontrolled;
