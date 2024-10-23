"use client";

import React, { useEffect, useState } from "react";
import "./index.scss";
import {
  Axis,
  Chart,
  Coordinate,
  DonutChart,
  Interval,
  Legend,
  Tooltip,
  View,
} from "bizcharts";
import { MortgageData } from "../InputForm";
import { MortgagePlan } from "../../utils/mortgageCalculator";

export type PieChartProps = {
  titleRegular: string;
  titleExtra: string;
  mortgageData: MortgageData;
  paymentRegular: MortgagePlan;
  paymentExtra: MortgagePlan;
};

export default function ChartPaymentRatioComparison({
  titleRegular,
  titleExtra,
  mortgageData,
  paymentRegular,
  paymentExtra,
}: PieChartProps) {
  const [regularPaymentData, setRegularPaymentData] = useState([]);
  const [extraPaymentData, setExtraPaymentData] = useState([]);

  useEffect(() => {
    console.log("PieChart", paymentRegular, paymentExtra);

    setRegularPaymentData([
      {
        type: "Interest paid to bank",
        value: +paymentRegular.summary.totalInterestPaid,
      },
      // { type: 'Extra Payment', value: +paymentRegular.summary.totalExtraPayments },
      {
        type: "Principle Amount",
        value: +paymentRegular.summary.mortgageAmount,
      },
    ]);

    setExtraPaymentData([
      {
        type: "Interest paid to bank",
        value: +paymentExtra.summary.totalInterestPaid,
      },
      { type: "Principle Amount", value: +paymentExtra.summary.mortgageAmount },
      {
        type: "Extra Payment",
        value: +paymentExtra.summary.totalExtraPayments,
      },
    ]);
  }, [paymentRegular, paymentExtra]);

  const colors = ["#8272EC", "#44D7B6", "#80C1FE"];

  return (
    <>
      <div className="group-chart">
        <div className="left">
          <h4>{titleRegular}</h4>
          <DonutChart
            // label={{
            //   visible: true,
            //   type: "inner",
            //   offset: 0,
            //   style: {
            //     fill: "#fff",
            //     fontSize: 10,
            //     textAlign: "center",
            //   },
            // }}
            data={regularPaymentData || []}
            // title={{
            //   visible: true,
            //   text: "Xyz",
            // }}
            // autoFit
            // description={{
            //   visible: true,
            //   text: "Abc",
            // }}
            height={350}
            radius={1}
            innerRadius={0.6}
            color={colors}
            padding="auto"
            angleField="value"
            colorField="type"
            pieStyle={{ stroke: "white", lineWidth: 5 }}
          />
        </div>
        <div className="rigth">
          <h4>{titleExtra}</h4>
          <DonutChart
            data={extraPaymentData || []}
            // title={{
            //   visible: true,
            //   text: "Xyz",
            // }}
            // autoFit
            // description={{
            //   visible: true,
            //   text: "Abc",
            // }}
            height={350}
            radius={1}
            innerRadius={0.6}
            color={colors}
            padding="auto"
            angleField="value"
            colorField="type"
            pieStyle={{ stroke: "white", lineWidth: 5 }}
          />
        </div>
      </div>
    </>
  );
}
