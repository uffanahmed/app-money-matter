"use client";
import React from "react";

export type SpecialOfferCardProps = {
  type?: 'success' | 'info' | 'warning' | 'danger';
  title: string
  ribbonTitle: string;
  buttonLabel?: string;
  buttonAction?: () => void;
};

export default function SpecialOfferCard({type, title, ribbonTitle, buttonLabel, buttonAction}: SpecialOfferCardProps) {
  return (
    <>
      <div className={'special-offer-card color-' + (type || 'Success')}>
        <h4 className="ribbon">{ribbonTitle}</h4>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">{title}</h1>
            <ul>
              <li>Just pay only 100 euro extra every month</li>
              <li>Save upto 30,0000 euro on interest</li>
              <li>Finish your mortgage 5 years earlier</li>
            </ul>
            {/* <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p> */}
            <button className="button" onClick={buttonAction}>
              {buttonLabel || 'Explore this Offer'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
