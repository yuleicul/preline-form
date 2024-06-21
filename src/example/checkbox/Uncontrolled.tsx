import Checkbox from "@/components/Checkbox";
import { useState, type FormEventHandler } from "react";

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
    <form onSubmit={handleSubmit}>
      <Checkbox
        required
        name="statementReadToggle"
        label="Please check the box if you have read and understood the statement."
      />

      <Checkbox
        defaultChecked
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

export default Uncontrolled;
