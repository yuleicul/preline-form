import { useState } from "react";
import Checkbox from "@/components/Checkbox";

const ControlledWithChecked = () => {
  const [checked1, setChecked1] = useState<boolean>();
  const [checked2, setChecked2] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Checkbox
          checked={checked1}
          onChange={(e) => setChecked1(e.target.checked)}
          label="Please check the box if you have read and understood the statement."
        />

        <p>Checked: {JSON.stringify(checked1)}</p>
      </div>

      <div>
        <Checkbox
          checked={checked2}
          onChange={(e) => setChecked2(e.target.checked)}
          label="Please check the box if you have read and understood the statement."
        />

        <p>Checked: {JSON.stringify(checked2)}</p>
      </div>
    </div>
  );
};

export default ControlledWithChecked;
