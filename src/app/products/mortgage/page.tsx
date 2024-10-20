"use client";

import { useNavigationContext } from "@/app/context/NavigationContext";
import React from "react";

export default function ProductMortgage() {
  const {
    activeProduct,
    activeProductOption,
  } = useNavigationContext();

  return (
    <div>
        <h1>Mortgage</h1>
        <h1>activeProduct: {activeProduct}</h1>
        <h1>activeProductOption: {activeProductOption}</h1>
    </div>
  );
}
