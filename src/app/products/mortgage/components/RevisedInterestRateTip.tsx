"use client";

import { Alert } from "antd";
import React from "react";
import { MortgageData } from "./InputForm";

export function RevisedInterestRateTip({ data }: { data: MortgageData | null }) {

  if (data && data.amount) {
    const paidPrinciple = data.amount * 25 / 100;
    const message = `Paid 25% of your mortgage? Get a penalty-free interest rate revision if rates drop. Request a property revaluation and ask your bank to review your rate. In your case If you already paid ${paidPrinciple} you can request a interest rate revision without any penalty.`;

    return (
      <>
        <Alert
          message="Do you know? Banks often keep quiet about penalty-free mortgage rate revisions"
          description={message}
          type="success"
          showIcon
        />
      </>
    );
  }

  return <></>;
}
