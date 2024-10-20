"use client";

import { useNavigationContext } from "@/app/context/NavigationContext";
import React from "react";
import { InputForm } from "./components/InputForm";

export function ExtraPaymentOptions() {
  const {
    activeProduct,
    activeProductOption,
  } = useNavigationContext();

  return (
    <>
      <InputForm />
    </>
  );
}
