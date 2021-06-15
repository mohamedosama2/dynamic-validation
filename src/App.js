import { useState } from "react";
import "./App.css";
import Form from "./Components/Validation/Form";

function App() {
  const [reset, setReset] = useState(false);

  const clearReset = () => {
    setReset(false);
  };

  const inputs = [
    { name: "username", type: "text", placeholder: "Full Name" },
    { name: "phone", type: "phone", placeholder: "Phone Number" },
    { name: "password", type: "password", placeholder: "Password" },
    {
      name: "radio1",
      type: "radio",
      additions: { value: "male" },
    },
    {
      name: "radio1",
      type: "radio",
      additions: { value: "female" },
    },
  ];

  return (
    <Form
      submitHandler={(data) => {
        setReset(true);
      }}
      clearReset={clearReset}
      inputs={inputs}
      reset={reset}
      datePicker={true}
    />
  );
}

export default App;
