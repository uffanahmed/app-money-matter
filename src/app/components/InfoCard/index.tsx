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
        <div className="header">
          {subTitle && <h3>{subTitle}</h3>}
          {title && <h1>{title}</h1>}
        </div>
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
    </>
  );
}
