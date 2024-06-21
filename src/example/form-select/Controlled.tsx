import { useState } from "react";
import FormSelect from "@/components/FormSelect";

const Controlled = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("3");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <FormSelect
          label="Month of Birth"
          value={value1}
          onChange={setValue1}
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

        <p>Select: {value1}</p>
      </div>

      <div>
        <FormSelect
          label="Month of Birth (with default value)"
          value={value2}
          onChange={setValue2}
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

        <p>Select: {value2}</p>
      </div>
    </div>
  );
};

export default Controlled;
