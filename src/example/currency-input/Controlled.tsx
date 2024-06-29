import { useState } from "react";
import { type CurrencyInputOnChangeValues } from "react-currency-input-field";
import CurrencyInput from "@/ui/CurrencyInput";

const Controlled = () => {
  const [value1, setValue1] = useState("");
  const [name1, setName1] = useState("");
  const [formattedValueObject1, setFormattedValueObject1] =
    useState<CurrencyInputOnChangeValues>();

  const [value2, setValue2] = useState("1000");
  const [name2, setName2] = useState("");
  const [formattedValueObject2, setFormattedValueObject2] =
    useState<CurrencyInputOnChangeValues>();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <CurrencyInput
          label="MFA"
          value={value1}
          onValueChange={(value, name, formattedValueObject) => {
            setValue1(value || "");
            setName1(name || "");
            setFormattedValueObject1(formattedValueObject);
          }}
        />
        <p>Value: {value1}</p>
        <p>Name: {name1}</p>
        <p>setFormattedValueObject: {JSON.stringify(formattedValueObject1)}</p>
      </div>

      <div>
        <CurrencyInput
          label="MFA"
          value={value2}
          onValueChange={(value, name, formattedValueObject) => {
            setValue2(value || "");
            setName2(name || "");
            setFormattedValueObject2(formattedValueObject);
          }}
        />
        <p>Value: {value2}</p>
        <p>Name: {name2}</p>
        <p>setFormattedValueObject: {JSON.stringify(formattedValueObject2)}</p>
      </div>
    </div>
  );
};

export default Controlled;
