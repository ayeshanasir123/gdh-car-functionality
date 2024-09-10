"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import InputField from "../payment-details/payment-details-card/input-field";
import DetailsTitle from "../results-details/results-details-card/details-title";
import PassengerInputField from "./passenger-details-card/passenger-input-field";
import { filterNumericInput } from "@/lib/input-helpers";
interface ContactFormInputs {
  email: string;
  contactNumber: string;
}

interface ContactFormProps {
  formMethods: UseFormReturn<ContactFormInputs>;
}

const ContactDetailsForm: React.FC<ContactFormProps> = ({ formMethods }) => {
  const {
    register,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = formMethods;

  const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      setError("contactNumber", {
        type: "manual",
        message: "Only numeric characters are allowed",
      });
    } else {
      clearErrors("contactNumber");
      setValue("contactNumber", filterNumericInput(value));
    }
  };

  return (
    <div>
      <DetailsTitle text="Contact Details" />
      <hr className="mt-4" />
      <div className="grid gap-12 md:grid-cols-2">
        <PassengerInputField
          label="Email"
          registration={{
            ...register("email", {
              required: "This field is required",
            }),
          }}
          error={errors.email?.message}
          placeholder="your@email.com"
        />
        <PassengerInputField
          label="Contact Number"
          registration={{
            ...register("contactNumber", {
              required: "This field is required",
              onChange: handleNumericInputChange,
            }),
          }}
          error={errors.contactNumber?.message}
          placeholder="Enter your contact number"
        />
      </div>
    </div>
  );
};

export default ContactDetailsForm;
