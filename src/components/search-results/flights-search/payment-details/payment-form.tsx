import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RadioButton from "./payment-details-card/radio-button";
import InputField from "./payment-details-card/input-field";
import Image from "next/image";
import { filterAlphabeticInput, filterNumericInput } from "@/lib/input-helpers";
import DetailsTitle from "../results-details/results-details-card/details-title";

interface PaymentFormInputs {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentFormProps {
  formMethods: UseFormReturn<PaymentFormInputs>;
  selectedMethod: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ formMethods }) => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = formMethods;

  const [selectedMethod, setSelectedMethod] = useState<string>("creditCard");

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    clearErrors(); // Clear any existing errors when method changes
  };

  const handleAlphabeticInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (/[^A-Za-z\s]/.test(value)) {
      setError("cardName", {
        type: "manual",
        message: "Only alphabetic characters are allowed",
      });
    } else {
      clearErrors("cardName");
      setValue("cardName", filterAlphabeticInput(value));
    }
  };

  const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      setError("cardNumber", {
        type: "manual",
        message: "Only numeric characters are allowed",
      });
    } else {
      clearErrors("cardNumber");
      setValue("cardNumber", filterNumericInput(value));
    }
  };

  return (
    <form className="rounded-lg border bg-white p-8">
      <DetailsTitle text="Payment Method" />
      <div className="justify-between md:flex">
        <RadioButton
          name="paymentMethod"
          value="creditCard"
          label="Pay with Credit Card or Debit"
          checked={selectedMethod === "creditCard"}
          onChange={() => handleMethodChange("creditCard")}
        />
        <div className="grid grid-cols-3 gap-6">
          <Image
            width={60}
            height={60}
            alt="card"
            src="/assets/images/flights/search-results/search-payment-details/card-images/card.png"
          />
          <Image
            width={60}
            height={60}
            alt="card"
            src="/assets/images/flights/search-results/search-payment-details/card-images/visa.png"
          />
          <Image
            width={60}
            height={60}
            alt="card"
            src="/assets/images/flights/search-results/search-payment-details/card-images/american-express.png"
          />
        </div>
      </div>
      {selectedMethod === "creditCard" && (
        <div className="space-y-2">
          <InputField
            label="Cardholder Name*"
            registration={{
              ...register("cardName", {
                required: "This field is required",
                onChange: handleAlphabeticInputChange,
              }),
            }}
            error={errors.cardName?.message}
            placeholder="Name on Card"
          />
          <InputField
            label="Card number *"
            registration={{
              ...register("cardNumber", {
                required: "This field is required",
                onChange: handleNumericInputChange,
              }),
            }}
            error={errors.cardNumber?.message}
            placeholder="Card Number"
          />
          <div className="flex space-x-4">
            <InputField
              label="Expiry *"
              registration={register("expiryDate", {
                required: "This field is required",
              })}
              error={errors.expiryDate?.message}
              type="text"
              placeholder="MM/YY"
            />
            <InputField
              label="CVV *"
              registration={register("cvv", {
                required: "This field is required",
              })}
              error={errors.cvv?.message}
              type="number"
              placeholder="CVV code"
            />
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <RadioButton
          name="paymentMethod"
          value="paypal"
          label="Pay with PayPal"
          checked={selectedMethod === "paypal"}
          onChange={() => handleMethodChange("paypal")}
        />
        <Image
          width={60}
          height={60}
          alt="paypal"
          src="/assets/images/flights/search-results/search-payment-details/card-images/paypal.png"
        />
      </div>

      <RadioButton
        name="paymentMethod"
        value="affirm"
        label="Pay with Monthly Payments"
        checked={selectedMethod === "affirm"}
        onChange={() => handleMethodChange("affirm")}
      />
    </form>
  );
};

export default PaymentForm;
