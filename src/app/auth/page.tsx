"use client";

import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigationContext } from "../context/NavigationContext";
import { Product, ProductOptions } from "../enum";

export default function Auth() {
  const {setIsSessionValid} = useAppContext();
  const { setActiveProduct, setActiveProductOption } =
    useNavigationContext();

  useEffect(() => {
    setIsSessionValid(localStorage.getItem('isSessionValid') === '1' ? true : false);
    setActiveProduct(localStorage.getItem('activeProduct') as Product || Product.Mortgage);
    setActiveProductOption(((localStorage.getItem('activeProductOption') || '') as ProductOptions));
  }, []);

  return (
    <div>
      <h1>Login screen</h1>
      <button onClick={() => setIsSessionValid(true)}>Login</button>
    </div>
  );
}
