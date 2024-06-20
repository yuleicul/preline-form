import FormInput from "@/components/FormInput";
import { useState } from "react";

const Controlled = () => {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("deafult@gamil.com");

  return (
    <>
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
    </>
  );
};

export default Controlled;
