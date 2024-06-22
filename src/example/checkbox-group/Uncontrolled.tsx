import { useState, type FormEventHandler } from "react";
import _ from "lodash";
import CheckboxGroup from "@/ui/CheckboxGroup";

const Uncontrolled = () => {
  const [formDataObj, setFormDataObj] =
    useState<Record<string, FormDataEntryValue>>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const updates: Record<string, FormDataEntryValue> = {};

    [...formData.entries()].forEach(([key, value]) => {
      /**
       * Q: Why use `_.set` instead of an assignment?
       * A: `_.set` can convert `key` like `a.0.b` to `a: [{ b: '' }]`, which is very convenient for formData (e.g. array) handling
       * */
      _.set(updates, key, value);
    });

    setFormDataObj(updates);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <CheckboxGroup
        // required={true} // NOTE: `required` is not supported
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

      <CheckboxGroup
        name="pickedAnimal"
        defaultValue={["dog", "others"]}
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

      <button type="submit" className="border">
        Submit
      </button>

      <p>formDataObj: {JSON.stringify(formDataObj)}</p>
    </form>
  );
};

export default Uncontrolled;
