import { useState, type FormEventHandler } from "react";
import FormRadio from "@/ui/FormRadio";

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
      <FormRadio
        required={true}
        name="pickedFruit"
        label="Pick what you like"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          {
            value: "orange",
            label: "Orange",
          },
          {
            value: "others",
            label: "Others",
          },
        ]}
      />

      <FormRadio
        name="pickedAnimal"
        defaultValue="dog"
        label="Pick what you like"
        options={[
          { value: "cat", label: "Cat" },
          { value: "dog", label: "Dog" },
          {
            value: "others",
            label: "Others",
          },
        ]}
      />

      <FormRadio
        name="isCatLover"
        label="Do yo like cats?"
        options={[
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ]}
      />

      <button type="submit" className="border">
        Submit
      </button>

      <p>formDataObj: {JSON.stringify(formDataObj)}</p>
      <p className="text-red-500">
        Note that the value of `isCatLover` is a string although we give it
        boolean options
      </p>
    </form>
  );
};

export default Uncontrolled;
