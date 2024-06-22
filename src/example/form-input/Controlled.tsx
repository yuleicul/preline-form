import { useState } from "react";
import FormInput from "@/ui/FormInput";

const Controlled = () => {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("deafult@gamil.com");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <FormInput
          label="Email"
          placeholder="Email"
          value={email1}
          onChange={(e) => setEmail1(e.target.value)}
        />
        <p>Email: {email1}</p>
      </div>

      <div>
        <FormInput
          label="Email"
          placeholder="Email"
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
        />
        <p>Email: {email2}</p>
      </div>
    </div>
  );
};

export default Controlled;
