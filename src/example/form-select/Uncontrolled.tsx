import FormSelect from "@/components/FormSelect";
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
      <FormSelect
        required
        name="monthOfBirth"
        label="Month of Birth"
        options={[
          { label: "January", value: "1" },
          { label: "February", value: "2" },
          { label: "March", value: "3" },
          { label: "April", value: "4" },
          { label: "May", value: "5" },
          { label: "June", value: "6" },
          { label: "July", value: "7" },
          { label: "August", value: "8" },
          { label: "September", value: "9" },
          { label: "October", value: "10" },
          { label: "November", value: "11" },
          { label: "December", value: "12" },
        ]}
        dropDownMenuClassName="max-h-80 overflow-auto"
      />
      <FormSelect
        name="whatWouldYouLikeToDrink"
        label="What would you like to drink?"
        defaultValue="tea"
        options={[
          { label: "Coffee", value: "coffee" },
          { label: "Tea", value: "tea" },
          { label: "Other", value: "other" },
        ]}
      />
      <button type="submit" className="border">
        Submit
      </button>

      <p>formDataObj: {JSON.stringify(formDataObj)}</p>
    </form>
  );
};

export default Uncontrolled;
