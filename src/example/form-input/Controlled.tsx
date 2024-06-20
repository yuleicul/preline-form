import FormInput from "@/components/FormInput";
import { useState } from "react";

const Controlled = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <FormInput
        label="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p>Email: {email}</p>
    </>
  );
};

export default Controlled;
