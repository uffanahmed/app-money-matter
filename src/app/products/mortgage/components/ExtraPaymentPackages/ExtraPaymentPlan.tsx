import { Button, Modal } from "antd";
import ExtraPaymentPackagesDetails from "../ExtraPaymentPackagesDetails";
import { currencyFormat } from "@/app/utils/currencyFormat";
import InfoCard from "@/app/components/InfoCard";
import { generateExtraPayments } from "@/app/utils/generateExtraPayment";
import { useEffect, useState } from "react";
import { mortgageCalculator, MortgagePlan } from "../../utils/mortgageCalculator";
import { MortgageData } from "../InputForm";

export type ExtraPaymentPlanProps = {
    mortgageData: MortgageData;
    mortgagePlan: MortgagePlan;
    extraPaymentAmount: number;
    extraPaymentFrequency: "MONTHLY" | "QUARTERLY" | "ANNUALLY";
  };

export function ExtraPaymentPlan({
    mortgageData,
    mortgagePlan,
    extraPaymentAmount,
    extraPaymentFrequency,
  }: ExtraPaymentPlanProps) {
    const [mortgagePlanExtraPayment, setMortgagePlanExtraPayment] =
      useState<MortgagePlan>();
    const [stats, setStats] = useState<any>();
    const [modalOpen, setModalOpen] = useState(false);
    const { amount, interest, date, years, scheme } = mortgageData;

    useEffect(() => {
      const extraPayments = generateExtraPayments(
        extraPaymentAmount,
        date,
        years,
        extraPaymentFrequency
      );
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

      let frequencyName = "";
      let totalAmountPaidInYear = 0;
      switch (extraPaymentFrequency) {
        case "MONTHLY":
          totalAmountPaidInYear = extraPaymentAmount * 12;
          frequencyName = "month";
          break;
        case "QUARTERLY":
          totalAmountPaidInYear = extraPaymentAmount * 4;
          frequencyName = "quarter";
          break;
        case "ANNUALLY":
          totalAmountPaidInYear = extraPaymentAmount;
          frequencyName = "year";
          break;
      }

      const maximumAllowedExtraPayment = amount * 0.1;

      const stats = {
        saveInterest:
          mortgagePlan.summary.totalInterestPaid -
          mortgagePlanExtraPaymentPlan.summary.totalInterestPaid,
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
          <>
            <InfoCard
              subTitle={`By paying ${currencyFormat(stats.amount)} extra every ${
                stats.frequency
              }`}
              title={
                <>
                  Save upto <strong>{currencyFormat(stats.saveInterest)}</strong>
                </>
              }
              description={
                <>
                  Pay <strong>{currencyFormat(stats.amount)}</strong> more{" "}
                  <strong> once in a {stats.frequency} </strong>
                  and save upto{" "}
                  <strong>{currencyFormat(stats.saveInterest)}</strong> in
                  interest. Finish your mortgage{" "}
                  <strong>
                    {stats.earlyPayoff.years} years and {stats.earlyPayoff.months}{" "}
                    months earlier!
                  </strong>
                </>
              }
              warningMessage={
                stats.totalAmountPaidInYear > stats.maximumAllowedExtraPayment
                  ? "In this case maybe you have to pay some penalty, because you are paying more than 10% of your principle amount in a year"
                  : ""
              }
              buttonLabel="Explore this Option"
              onClick={() => setModalOpen(true)}
            />

            <Modal
              title={`Pay
                ${currencyFormat(stats.amount)} more
                ${stats.frequency} and save
                ${currencyFormat(stats.saveInterest)}
                in interest. Finish your mortgage
                ${stats?.earlyPayoff?.years} years and
                ${stats?.earlyPayoff?.months} months earlier!`}
              centered
              open={modalOpen}
              footer={[
                <Button
                  key={1}
                  type="primary"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </Button>,
              ]}
              onCancel={() => setModalOpen(false)}
              width={1000}
            >
              <br />
              {mortgagePlanExtraPayment && (
                <ExtraPaymentPackagesDetails
                  mortgageData={mortgageData}
                  paymentPlanRegular={mortgagePlan}
                  paymentPlanExtra={mortgagePlanExtraPayment}
                />
              )}
            </Modal>
          </>
        )}
      </>
    );
  }
