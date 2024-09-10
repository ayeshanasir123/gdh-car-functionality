"use client";
import ClientBreadcrumbWrapper from "@/components/hero/client-breadcrumb-wrapper";
import StepperComponent from "@/components/hero/stepper/stepper-component";

export default function FlightsSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const steps = [
    {
      title: "Flight Details",
      href: "/flights/search-results/results-details",
    },

    {
      title: "Passenger Details",
      href: "/flights/search-results/results-details/passenger-details",
    },
    {
      title: "Payment",
      href: "/flights/search-results/results-details/passenger-details/payment-details",
    },

    {
      title: "Flight Confirmation",
      href: "/flights/search-results/results-details/passenger-details/payment-details/booking-confirmation",
    },
  ];

  return (
    <>
      <StepperComponent steps={steps} />
      <ClientBreadcrumbWrapper />
      {children}
    </>
  );
}
