import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "./Form.css";
const phoneRegExp = /^01[0125][0-9]{8}$/;

function AddTrainer(props) {
  const [startDate, setStartDate] = useState(new Date());

  const shape = {};

  props.inputs.forEach((i) => {
    let name = i["name"];
    let values = [];

    if (i["type"]) values.push(i["type"]);
    else values.push("text");

    if (i["notRequired"]) values.push("notRequired");
    else values.push("required");

    if (
      values[0] === "string" ||
      values[0] === "text" ||
      values[0] === "password"
    ) {
      if (values[1] === "notRequired") {
        shape[[name]] = yup.string().notRequired();
      } else {
        shape[[name]] = yup.string().required();
      }
    } else if (values[0] === "number") {
      shape[[name]] = yup.string().notRequired();
      if (values[1] === "notRequired") {
      } else {
        shape[[name]] = yup.string().required();
      }
    } else if (values[0] === "phone") {
      if (values[1] === "notRequired") {
        shape[[name]] = yup
          .string()
          .matches(phoneRegExp, "Phone number is not valid")
          .notRequired();
      } else {
        shape[[name]] = yup
          .string()
          .matches(phoneRegExp, "Phone number is not valid")
          .required();
      }
    } else if (values[0] === "email") {
      if (values[1] === "notRequired") {
        shape[[name]] = yup.string().notRequired().email();
      } else {
        shape[[name]] = yup.string().required().email();
      }
    } else {
      if (values[1] === "notRequired") {
        shape[[name]] = yup.string().notRequired();
      } else {
        shape[[name]] = yup.string().required();
      }
    }
  });

  const schema = yup.object().shape(shape);
  console.log(shape);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(props.submitHandler)}
      className={props.formStyle}
    >
      {props.inputs.map((input, key) => {
        return (
          <div key={key}>
            <input
              name={input.name}
              placeholder={input.placeholder}
              type={input.type}
              className={props.inputStyle}
              {...register(input.name)}
              style={{
                border: errors[input.name] ? "1px solid rgb(172, 50, 50)" : "",
              }}
              {...input.additions}
            />
            {errors[input.name]?.message ? (
              <p className="message">{errors[input.name]?.message}</p>
            ) : (
              ""
            )}
          </div>
        );
      })}
      {props.datePicker ? (
        <div style={{ width: "50%" }}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      ) : (
        ""
      )}

      <button type="submit">Add Trainer</button>
    </form>
  );
}

export default AddTrainer;
