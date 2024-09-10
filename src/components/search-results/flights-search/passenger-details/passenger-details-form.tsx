import React from "react";
import { UseFormReturn } from "react-hook-form";
import InputField from "../payment-details/payment-details-card/input-field";
import SelectField from "../payment-details/payment-details-card/select-field";
import DetailsTitle from "../results-details/results-details-card/details-title";
import { filterAlphabeticInput } from "@/lib/input-helpers";
import { countriesData } from "@/data/flights/search-results/countries-data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface PassengerFormInputs {
  passengers: {
    givenNames: string;
    surnames: string;
    nationality: string;
    gender: string;
    dateOfBirth: Date | null;
  }[];
}

interface PassengerDetailsFormProps {
  formMethods: UseFormReturn<PassengerFormInputs>;
  index: number;
}

const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({
  formMethods,
  index,
}) => {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    getValues,
  } = formMethods;

  const passengerErrors =
    errors.passengers && Array.isArray(errors.passengers)
      ? errors.passengers[index]
      : undefined;

  const handleAlphabeticInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PassengerFormInputs["passengers"][number],
  ) => {
    const value = filterAlphabeticInput(e.target.value);

    if (value !== e.target.value) {
      setError(`passengers.${index}.${field}`, {
        type: "manual",
        message: "Only alphabetic characters are allowed",
      });
    } else {
      clearErrors(`passengers.${index}.${field}`);
      setValue(`passengers.${index}.${field}`, value);
    }
  };

  const [renderCount, setRenderCount] = React.useState(0);

  const forceReRender = () => setRenderCount(renderCount + 1);

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="mt-12">
      {index < 1 ? (
        <DetailsTitle text="Primary Passenger" />
      ) : (
        <DetailsTitle text={`Passenger ${index + 1}`} />
      )}
      <hr className="mt-4" />
      <div className="mt-12 bg-[#e7f4fd] p-4">
        <div className="flex items-center space-x-4">
          <div className="h-5 w-5 rounded-full bg-lightBlue text-white">
            <p className="text-center text-sm font-medium">i</p>
          </div>
          <p className="mt-4">
            To avoid boarding complications, enter all names and surnames{" "}
            <b>exactly as they appear in your passport ID</b>
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 lg:gap-12">
        <InputField
          label="Given Names"
          registration={{
            ...register(`passengers.${index}.givenNames`, {
              required: "This field is required",
              onChange: (e) => handleAlphabeticInputChange(e, "givenNames"),
            }),
          }}
          error={passengerErrors?.givenNames?.message}
          placeholder="e.g. Oliver James"
        />
        <InputField
          label="Surnames"
          registration={{
            ...register(`passengers.${index}.surnames`, {
              required: "This field is required",
              onChange: (e) => handleAlphabeticInputChange(e, "surnames"),
            }),
          }}
          error={passengerErrors?.surnames?.message}
          placeholder="e.g. Brown"
        />
      </div>
      <div className="grid  lg:grid-cols-3 lg:gap-12">
        <SelectField
          name={`passengers.${index}.nationality`}
          label="Nationality"
          value={getValues().passengers[index].nationality}
          options={countriesData.map((country) => ({
            value: country.name,
            label: country.nationality,
          }))}
          onChange={(value) => {
            setValue(`passengers.${index}.nationality`, value);

            forceReRender();
          }}
          error={passengerErrors?.nationality}
        />
        <SelectField
          name={`passengers.${index}.gender`}
          label="Gender"
          value={getValues().passengers[index].gender}
          options={genderOptions}
          onChange={(value) => {
            setValue(`passengers.${index}.gender`, value);
            forceReRender();
          }}
          error={passengerErrors?.gender}
        />
        <div>
          <div className="mt-10 flex h-12 items-center gap-3 rounded border py-2 pl-3">
            <DatePicker
              selected={getValues().passengers[index].dateOfBirth || null}
              onChange={(date) => {
                setValue(`passengers.${index}.dateOfBirth`, date);
                forceReRender();
              }}
              className="flex-grow bg-transparent outline-none placeholder:text-[16px]"
              placeholderText="MM/dd/yyyy"
              dateFormat="MM/dd/yyyy"
              showYearDropdown
              scrollableYearDropdown
            />
          </div>
          {passengerErrors?.dateOfBirth && (
            <p className="mt-1 text-sm text-red-500">
              {passengerErrors.dateOfBirth.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerDetailsForm;
