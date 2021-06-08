import "./App.css";
import Form from './Components/Validation/Form'

function App() {
  const inputs = [
    { name: "username", type: "text", placeholder: "Full Name" },
    { name: "phone", type: "phone", placeholder: "Phone Number" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  return (
    <Form
      submitHandler={(data) => console.log(data)}
      inputs={inputs}
      datePicker={true}
    />
  );
}

export default App;
