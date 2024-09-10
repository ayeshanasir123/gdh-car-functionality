"use client";
import { useState } from "react";

const Input = () => {
  const [email, setEmail] = useState("");

  function handleSubmitForm() {
    console.log(email);
    setEmail("");
  }
  return (
    <>
      <input
        placeholder="Please enter your email here"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        className="w-full rounded-lg border border-gray-200 px-3 py-3 text-[18px] outline-none placeholder:text-[17px] lg:py-4 placeholder:lg:text-[19px]"
      />
      <button
        onClick={handleSubmitForm}
        className="mt-4 flex w-full items-center justify-center rounded-lg bg-lightBlue py-4 text-[17px] font-semibold tracking-wide text-white lg:text-[19px]"
      >
        Subscribe
      </button>
    </>
  );
};

export default Input;
