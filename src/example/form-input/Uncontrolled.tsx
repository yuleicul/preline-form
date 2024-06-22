import { useState, type FormEventHandler } from "react";
import FormInput from "@/ui/FormInput";

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
      <FormInput
        required
        defaultValue="default@gmail.com"
        name="email"
        label="Email"
        placeholder="Email"
      />
      <FormInput
        required
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
      />
      <button type="submit" className="border">
        Click here to submit (or press "Enter")
      </button>

      <p>formDataObj: {JSON.stringify(formDataObj)}</p>
    </form>
  );
};

export default Uncontrolled;
