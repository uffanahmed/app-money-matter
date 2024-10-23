"use client";

import React, { useEffect, useState } from "react";
import { MortgageData } from "../InputForm";
import { MortgagePlan } from "../../utils/mortgageCalculator";
import "./index.scss";
import DataTable from "@/app/components/DataTable";
import MortgageSummary from "../MortgageSummary";
import ChartInstallmentView from "../ChartInstallmentView";
import ChartRegularAndExtraPayComparison from "../ChartRegularAndExtraPayComparison";
import ChartPaymentRatioComparison from "../ChartPaymentRatioComparison";

export type ExtraPaymentPackagesDetailsProps = {
  mortgageData: MortgageData;
  paymentPlanRegular: MortgagePlan;
  paymentPlanExtra: MortgagePlan;
};

export default function ExtraPaymentPackagesDetails({
  mortgageData,
  paymentPlanRegular,
  paymentPlanExtra,
}: ExtraPaymentPackagesDetailsProps) {
  return (
    <>
      <MortgageSummary mortgagePlan={paymentPlanExtra} />

      <br />
      <h4>This will be your payment plan with extra payment</h4>
      <DataTable
        config={{ height: 400 }}
        dataItems={paymentPlanExtra.installments}
        columns={[
          {
            label: "Year",
            key: "custom",
            custom: (item) => {
              return item.month.toString().split(" ")[1];
            },
          },
          { label: "Month", key: "month" },
          {
            label: "Interest Payment",
            type: "currency",
            key: "interestPayment",
          },
          {
            label: "Principle Payment",
            type: "currency",
            key: "principalRepayment",
          },
          { label: "Total Payment", type: "currency", key: "totalPayment" },
          { label: "Extra Payment", type: "currency", key: "extraPayment" },
          {
            label: "Outstanding Balance",
            type: "currency",
            key: "outstandingBalance",
          },
        ]}
      />

      <br />
      <ChartPaymentRatioComparison
        mortgageData={mortgageData}
        paymentRegular={paymentPlanRegular}
        paymentExtra={paymentPlanExtra}
        titleRegular={"Interest and Principle amount ratio with regular payment"}
        titleExtra={"Interest and Principle amount ratio with extra payment"}
      />

      <br />
      <h4>Comparison of extra payment vs regular payment (Interest and Principle amount)</h4>
      <ChartRegularAndExtraPayComparison
        mortgageData={mortgageData}
        paymentRegular={paymentPlanRegular}
        paymentExtra={paymentPlanExtra}
      />

      <br />
      <h4>Portion of Interest you will pay in installment every year (with regular payment)</h4>
      <ChartInstallmentView
        mortgageData={mortgageData}
        paymentPlan={paymentPlanRegular}
      />

      <br />
      <h4>Portion of Interest you will pay in installment every year (with extra payment)</h4>
      <ChartInstallmentView
        mortgageData={mortgageData}
        paymentPlan={paymentPlanExtra}
      />
    </>
  );
}
