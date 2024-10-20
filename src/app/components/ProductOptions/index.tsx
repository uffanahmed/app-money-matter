"use client";

import { useNavigationContext } from "@/app/context/NavigationContext";
import { ProductOptionDefinition } from "@/app/types/ProductDefinition";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type ProductOptionsProps = {
  navigationOption: ProductOptionDefinition[];
};

export default function ProductOptions({
  navigationOption,
}: ProductOptionsProps) {
  const { activeProductOption, setActiveProductOption } =
    useNavigationContext();

  return (
    <div>
      <ul className="main-menu">
        {navigationOption.map(
          (option: ProductOptionDefinition, index: number) => (
            <li key={index}>
              <a
                className={activeProductOption === option.key ? "active" : ""}
                onClick={() => setActiveProductOption(option.key)}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
                {option.label}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
