"use client";
import React from "react";
import "./index.scss";
import { Button, Tooltip } from "antd";
import { WarningOutlined } from "@ant-design/icons";

export type InfoCardProps = {
  subTitle?: string;
  title?: JSX.Element;
  description?: JSX.Element;
  list?: string[];
  infoGroup?: Array<{ title: string; subTitle: string }>;
  buttonLabel?: string;
  warningMessage?: string;
  onClick?: () => void;
};

export default function InfoCard({
  subTitle,
  title,
  description,
  list,
  infoGroup,
  buttonLabel,
  warningMessage,
  onClick,
}: InfoCardProps) {
  return (
    <>
      <div className="info-card">
        {subTitle && <h3>{subTitle}</h3>}
        {title && <h1>{title}</h1>}
        {infoGroup && (
          <div className="info-group">
            {infoGroup.map((info, index) => (
              <div className="info-group-section">
                <div className="title">{info.title}</div>
                <div className="sub-title">{info.subTitle}</div>
              </div>
            ))}
          </div>
        )}
        {list && (
          <ul>
            {list.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        )}
        {description && <p>{description}</p>}
        <div className="footer">
          <Button type="dashed" onClick={onClick}>
            {buttonLabel || "Explore this Option"}
          </Button>

          {warningMessage && (
            <>
              <div className="spacer"></div>
              <Tooltip placement="top" title={warningMessage}>
                <Button type="link">
                  <WarningOutlined style={{ fontSize: "20px", color: "red" }} />
                </Button>
              </Tooltip>
            </>
          )}
        </div>
      </div>

      {/* "default", "primary", "dashed", "link", "text"]; */}

      {/* <div className="info-card">
        <h3>Just by paying 100 euro extra every month</h3>
        <h1>Save upto 30,000</h1>
        <div className="info-group">
          <div className="info-group-section">
            <div className="title">100</div>
            <div className="sub-title">Pay extra every month</div>
          </div>
          <div className="info-group-section">
            <div className="title">30,000</div>
            <div className="sub-title">Save upto</div>
          </div>
          <div className="info-group-section">
            <div className="title">5 years</div>
            <div className="sub-title">Finish your mortgage earlier</div>
          </div>
        </div>
        <ul>
          <li>Just pay only 100 euro extra every month</li>
          <li>Save upto 30,0000 euro on interest</li>
          <li>Finish your mortgage 5 years earlier</li>
        </ul>
        <p>You can save upto 30,000 interest if you will keep paying 100 euro every month in extra payment and also you can finish your mortgage earlier</p>
        <Button type="primary" onClick={() => {}}>
          {"Explore this Option"}
        </Button>
      </div> */}
    </>
  );
}
