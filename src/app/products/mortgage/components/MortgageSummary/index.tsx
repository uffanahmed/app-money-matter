"use client";
import React from "react";
import { currencyFormat } from "@/app/utils/currencyFormat";
import { Col, Row } from "antd";
import { MortgagePlan } from "../../utils/mortgageCalculator";
import "./index.scss";

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
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Mortgage scheme</div>
              <div className="data-display-value">
                {mortgagePlan.summary.type}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Start date</div>
              <div className="data-display-value">
                {new Date(mortgagePlan.summary.startDate).toDateString()}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Interest rate</div>
              <div className="data-display-value">
                {mortgagePlan.summary.interestRate}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Interest rate period</div>
              <div className="data-display-value">{`${
                mortgagePlan.summary.years
              } ${mortgagePlan.summary.years <= 1 ? "year" : "years"}`}</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Mortgage amount</div>
              <div className="data-display-value">
                {currencyFormat(mortgagePlan?.summary?.mortgageAmount)}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Interest amount</div>
              <div className="data-display-value">
                {currencyFormat(mortgagePlan?.summary?.totalInterestPaid)}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Total extra payment</div>
              <div className="data-display-value">
                {currencyFormat(mortgagePlan?.summary?.totalExtraPayments)}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Total paid amount</div>
              <div className="data-display-value">
                {currencyFormat(mortgagePlan?.summary?.totalPaid)}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Last Installment Date</div>
              <div className="data-display-value">
                {mortgagePlan?.summary?.lastInstallmentDate}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={6}>
            <div className="data-display">
              <div className="data-display-label">Earlier payoff</div>
              <div className="data-display-value">
                {!mortgagePlan?.earlyPayoff?.isSuccess ? "No" : "Yes"}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <div className="data-display">
              <div className="data-display-label">Earlier payoff duration</div>
              <div className="data-display-value">
                {mortgagePlan?.earlyPayoff?.isSuccess
                  ? `${mortgagePlan?.earlyPayoff.years} years and ${mortgagePlan?.earlyPayoff.months} months earlier!`
                  : "N/A"}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
