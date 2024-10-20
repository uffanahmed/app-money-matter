"use client";

import { useNavigationContext } from "@/app/context/NavigationContext";
import React from "react";

export function Info() {
  const {
    activeProduct,
    activeProductOption,
  } = useNavigationContext();

  return (
    <>
        <h1>Mortgage: Unlock Your Mortgage Potential</h1>

        <p>A <strong>mortgage</strong> is a loan specifically designed for purchasing real estate, such as a home or investment property. When you take out a mortgage, the lender provides you with the funds to purchase the property, and in exchange, you agree to repay the loan over a set period, typically ranging from 15 to 30 years. The loan is repaid in monthly installments, which include both the <strong>principal</strong> (the amount you borrowed) and <strong>interest</strong> (the cost of borrowing the money).</p>

        <p>There are two common types of mortgages: <strong>annuity</strong> and <strong>linear</strong>. An annuity mortgage involves a fixed total monthly payment, which includes both principal and interest, though the proportion of interest decreases over time as more of the payment goes toward reducing the principal. A linear mortgage, on the other hand, involves a fixed principal repayment each month, with the interest gradually decreasing as the loan balance reduces, leading to lower monthly payments over time.</p>

        <p>Now, mortgages aren't just about paying the minimum every month. There are ways to <strong>optimize your mortgage</strong> to save money in the long run. One of the most effective strategies is making <strong>extra payments</strong> toward your mortgage principal. This can reduce the overall loan duration and significantly decrease the amount of interest you’ll pay over the life of the loan.</p>

        <h3>How Extra Payments Help</h3>

        <p>When you make extra payments toward your mortgage, these payments go directly toward reducing the <strong>outstanding principal</strong>. By reducing the principal, you effectively lower the amount of interest you owe in subsequent months. For example, if you pay an additional €100 per month, you’re paying off the loan faster and decreasing the interest charged in the following months.</p>

        <p>Extra payments have several benefits:</p>

        <ul>
            <li><strong>Shorten the Loan Term:</strong> By applying extra payments to the principal, you can pay off your mortgage several years ahead of schedule.</li>
            <li><strong>Save on Interest:</strong> The faster you reduce the principal, the less interest you’ll accrue over time. This can save you thousands of euros over the life of the loan.</li>
            <li><strong>Increased Equity:</strong> Making extra payments increases the equity you hold in your home, which can be beneficial if you plan to sell or refinance in the future.</li>
        </ul>

        <p>For example, if your mortgage has a 3% interest rate, and you make an extra €100 payment every month, you could pay off your loan several years early and save thousands in interest. By customizing your payment plan and experimenting with different extra payment options, you can visualize how these payments impact your overall loan schedule and interest savings.</p>

        <h3>Comparing Mortgage Benefits</h3>

        <p>Our software allows you to compare different scenarios:</p>

        <ul>
            <li><strong>With Regular Payments:</strong> See how long it will take to pay off your mortgage with just your scheduled payments and how much interest you will pay.</li>
            <li><strong>With Extra Payments:</strong> Understand how making an additional payment each month—whether it’s €100, €200, or more—affects your mortgage duration and total interest paid.</li>
        </ul>

        <p>This comparison tool empowers you to see the financial benefits of making small changes to your payment habits and shows exactly how much money you could save by making extra payments over time.</p>

        <h3>Designing Custom Payment Plans</h3>

        <p>In addition to pre-defined extra payment options, our software allows you to <strong>design your own custom payment plans</strong>. Whether you want to make a one-time lump sum payment or schedule regular extra payments every month or year, you can experiment with different payment scenarios and instantly see how they will impact your mortgage. This flexibility gives you complete control over how you manage your mortgage, helping you pay it off faster and more efficiently.</p>
    </>
  );
}
