import "../styles/ContactForm.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Message from "./Message";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

function ContactForm() {
  const form = useForm<FormValues>();

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const [submitClicked, setSubmitClicked] = useState(false);

  const onSubmit = (data: FormValues) => {
    setSubmitClicked(true);
    console.log(data);
  };

  return (
    <div className="wrapper">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="name">
          Name: <span id="asterisks">*</span>
        </label>

        <input
          type="text"
          id="name"
          {...register("name", {
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Name can only contain letters and spaces",
            },
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        <p className="error">{errors.name?.message}</p>

        <label htmlFor="email">
          Email: <span id="asterisks">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-']+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
            required: {
              value: true,
              message: "Email is required",
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>
        <label htmlFor="message">
          Message: <span id="asterisks">*</span>
        </label>
        <textarea
          id="message"
          {...register("message", {
            required: {
              value: true,
              message: "Message is required",
            },
          })}
        />
        <p className="error">{errors.message?.message}</p>
        <button type="submit">Send</button>
        {submitClicked && <Message text="Form submitted successfully!" />}
      </form>

      <DevTool control={control} />
    </div>
  );
}
export default ContactForm;
