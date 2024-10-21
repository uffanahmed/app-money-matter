"use client";

import { useNavigationContext } from "@/app/context/NavigationContext";
import React, { useEffect, useState } from "react";
import { InputForm, MortgageData } from "./components/InputForm";
import { ExtraPaymentWarning } from "./components/ExtraPaymentWarning";
import { RevisedInterestRateTip } from "./components/RevisedInterestRateTip";
import SpecialOfferCard from "@/app/components/SpecialOfferCard";
import { Col, Row } from "antd";
import { mortgageCalculator, MortgagePlan } from "./utils/mortgageCalculator";
import DataTable from "@/app/components/DataTable";
import MortgageSummary from "./components/MortgageSummary";
import InfoCard from "@/app/components/InfoCard";
import ExtraPaymentPackages from "./components/ExtraPaymentPackages";

export function ExtraPaymentOptions() {
  const [mortgageData, setMortgageData] = useState<MortgageData>();
  const [mortgagePlan, setMortgagePlan] = useState<MortgagePlan>();

  const onSubmit = (data: MortgageData | null) => {
    if (data) {
      const { amount, interest, date, years, scheme } = data;
      setMortgageData(data);
      setMortgagePlan(
        mortgageCalculator(
          amount,
          interest,
          years,
          date,
          scheme,
          [],
          0.0,
          false
        )
      );
    } else {
      setMortgagePlan(undefined);
      setMortgageData(undefined);
    }
  };

  useEffect(() => {
    console.log("Mortgage Plan", mortgagePlan);
    console.log("Mortgage Data", mortgageData);
  });

  return (
    <>
      <InputForm onSubmit={onSubmit} buttonLabel={"Show my possibilities"} />

      <br />

      {mortgagePlan && mortgageData && (
        <div>
          <MortgageSummary mortgagePlan={mortgagePlan} />

          <br />
          <h4>This is your current payment plan</h4>
          <DataTable
            config={{ height: 300 }}
            dataItems={mortgagePlan.installments}
            columns={[
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
              {
                label: "Outstanding Balance",
                type: "currency",
                key: "outstandingBalance",
              },
            ]}
          />

          <br />
          <ExtraPaymentPackages
            mortgageData={mortgageData}
            mortgagePlan={mortgagePlan}
          />
        </div>
      )}

      {/* <InfoCard
        subTitle="Just by paying 100 euro extra every month"
        title="Save upto 30,000"
        // infoGroup={[
        //   {
        //     title: "100",
        //     subTitle: "Pay extra every month",
        //   },
        //   {
        //     title: "30,000",
        //     subTitle: "Save upto",
        //   },
        //   {
        //     title: "5 years",
        //     subTitle: "Finish your mortgage earlier",
        //   },
        // ]}
        list={[
          "Just pay only 100 euro extra every month",
          "Save upto 30,0000 euro on interest",
          "Finish your mortgage 5 years earlier",
        ]}
        description="You can save upto 30,000 interest if you will keep paying 100 euro every month in extra payment and also you can finish your mortgage earlier"
        buttonLabel="Explore this Option"
        onClick={() => {
          console.log("clicked");
        }}
      /> */}

      {/* <ExtraPaymentWarning data={data} />
      <br />
      <RevisedInterestRateTip data={data} /> */}

      {/* <Row>
        <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12}>
          <SpecialOfferCard
            title="Save up 30,000 euro and payoff your mortgage 5 year earlier"
            ribbonTitle="Consider"
            type="danger"
            buttonAction={() => {
              console.log("clicked");
            }}
          />
        </Col>
        <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12}>
          <SpecialOfferCard
            title="Save up 30,000 euro and payoff your mortgage 5 year earlier"
            ribbonTitle="Best choice"
            type="warning"
            buttonAction={() => {
              console.log("clicked");
            }}
          />
        </Col>
        <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12}>
          <SpecialOfferCard
            title="Save up 30,000 euro and payoff your mortgage 5 year earlier"
            ribbonTitle="Ideal option"
            type="info"
            buttonAction={() => {
              console.log("clicked");
            }}
          />
        </Col>
        <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12}>
          <SpecialOfferCard
            title="Save up 30,000 euro and payoff your mortgage 5 year earlier"
            ribbonTitle="Recommendation"
            type="success"
            buttonAction={() => {
              console.log("clicked");
            }}
          />
        </Col>
      </Row> */}
    </>
  );
}
