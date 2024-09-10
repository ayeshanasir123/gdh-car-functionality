// validationSchema.ts
import * as yup from "yup";

export const paymentFormSchema = yup.object().shape({
  cardName: yup
    .string()
    .required("Cardholder name is required")
    .matches(/^[A-Za-z\s]+$/, "Cardholder name should contain only letters"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^[0-9]+$/, "Card number should contain only numbers"),
  expiryDate: yup.string().required("Expiry date is required"),
  cvv: yup.string().required("CVV is required"),
});

export const billingFormSchema = yup.object().shape({
  streetAddress: yup.string().required("Street address is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postalCode: yup.string().required("Postal code is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  countryCode: yup.string().required("Country code is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});

export const contactDetailsSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  contactNumber: yup.string().required("Contact number is required"),
});

export const passengerSchema = yup.object().shape({
  givenNames: yup.string().required("Given names are required"),
  surnames: yup.string().required("Surnames are required"),
  nationality: yup.string().required("Nationality is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
});

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  contactNumber: yup.string().required("Contact number is required"),
  passengers: yup.array().of(passengerSchema),
});
