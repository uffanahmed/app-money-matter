"use client";

import React, { useEffect, useState } from "react";
import { MortgageData } from "../InputForm";
import { generateExtraPayments } from "@/app/utils/generateExtraPayment";
import { mortgageCalculator, MortgagePlan } from "../../utils/mortgageCalculator";
import { currencyFormat } from "@/app/utils/currencyFormat";
import InfoCard from "@/app/components/InfoCard";
import './index.scss';

export type ExtraPaymentPackagesProps = {
  mortgageData: MortgageData,
  mortgagePlan: MortgagePlan,
};

export default function ExtraPaymentPackages({
  mortgageData,
  mortgagePlan,
}: ExtraPaymentPackagesProps) {
  const monthlyExtraPayment = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1350, 1500];
  const quarterlyExtraPayment = [300, 600, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000];
  const annuallyExtraPayment = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000];

  return (
    <>
      <h4>If you are willing to go with extra payment once in a month then here are the possibilities</h4>
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

      <h4>If you are willing to go with extra payment once in a quarter then here are the possibilities</h4>
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

      <h4>If you are willing to go with extra payment once in a year then here are the possibilities</h4>
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
// =================================================================================================================
export type ExtraPaymentPlanProps = {
  mortgageData: MortgageData,
  mortgagePlan: MortgagePlan,
  extraPaymentAmount: number,
  extraPaymentFrequency: "MONTHLY" | "QUARTERLY" | "ANNUALLY",
};

function ExtraPaymentPlan({
  mortgageData,
  mortgagePlan,
  extraPaymentAmount,
  extraPaymentFrequency,
}: ExtraPaymentPlanProps) {
  const [mortgagePlanExtraPayment, setMortgagePlanExtraPayment] = useState<MortgagePlan>();
  const [stats, setStats] = useState<any>();
  const { amount, interest, date, years, scheme } = mortgageData;

  useEffect(() => {
    const extraPayments = generateExtraPayments(extraPaymentAmount, date, years, extraPaymentFrequency);
    const mortgagePlanExtraPaymentPlan = mortgageCalculator(
      amount,
      interest,
      years,
      date,
      scheme,
      extraPayments,
      0.0,
      false
    );

    let frequencyName = '';
    let totalAmountPaidInYear = 0;
    switch (extraPaymentFrequency) {
      case 'MONTHLY':
        totalAmountPaidInYear = extraPaymentAmount * 12;
        frequencyName = 'month';
        break;
      case 'QUARTERLY':
        totalAmountPaidInYear = extraPaymentAmount * 4;
        frequencyName = 'quarter';
        break;
      case 'ANNUALLY':
        totalAmountPaidInYear = extraPaymentAmount;
        frequencyName = 'year';
        break;
    }

    const maximumAllowedExtraPayment = amount * 0.10;

    const stats = {
      saveInterest: mortgagePlan.summary.totalInterestPaid - mortgagePlanExtraPaymentPlan.summary.totalInterestPaid,
      earlyPayoff: mortgagePlanExtraPaymentPlan.earlyPayoff,
      frequency: frequencyName,
      amount: extraPaymentAmount,
      maximumAllowedExtraPayment,
      totalAmountPaidInYear,
    };

    setStats(stats);
    setMortgagePlanExtraPayment(mortgagePlanExtraPaymentPlan);
  }, [mortgageData, extraPaymentAmount, extraPaymentFrequency]);

  return (
    <>
      {stats && (
        <InfoCard
          subTitle={`By paying ${currencyFormat(stats.amount)} extra every ${stats.frequency}`}
          title={<>
            Save upto <strong>{currencyFormat(stats.saveInterest)}</strong>
          </>}
          description={<>
            Pay <strong>{currencyFormat(stats.amount)}</strong> more <strong> once in a {stats.frequency} </strong>
            and save <strong>{currencyFormat(stats.saveInterest)}</strong> in interest.
            Finish your mortgage <strong>{stats.earlyPayoff.years} years and {stats.earlyPayoff.months} months earlier!</strong>
          </>}
          warningMessage={stats.totalAmountPaidInYear > stats.maximumAllowedExtraPayment ? 'In this case maybe you have to pay some penalty, because you are paying more than 10% of your principle amount in a year' : ''}
          buttonLabel="Explore this Option"
          onClick={() => {
            console.log("clicked");
          }}
        />
      )}
    </>
  );
}
