"use client";

import React, { useState } from "react";
import { Button, Col, DatePicker, Dropdown, InputNumber, MenuProps, Row, Space } from 'antd';
import {
  DownOutlined,
  EuroOutlined,
  DollarOutlined,
  PoundOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

export type MortgageData = {
  currency: string;
  amount: number;
  interest: number;
  date: string;
  years: number;
  scheme: string;
  isExtraPayment?: boolean;
  // extraPayment?: MortgageExtraPayment[],
}

export function InputForm({
  onSubmit,
}: {
  onSubmit?: (data: MortgageData | null) => void;
}) {
  const [blockForm, setBlockForm] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState<MortgageData>({
    currency: "EUR",
    amount: 350000,
    interest: 5,
    date: new Date().toISOString().split("T")[0],
    years: 30,
    scheme: "LINEAR",
    isExtraPayment: false,
    // extraPayment: [],
  });

  const submit = () => {
    if (
      !formData.currency ||
      !formData.amount ||
      !formData.interest ||
      !formData.date ||
      !formData.years ||
      !formData.scheme
    ) {
      setError(true);
      onSubmit?.(null);
      return;
    }
    setError(false);
    onSubmit?.(formData);
    setBlockForm(true);
  };

  const reset = () => {
    setError(false);
    onSubmit?.(null);
    setBlockForm(false);
  };

  // const enableExtraPaymentPlan = (flag: boolean) => {
  //   const updatedFormData = { ...formData, isExtraPayment: flag };
  //   if (!flag) {
  //     updatedFormData.extraPayment = [];
  //   }
  //   setFormData(updatedFormData);
  // }

  // const updateExtraPaymentPlan = (data: MortgageExtraPayment[] | undefined) => {
  //   setFormData({ ...formData, extraPayment: data });
  // };

  const currency: MenuProps["items"] = [
    { label: "Euro", key: "EUR", icon: <EuroOutlined /> },
    { label: "Dollar", key: "USD", icon: <DollarOutlined /> },
    { label: "Pound", key: "GBP", icon: <PoundOutlined /> },
  ];

  const years: MenuProps["items"] = [
    { label: "1 Year", key: "1" },
    { label: "2 Years", key: "2" },
    { label: "3 Years", key: "3" },
    { label: "4 Years", key: "4" },
    { label: "5 Years", key: "5" },
    { label: "6 Years", key: "6" },
    { label: "7 Years", key: "7" },
    { label: "8 Years", key: "8" },
    { label: "9 Years", key: "9" },
    { label: "10 Years", key: "10" },
    { label: "11 Years", key: "11" },
    { label: "12 Years", key: "12" },
    { label: "13 Years", key: "13" },
    { label: "14 Years", key: "14" },
    { label: "15 Years", key: "15" },
    { label: "16 Years", key: "16" },
    { label: "17 Years", key: "17" },
    { label: "18 Years", key: "18" },
    { label: "19 Years", key: "19" },
    { label: "20 Years", key: "20" },
    { label: "21 Years", key: "21" },
    { label: "22 Years", key: "22" },
    { label: "23 Years", key: "23" },
    { label: "24 Years", key: "24" },
    { label: "25 Years", key: "25" },
    { label: "26 Years", key: "26" },
    { label: "27 Years", key: "27" },
    { label: "28 Years", key: "28" },
    { label: "29 Years", key: "29" },
    { label: "30 Years", key: "30" },
  ];

  const scheme: MenuProps["items"] = [
    { label: "Linear", key: "LINEAR" },
    { label: "Annuity", key: "ANNUITY" },
  ];

  return (
    <>
      <div className="mortgage-form">
        {blockForm && (
          <div className="block-form">
            <Button type="primary" onClick={reset}>
              Recalculate
            </Button>
          </div>
        )}

        {/* {JSON.stringify(formData)} */}
        <Row>
          <Col className="input-cell" xs={24} sm={12} md={8} xl={6}>
            <label>Currency</label>
            <Dropdown
              menu={{
                items: currency,
                onClick: (e) => setFormData({ ...formData, currency: e.key }),
              }}
            >
              <Button style={{ width: "100%" }}>
                <Space>
                  {formData.currency === "EUR"
                    ? "Euro"
                    : formData.currency === "USD"
                    ? "Dollar"
                    : formData.currency === "GBP"
                    ? "Pound"
                    : "Select currency"}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
          <Col className="input-cell" xs={24} sm={12} md={8} xl={6}>
            <label>Mortgage Amount</label>
            <InputNumber<number>
              prefix={formData.currency === "EUR"
                ? "€"
                : formData.currency === "USD"
                ? "$"
                : formData.currency === "GBP"
                ? "£"
                : "-"}
              style={{ width: "100%" }}
              defaultValue={formData.amount}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
              onChange={(e) => setFormData({ ...formData, amount: +(e || 0) })}
            />
          </Col>
          <Col className="input-cell" xs={24} sm={12} md={8} xl={6}>
            <label>Interest Percentage</label>
            <InputNumber<number>
              style={{ width: "100%" }}
              defaultValue={formData.interest}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value?.replace("%", "") as unknown as number}
              onChange={(e) => setFormData({ ...formData, interest: +(e || 0) })}
            />
          </Col>
          <Col className="input-cell" xs={24} sm={12} md={8} xl={6}>
            <label>Interest rate period</label>
            <Dropdown
              menu={{
                items: years,
                onClick: (e) =>
                  setFormData({ ...formData, years: parseInt(e.key) }),
              }}
            >
              <Button style={{ width: "100%" }}>
                <Space>
                  {formData.years
                    ? `${
                        formData.years <= 1
                          ? `${formData.years} year`
                          : `${formData.years} years`
                      }`
                    : `Select years`}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
          <Col className="input-cell" xs={24} sm={12} md={8} xl={6}>
            <label>Mortgage Scheme</label>
            <Dropdown
              menu={{
                items: scheme,
                onClick: (e) => setFormData({ ...formData, scheme: e.key }),
              }}
            >
              <Button style={{ width: "100%" }}>
                <Space>
                  {formData.scheme
                    ? formData.scheme === "LINEAR"
                      ? "Linear"
                      : "Annuity"
                    : `Select Scheme`}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
          <Col className="input-cell" xs={24} sm={12} md={8} xl={6}>
            <label>Start Date</label>
            <DatePicker
              style={{ width: "100%" }}
              defaultValue={dayjs(formData.date, "YYYY-MM-DD")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e?.toISOString().split("T")[0],
                })
              }
            />
          </Col>
          {/* <Col className="input-cell" xs={24} sm={12} md={8} xl={6}>
            <label>I have different payment plan</label>
            <Switch
              style={{ marginTop: 4 }}
              onChange={(flag: boolean) => enableExtraPaymentPlan(flag)}
            />
          </Col> */}
        </Row>

        {/* {formData.isExtraPayment && (
          <div className="extra-payment-plan">
            <MortgageExtraPaymentPlan
              mortgageData={formData}
              onUpdate={updateExtraPaymentPlan}
            />
          </div>
        )} */}

        <div className="form-footer">
          <div className="submit-button">
            {error && (
              <span className="error-message">All fields are required.</span>
            )}
            <Button type="primary" onClick={submit}>
              Calculate
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
