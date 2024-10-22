"use client";

// Reference: https://bizcharts.taobao.com/product/BizCharts4/demo/612
import { useCallback, useEffect, useRef, useState } from "react";
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
  Annotation,
  Tooltip,
} from "bizcharts";
import { MortgageData } from "../InputForm";
import {
  MortgagePlan,
} from "../../utils/mortgageCalculator";
import { groupByYear } from "@/app/utils/groupByYear";
import { reduceDataSet } from "@/app/utils/reduceDataSet";

export type ChartRegularAndExtraPayComparisonProps = {
  mortgageData: MortgageData;
  paymentRegular: MortgagePlan;
  paymentExtra: MortgagePlan;
};

export default function ChartRegularAndExtraPayComparison({
  mortgageData,
  paymentRegular,
  paymentExtra,
}: ChartRegularAndExtraPayComparisonProps) {
  const [series, setSeries] = useState<any>();
  const [markList, setMarkList] = useState<any>([]);
  const chartRef = useRef();

  const ratioConvert = (num) => {
    if (num === null || typeof num === "undefined") return "--";
    const multi = 1000;
    const res = Math.floor(num * multi) / 10;
    return typeof res === "number" ? `${(res / 100000)}K` : "-";
  };

  const scale = {
    // rate: {
    //   nice: true,
    // },
    rate: {
      alias: "Outstanding Balance",
      min: 0,
      tickCount: 8,
      formatter: (data) => ratioConvert(data),
      // type: 'timeCat',
      type: "linear-strict",
    },
  };

  useEffect(() => {
    const paymentRegularArray = [];
    const interestRegularArray = [];
    const paymentExtraArray = [];
    const interestExtraArray = [];

    let sumInterestRegularPayment = 0;
    paymentRegular.installments.forEach((installment, index) => {
      sumInterestRegularPayment += +installment.interestPayment;
      paymentRegularArray.push({
        name: "Outstanding balance with regular payment",
        date: installment.dateString.split("-")[0],
        outstandingBalanceRegularPayment: +Math.round(installment.outstandingBalance) || 0,
      });
      interestRegularArray.push({
        name: "Interest with regular payment",
        date: installment.dateString.split("-")[0],
        interestRegularPayment: Math.round(sumInterestRegularPayment) || 0,
      });
    });

    let sumInterestExtraPayment = 0;
    paymentExtra.installments.forEach((installment, index) => {
      sumInterestExtraPayment += +installment.interestPayment;
      paymentExtraArray.push({
        name: "Outstanding balance with extra payment",
        date: installment.dateString.split("-")[0],
        outstandingBalanceExtraPayment: +Math.round(installment.outstandingBalance) || 0,
      });
      interestExtraArray.push({
        name: "Interest with extra payment",
        date: installment.dateString.split("-")[0],
        interestExtraPayment: Math.round(sumInterestExtraPayment) || 0,
      });
    });

    const regularPaymentArray = paymentRegularArray; // reduceDataSet(paymentRegularArray, 10);
    const regularInterestArray = interestRegularArray; // reduceDataSet(interestRegularArray, 10);
    const extraPaymentArray = paymentExtraArray; // reduceDataSet(paymentExtraArray, 10);
    const extraInterestArray = interestExtraArray; // reduceDataSet(interestExtraArray, 10);

    const sortedArray = [
      ...regularPaymentArray,
      ...regularInterestArray,
      ...extraPaymentArray,
      ...extraInterestArray,
    ].sort((a, b) => a.date - b.date);
    setSeries(sortedArray);
  }, []);

  const handleTooltipChange = useCallback((e) => {
    const chart: any = chartRef.current;
    const annotationControler = chart.getController("annotation");
    annotationControler.option
      .filter((item) => item.name == "desc")
      .forEach((item) => {
        if (item.position[0] == e.data.title) {
          console.log(annotationControler);
          item.visible = true;
        } else {
          item.visible = false;
        }
      });
    annotationControler.update();
  }, []);

  return (
    <>
      <Chart
        autoFit
        scale={scale}
        interactions={["element-active"]}
        data={series}
        padding={[60, 20, 70, 50]}
        height={350}
        onGetG2Instance={(chart) => {
          chartRef.current = chart;
          chart.on("tooltip:change", handleTooltipChange);
        }}
      >
        <Tooltip shared showCrosshairs />
        <Legend offsetX={15} position="top-left" />
        <Axis name="date" />
        {/* <Axis name="y" /> */}
        <Axis name="interestExtraPayment" />
        <Axis name="outstandingBalanceExtraPayment" />
        <Axis name="outstandingBalanceRegularPayment" />
        <Axis name="interestRegularPayment" />
        <LineAdvance
          shape="smooth"
          position="date*outstandingBalanceExtraPayment"
          color={["name", ["#44D7B6", "#44D7B6"]]}
        />
        <LineAdvance
          shape="smooth"
          area
          position="date*interestExtraPayment"
          color={["name", ["#8272EC", "#8272EC"]]}
        />
        <LineAdvance
          shape="smooth"
          area
          position="date*outstandingBalanceRegularPayment"
          color={["name", ["#80C1FE", "#80C1FE"]]}
        />
        <LineAdvance
          shape="smooth"
          area
          position="date*interestRegularPayment"
          color={["name", ["#0284FD", "#0284FD"]]}
        />
        {markList.map((item) => {
          return (
            <Annotation.Html
              html={`<div style='backGround:#0089ff;font-size:10px;line-height:18px;padding:2px 4px;border-radius:3px;color:#fff'>${item.label}</div>`}
              offsetX={-18}
              offsetY={10}
              position={[`${item.date}`, 0]}
              visible={false}
              name="desc"
            />
          );
        })}
        {markList.map((item) => {
          return (
            <Annotation.Html
              html={
                "<div style='width:6px;height:6px;background:#0089FF;border-radius:50%'></div>"
              }
              offsetX={-3}
              offsetY={-2}
              name="point"
              position={[`${item.date}`, 0]}
            />
          );
        })}
        <Slider />
      </Chart>
    </>
  );
}
