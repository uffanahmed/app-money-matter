"use client";
import React from "react";
import { currencyFormat } from "@/app/utils/currencyFormat";
import { Col, Row } from "antd";
import { MortgagePlan } from "../../utils/mortgageCalculator";

export type MortgageSummaryProps = {
  mortgagePlan: MortgagePlan;
};

export default function MortgageSummary({
  mortgagePlan,
}: MortgageSummaryProps) {
  return (
    <>
      <div className="mortgage-summary">
        {/* <h4>
          {extraPayments?.length
            ? `Quick overview of your mortgage details with extra payment`
            : `Quick overview of your mortgage details`}
        </h4> */}
        <br />
        <Row>
          <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Mortgage scheme: <strong>{mortgagePlan.summary.type}</strong>
            </label>
          </Col>
          <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Start date:{" "}
              <strong>{new Date(mortgagePlan.summary.startDate).toDateString()}</strong>
            </label>
          </Col>
          <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Interest rate: <strong>{mortgagePlan.summary.interestRate}</strong>
            </label>
          </Col>
          <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Interest rate period:{" "}
              <strong>{`${mortgagePlan.summary.years} ${
                mortgagePlan.summary.years <= 1 ? "year" : "years"
              }`}</strong>
            </label>
          </Col>
        </Row>
        <Row>
        <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Mortgage amount:{" "}
              <strong>
                {currencyFormat(mortgagePlan?.summary?.mortgageAmount)}
              </strong>
            </label>
          </Col>
          <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Interest amount:{" "}
              <strong>
                {currencyFormat(mortgagePlan?.summary?.totalInterestPaid)}
              </strong>
            </label>
          </Col>
          <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Total extra payment:{" "}
              <strong>
                {currencyFormat(mortgagePlan?.summary?.totalExtraPayments)}
              </strong>
            </label>
          </Col>
          <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Total paid amount:{" "}
              <strong>
                {currencyFormat(mortgagePlan?.summary?.totalPaid)}
              </strong>
            </label>
          </Col>
        </Row>
        <Row>
        <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Last Installment Date:{" "}
              <strong>{mortgagePlan?.summary?.lastInstallmentDate}</strong>
            </label>
          </Col>
          <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <label>
              Earlier payoff:{" "}
              <strong>
                {!mortgagePlan?.earlyPayoff?.isSuccess ? "No" : "Yes"}
              </strong>
            </label>
          </Col>
          <Col className="input-cell" xs={24} sm={24} md={24} lg={24} xl={12}>
            <label>
              Earlier payoff duration:{" "}
              <strong>
                {mortgagePlan?.earlyPayoff?.isSuccess
                  ? `${mortgagePlan?.earlyPayoff.years} years and ${mortgagePlan?.earlyPayoff.months} months earlier!`
                  : "N/A"}
              </strong>
            </label>
          </Col>
        </Row>
      </div>
    </>
  );
}
