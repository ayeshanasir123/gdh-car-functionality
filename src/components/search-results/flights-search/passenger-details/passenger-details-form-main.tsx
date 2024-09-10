"use client";

import React, { useEffect, useState } from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ContactDetailsForm from "./contact-details-form";
import PassengerDetailsForm from "./passenger-details-form";
import {
  schema,
  contactDetailsSchema,
} from "@/data/flights/search-results/validation-scheme";
import SubmitButton from "../payment-details/payment-details-card/submit-button";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
interface ContactFormInputs {
  email: string;
  contactNumber: string;
}
interface PassengerFormInputs {
  passengers: {
    givenNames: string;
    surnames: string;
    nationality: string;
    gender: string;
    dateOfBirth: Date | null;
  }[];
}

const PassengerDetailsFormMain: React.FC = () => {
  const router = useRouter();

  const contactForm = useForm<ContactFormInputs>({
    resolver: yupResolver(contactDetailsSchema),
  });
  const formMethods = useForm<PassengerFormInputs>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      passengers: [
        {
          givenNames: "",
          surnames: "",
          nationality: "",
          gender: "",
          dateOfBirth: null,
        },
      ],
    },
  });

  const {
    control,
    formState: { errors },
  } = formMethods;

  const { fields, append } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit: SubmitHandler<ContactFormInputs & PassengerFormInputs> = (
    data,
  ) => {
    console.log("Combined Form Data:", data);
    router.replace(
      "/flights/search-results/results-details/passenger-details/payment-details",
    );
  };

  const handleSubmit = () => {
    const contactFormResult = contactForm.trigger();
    const passengerFormResult = formMethods.trigger();
    const passengerFormData = formMethods.getValues();
    console.log("🚀 ~ handleSubmit ~ passengerFormData:", passengerFormData);
    const contactFormData = contactForm.getValues();
    console.log("🚀 ~ handleSubmit ~ contactFormData:", contactFormData);

    Promise.all([contactFormResult, passengerFormResult]).then((results) => {
      const [isContactFormValid, isPassengerFormValid] = results;
      console.log(
        "🚀 ~ Promise.all ~ results:",
        JSON.stringify(results, null, 2),
      );
      if (isContactFormValid || isPassengerFormValid) {
        const contactFormData = contactForm.getValues();
        const passengerFormData = formMethods.getValues();
        onSubmit({ ...contactFormData, ...passengerFormData });
      }
    });
  };

  const passengers = useAppSelector(
    (state: RootState) => state.flight.passengers,
  );
  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  const addPassenger = () => {
    if (fields.length < totalPassengers) {
      append({
        givenNames: "",
        surnames: "",
        nationality: "",
        gender: "",
        dateOfBirth: null,
      });
    }
  };

  return (
    <div>
      <div>
        <ContactDetailsForm formMethods={contactForm} />
        {fields.map((field, index) => (
          <PassengerDetailsForm
            key={field.id}
            formMethods={formMethods}
            index={index}
          />
        ))}

        <div className="mt-12 border p-4 ">
          <div className="flex items-center justify-between">
            <p className="font-bold">Booking for more passengers?</p>
            <button
              className="rounded-lg bg-lightBlue p-2 font-medium text-white opacity-90"
              type="button"
              onClick={addPassenger}
              disabled={fields.length >= totalPassengers}
            >
              Add another passenger
            </button>
          </div>
        </div>

        <SubmitButton type="button" onClick={handleSubmit}>
          Submit
        </SubmitButton>
      </div>
    </div>
  );
};

export default PassengerDetailsFormMain;
