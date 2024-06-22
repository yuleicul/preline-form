import { useState, type FormEventHandler } from "react";
import Checkbox from "@/ui/Checkbox";

const UncontrolledWithCustomValue = () => {
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
      <Checkbox
        required
        value="yes"
        name="statementReadToggle"
        label="Please check the box if you have read and understood the statement."
      />

      <Checkbox
        defaultChecked
        value="yes"
        name="strawberryLoverToggle"
        label="Please check the box if you like strawberries."
      />

      <button type="submit" className="border">
        Submit
      </button>

      <p>formDataObj: {JSON.stringify(formDataObj)}</p>
    </form>
  );
};

export default UncontrolledWithCustomValue;
