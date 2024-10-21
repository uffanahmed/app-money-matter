"use client";

import { Alert } from "antd";
import React from "react";
import { MortgageData } from "./InputForm";

export function ExtraPaymentWarning({ data }: { data: MortgageData | null }) {

  if (data && data.amount) {
    const extraPaymentLimit = data.amount * 10 / 100;
    const message = `Every year you can pay up to 10% of the principle amount without any additional charges. In your case you can pay up to ${extraPaymentLimit} every year without any additional charges.`;

    return (
      <>
        <Alert
          message="Do you know?"
          description={message}
          type="warning"
          showIcon
        />
      </>
    );
  }

  return <></>;
}
