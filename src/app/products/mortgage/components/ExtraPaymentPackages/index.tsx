"use client";

import React from "react";
import { MortgageData } from "../InputForm";
import {
  MortgagePlan,
} from "../../utils/mortgageCalculator";
import "./index.scss";
import { ExtraPaymentPlan } from "./ExtraPaymentPlan";

export type ExtraPaymentPackagesProps = {
  mortgageData: MortgageData;
  mortgagePlan: MortgagePlan;
};

export default function ExtraPaymentPackages({
  mortgageData,
  mortgagePlan,
}: ExtraPaymentPackagesProps) {
  const monthlyExtraPayment = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1350, 1500,
  ];
  const quarterlyExtraPayment = [
    300, 600, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000,
  ];
  const annuallyExtraPayment = [
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000,
  ];

  return (
    <>
      <h4>
        Want to pay more than your regular installment once in a month? Discover the benefits.
      </h4>
      <div className="extra-payment">
        {monthlyExtraPayment.map((amount, index) => (
          <div className="packages" key={index}>
            <ExtraPaymentPlan
              mortgageData={mortgageData}
              mortgagePlan={mortgagePlan}
              extraPaymentAmount={amount}
              extraPaymentFrequency="MONTHLY"
            />
          </div>
        ))}
      </div>
      <br />

      <h4>
        Want to pay more than your regular installment once in a quarter? Discover the benefits.
      </h4>
      <div className="extra-payment">
        {quarterlyExtraPayment.map((amount, index) => (
          <div className="packages" key={index}>
            <ExtraPaymentPlan
              mortgageData={mortgageData}
              mortgagePlan={mortgagePlan}
              extraPaymentAmount={amount}
              extraPaymentFrequency="QUARTERLY"
            />
          </div>
        ))}
      </div>
      <br />

      <h4>
      Want to pay more than your regular installment once in a year? Discover the benefits.
      </h4>
      <div className="extra-payment">
        {annuallyExtraPayment.map((amount, index) => (
          <div className="packages" key={index}>
            <ExtraPaymentPlan
              mortgageData={mortgageData}
              mortgagePlan={mortgagePlan}
              extraPaymentAmount={amount}
              extraPaymentFrequency="ANNUALLY"
            />
          </div>
        ))}
      </div>
      <br />
    </>
  );
}
