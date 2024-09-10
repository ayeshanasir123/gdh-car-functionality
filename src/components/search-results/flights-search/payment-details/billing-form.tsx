// components/ui/billing-form.tsx
"use client";
import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import InputField from "./payment-details-card/input-field";
import SelectField from "./payment-details-card/select-field";
import { countriesData } from "@/data/flights/search-results/countries-data";
import { useId } from "react-id-generator";
import { filterNumericInput, filterAlphabeticInput } from "@/lib/input-helpers";
import DetailsTitle from "../results-details/results-details-card/details-title";
import Select from "react-select";

interface FormValues {
  streetAddress: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

interface BillingFormProps {
  formMethods: UseFormReturn<FormValues>;
}

const BillingForm: React.FC<BillingFormProps> = ({ formMethods }) => {
  const {
    getValues,
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = formMethods;

  // Generate unique IDs using useId hook
  const countryCodeInstanceId = useId();
  const dialCodeInstanceId = useId();
  const countryInstanceId = useId();

  const handleAlphabeticInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormValues,
  ) => {
    const value = e.target.value;
    if (/[^A-Za-z\s]/.test(value)) {
      setError(field, {
        type: "manual",
        message: "Only alphabetic characters are allowed",
      });
    } else {
      clearErrors(field);
      setValue(field, filterAlphabeticInput(value));
    }
  };

  const handleNumericInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormValues,
  ) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      setError(field, {
        type: "manual",
        message: "Only numeric characters are allowed",
      });
    } else {
      clearErrors(field);
      setValue(field, filterNumericInput(value));
    }
  };

  const countryValue = watch("country");
  const countryCodeValue = watch("countryCode");

  return (
    <form className="mt-6 rounded-lg border bg-white p-8">
      <DetailsTitle text="Billing Method" />
      <InputField
        label="Street address *"
        registration={register("streetAddress", {
          required: "Street address is required",
        })}
        error={errors.streetAddress?.message}
        placeholder="123 Main St"
      />
      <SelectField
        label="Country"
        name="country"
        value={getValues().country}
        options={countriesData.map((country) => ({
          value: country.name,
          label: country.name,
        }))}
        onChange={(value) => setValue("country", value)}
        error={errors.countryCode}
      />
      <InputField
        label="City *"
        registration={{
          ...register("city", {
            required: "City is required",
            onChange: (e) => handleAlphabeticInputChange(e, "city"),
          }),
        }}
        error={errors.city?.message}
        placeholder="New York"
      />
      <InputField
        label="State/Province *"
        registration={{
          ...register("state", {
            required: "State is required",
            onChange: (e) => handleAlphabeticInputChange(e, "state"),
          }),
        }}
        error={errors.state?.message}
        placeholder="NY"
      />
      <InputField
        label="Postal code *"
        registration={{
          ...register("postalCode", {
            required: "Postal code is required",
            onChange: (e) => handleNumericInputChange(e, "postalCode"),
          }),
        }}
        error={errors.postalCode?.message}
        placeholder="10001"
      />
      <InputField
        label="Email address *"
        registration={register("email", { required: "Email is required" })}
        error={errors.email?.message}
        placeholder="example@example.com"
      />
      <div className="md:flex md:space-x-4">
        <SelectField
          label="Country Code"
          name="countryCode"
          value={getValues().countryCode}
          options={countriesData.map((country) => ({
            value: country.dialCode,
            label: country.dialCode,
          }))}
          onChange={(value) => setValue("countryCode", value)}
          error={errors.countryCode}
        />

        <InputField
          label="Mobile phone number *"
          registration={{
            ...register("phoneNumber", {
              required: "Phone number is required",
              onChange: (e) => handleNumericInputChange(e, "phoneNumber"),
            }),
          }}
          error={errors.phoneNumber?.message}
          placeholder="123-456-7890"
        />
      </div>
    </form>
  );
};

export default BillingForm;
