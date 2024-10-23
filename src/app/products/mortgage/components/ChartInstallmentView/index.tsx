"use client";

// Reference: https://bizcharts.taobao.com/product/BizCharts4/demo/612
import { useEffect, useState } from "react";
import {
  Axis,
  Chart,
  Line,
  Point,
  Legend,
  View,
  Slider,
  Interval,
  LineAdvance,
} from "bizcharts";
import { MortgageData } from "../InputForm";
import {
  MortgageInstallmentPlan,
  MortgagePlan,
} from "../../utils/mortgageCalculator";
import { groupByYear } from "@/app/utils/groupByYear";
import { reduceDataSet } from "@/app/utils/reduceDataSet";
import { off } from "process";

export type ChartInstallmentViewProps = {
  mortgageData: MortgageData;
  paymentPlan: MortgagePlan;
};

export default function ChartInstallmentView({
  mortgageData,
  paymentPlan,
}: ChartInstallmentViewProps) {
  const [data, setData] = useState<any[]>([]);
  const [rateData, setRateData] = useState<any[]>([]);
  let chartIns;

  useEffect(() => {
    const groupByYearData = paymentPlan.installments; // reduceDataSet(paymentPlan.installments);
    const data = groupByYearData.reduce((array, installment) => {
      if (!array.find(i => i.date === installment.dateString.split("-")[0])) { // just to prevent the duplicate year entry
        array.push({
          date: installment.dateString.split("-")[0],
          value: +Math.round(installment.interestPayment) || 0,
          level: "Interest Payment",
          type: "Monthly Installment",
        });
        array.push({
          date: installment.dateString.split("-")[0],
          value: +Math.round(installment.principalRepayment) || 0,
          level: "Principal Repayment",
          type: "Monthly Installment",
        });

        rateData.push({
          date: installment.dateString.split("-")[0],
          rateType: "Outstanding Balance",
          rate: +Math.round(installment.outstandingBalance) || 0,
        })
      }
      return array
    }, []);

    setData(data as any);
  }, []);

  const ratioConvert = (num) => {
    if (num === null || typeof num === "undefined") return "--";
    const multi = 1000;
    const res = Math.floor(num * multi) / 10;
    return typeof res === "number" ? `${(res / 100000)}K` : "-";
  };

  const scale = {
    // date: {
    //   sync: true,
    // },
    type: {
      values: ["purchase_receive_amount", "sale_amount"],
    },
    value: {
      alias: "Monthly Installment (Principle + Interest)",
      min: 0,
      tickCount: 8,
      // type: 'timeCat',
      type: "linear-strict",
    },
    rate: {
      alias: "Outstanding Balance",
      min: 0,
      tickCount: 8,
      formatter: (data) => ratioConvert(data),
      // type: 'timeCat',
      type: "linear-strict",
    },
  };

  const colors = ["#80C1FE", "#44D7B6", "#0284FD", "#3895FF", "#8272EC"];

  return (
    <Chart
      padding={[10, 60, 140, 60]}
      scale={scale}
      autoFit
      height={450}
      data={data}
      // theme={{ maxColumnWidth: 40 }}
      onGetG2Instance={(chart) => {
        chartIns = chart;
        // hack 两次渲染才能使slider生效
        // chart.render();
      }}
    >
      <Interval
        // type="interval"
        position="date*value"
        label={[
          "value",
          {
            position: "middle",
            style: {
              fill: "#000",
            },
          },
        ]}
        color={["level", [colors[0], colors[1], colors[2]]]}
        style={{
          stroke: "#fff",
          lineWidth: 1,
        }}
        adjust={[
          {
            type: "dodge",
            dodgeBy: "type",
            marginRatio: 0,
          },
          {
            type: "stack",
          },
        ]}
      ></Interval>
      <Axis
        name="years"
        title
        position="bottom"
        label={{ rotate: 0, offsetX: 0, offsetY: 0 }}
      />
      <View data={rateData} padding={0}>
        <Legend name="rateType" />
        <Axis name="rate" title position="right" />
        <Line
          position="date*rate"
          color={["rateType", [colors[3], colors[4]]]}
          size={2}
          shape="smooth"
        />
        <Point
          position="date*rate"
          color={["rateType", [colors[3], colors[4]]]}
          size={5}
          shape="circle"
        />
      </View>
      <Axis
        title
        name="value"
        position="left"
        label={{
          rotate: 0,
        }}
      />
      <Slider />
    </Chart>
  );

  // const data = [
  //   {
  //     month: "Jan",
  //     city: "Tokyo",
  //     temperature: 7,
  //   },
  //   {
  //     month: "Jan",
  //     city: "London",
  //     temperature: 3.9,
  //   },
  //   {
  //     month: "Feb",
  //     city: "Tokyo",
  //     temperature: 13,
  //   },
  //   {
  //     month: "Feb",
  //     city: "London",
  //     temperature: 4.2,
  //   },
  //   {
  //     month: "Mar",
  //     city: "Tokyo",
  //     temperature: 16.5,
  //   },
  //   {
  //     month: "Mar",
  //     city: "London",
  //     temperature: 5.7,
  //   },
  //   {
  //     month: "Apr",
  //     city: "Tokyo",
  //     temperature: 14.5,
  //   },
  //   {
  //     month: "Apr",
  //     city: "London",
  //     temperature: 8.5,
  //   },
  //   {
  //     month: "May",
  //     city: "Tokyo",
  //     temperature: 10,
  //   },
  //   {
  //     month: "May",
  //     city: "London",
  //     temperature: 11.9,
  //   },
  //   {
  //     month: "Jun",
  //     city: "Tokyo",
  //     temperature: 7.5,
  //   },
  //   {
  //     month: "Jun",
  //     city: "London",
  //     temperature: 15.2,
  //   },
  //   {
  //     month: "Jul",
  //     city: "Tokyo",
  //     temperature: 9.2,
  //   },
  //   {
  //     month: "Jul",
  //     city: "London",
  //     temperature: 17,
  //   },
  //   {
  //     month: "Aug",
  //     city: "Tokyo",
  //     temperature: 14.5,
  //   },
  //   {
  //     month: "Aug",
  //     city: "London",
  //     temperature: 16.6,
  //   },
  //   {
  //     month: "Sep",
  //     city: "Tokyo",
  //     temperature: 9.3,
  //   },
  //   {
  //     month: "Sep",
  //     city: "London",
  //     temperature: 14.2,
  //   },
  //   {
  //     month: "Oct",
  //     city: "Tokyo",
  //     temperature: 8.3,
  //   },
  //   {
  //     month: "Oct",
  //     city: "London",
  //     temperature: 10.3,
  //   },
  //   {
  //     month: "Nov",
  //     city: "Tokyo",
  //     temperature: 8.9,
  //   },
  //   {
  //     month: "Nov",
  //     city: "London",
  //     temperature: 5.6,
  //   },
  //   {
  //     month: "Dec",
  //     city: "Tokyo",
  //     temperature: 5.6,
  //   },
  //   {
  //     month: "Dec",
  //     city: "London",
  //     temperature: 9.8,
  //   },
  // ];

  // return (
  //   <>
  //     <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={data}>
  //       <LineAdvance
  //         shape="smooth"
  //         point
  //         area
  //         position="month*temperature"
  //         color="city"
  //       />
  //     </Chart>
  //   </>
  // );
}
