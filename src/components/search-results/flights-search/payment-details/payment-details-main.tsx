"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import SubmitButton from "./payment-details-card/submit-button";
import PaymentForm from "./payment-form";
import BillingForm from "./billing-form";
import FlightSummary from "./flight-summary";
import ProductSummary from "./payment-details-card/product-summary";
import {
  paymentFormSchema,
  billingFormSchema,
} from "@/data/flights/search-results/validation-scheme";
import { yupResolver } from "@hookform/resolvers/yup";

interface PaymentFormInputs {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface BillingFormInputs {
  streetAddress: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

const FlightsSearchPaymentDetailsMain = () => {
  const router = useRouter();

  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const paymentForm = useForm<PaymentFormInputs>({
    resolver: yupResolver(paymentFormSchema),
  });

  const billingForm = useForm<BillingFormInputs>({
    resolver: yupResolver(billingFormSchema),
  });

  const onSubmit: SubmitHandler<PaymentFormInputs & BillingFormInputs> = (
    data,
  ) => {
    console.log("Combined Form Data:", data);
    router.push(
      "/flights/search-results/results-details/passenger-details/payment-details/booking-confirmation",
    );
  };

  const handleSubmit = async () => {
    let paymentFormResult, billingFormResult;

    if (selectedMethod === "creditCard") {
      paymentFormResult = await paymentForm.trigger();
      billingFormResult = await billingForm.trigger();
    } else {
      billingFormResult = await billingForm.trigger();
    }

    const isPaymentFormValid =
      selectedMethod !== "creditCard" || paymentFormResult;
    const isBillingFormValid = billingFormResult;

    if (isPaymentFormValid && isBillingFormValid) {
      const paymentData = paymentForm.getValues();
      const billingData = billingForm.getValues();
      onSubmit({ ...paymentData, ...billingData });
    }
  };

  return (
    <div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        <div className="col-span-2">
          <div className="flex flex-col">
            <PaymentForm
              formMethods={paymentForm}
              selectedMethod={selectedMethod}
            />
            <BillingForm formMethods={billingForm} />
          </div>
        </div>
        <div className="flex flex-col rounded-lg border">
          <FlightSummary />
          <ProductSummary />
          <div className="mb-12 flex justify-center">
            <SubmitButton type="button" onClick={handleSubmit}>
              Submit
            </SubmitButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightsSearchPaymentDetailsMain;
