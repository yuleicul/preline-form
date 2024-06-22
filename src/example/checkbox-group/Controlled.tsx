import { useState } from "react";
import CheckboxGroup from "@/components/CheckboxGroup";

const Controlled = () => {
  const [value1, setValue1] = useState<string[]>([]);
  const [value2, setValue2] = useState<string[]>(["orange", "others"]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <CheckboxGroup
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

        <p>Checked: {JSON.stringify(value1)}</p>
      </div>

      <div>
        <CheckboxGroup
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

        <p>Checked: {JSON.stringify(value2)}</p>
      </div>
    </div>
  );
};

export default Controlled;
