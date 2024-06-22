import { useState } from "react";
import FormDatepicker from "@/ui/FormDatepicker";

const Controlled = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("2024-06-20");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <FormDatepicker
          value={value1}
          label="Date of birth"
          onChange={setValue1}
        />

        <p>Value: {value1}</p>
      </div>

      <div>
        <FormDatepicker
          value={value2}
          label="Date of birth"
          onChange={setValue2}
        />

        <p>Value: {value2}</p>
      </div>
    </div>
  );
};

export default Controlled;
