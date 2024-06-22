import { useState } from "react";
import FormRadio from "@/ui/FormRadio";

const Controlled = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("others");
  const [booleanValue, setBooleanValue] = useState<boolean>();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <FormRadio
          value={value1}
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
          onChange={setValue1}
        />

        <p>Value: {value1}</p>
      </div>

      <div>
        <FormRadio
          value={value2}
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
          onChange={setValue2}
        />

        <p>Value: {value2}</p>
      </div>

      <div>
        <FormRadio
          value={booleanValue}
          label="Do yo like cats?"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
          onChange={setBooleanValue}
        />

        <p>Value: {JSON.stringify(booleanValue)}</p>
        <p>Type of value: {typeof booleanValue}</p>
      </div>
    </div>
  );
};

export default Controlled;
