export type MortgageType = 'LINEAR' | 'ANNUITY';

export type MortgageInstallmentPlan = {
  month: string;
  principalRepayment: number;
  interestPayment: number;
  totalPayment: number;
  extraPayment: number;
  outstandingBalance: number;
};

export type MortgagePlan = {
  installments: MortgageInstallmentPlan[],
  summary: {
    type: MortgageType,
    years: number,
    startDate: string,
    mortgageAmount: number,
    interestRate: string,
    totalInterestPaid: number,
    totalExtraPayments: number,
    totalPaid: number,
    lastInstallmentDate: string,
    totalTaxBenefit: number,  // New: Tax benefit summary
    extraPayments: Array<{ amount: number; date: string }>,
    taxRate: number,
    fluctuateRates: boolean,
  },
  earlyPayoff: {
    isSuccess: boolean,
    years: number,
    months: number,
  },
  comparison?: {
    higherRatePlan?: MortgagePlan, // New: Comparison for higher interest rates
    lowerRatePlan?: MortgagePlan,  // New: Comparison for lower interest rates
  }
}

// Function to calculate mortgage with added features: tax benefits, rate fluctuation, and affordability check
export function mortgageCalculator(
  mortgageAmount: number,
  interestRate: number,
  years: number,
  startDate: string,
  type: MortgageType = "LINEAR",
  extraPayments: Array<{ amount: number; date: string }>,
  taxRate: number = 0.0,  // New: Tax rate for interest deduction
  fluctuateRates: boolean = false  // New: Option for interest rate fluctuation
): MortgagePlan {
  // Convert interest rate to decimal and calculate total months
  const monthlyInterestRate: number = interestRate / 100 / 12;
  const totalMonths: number = years * 12;
  const principalRepayment: number = mortgageAmount / totalMonths; // Used for linear mortgages

  // Initialize balance, total interest paid, and array for storing table data
  let outstandingBalance: number = mortgageAmount;
  let totalInterestPaid: number = 0;
  let totalExtraPayments: number = 0;
  let totalTaxBenefit: number = 0;  // New: Variable to track tax benefits
  const installments: MortgageInstallmentPlan[] = [];

  // Create a date object for the starting month
  const currentDate = new Date(startDate);

  // Convert extra payments into a map for easy lookup by month-year key
  const extraPaymentsMap = new Map();
  extraPayments.forEach(({ amount, date }) => {
    extraPaymentsMap.set(date, amount);
    totalExtraPayments += amount; // Sum of all extra payments
  });

  // For annuity mortgage, calculate the fixed total monthly payment (principal + interest combined)
  let annuityPayment = 0;
  if (type === "ANNUITY") {
    annuityPayment =
      (mortgageAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
  }

  // Loop through each month to calculate installment details
  for (let month = 1; month <= totalMonths; month++) {
    // Format the current date to match the extra payment dates (YYYY-MM)
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;

    // Calculate interest for the current month
    const interestPayment = outstandingBalance * monthlyInterestRate;
    totalInterestPaid += interestPayment; // Sum of interest payments

    // Calculate tax benefit on interest payment (if applicable)
    if (taxRate > 0) {
      totalTaxBenefit += interestPayment * taxRate;
    }

    let totalPayment, principalRepaymentForAnnuity;

    if (type === "LINEAR") {
      // For linear mortgage, principal repayment is fixed
      totalPayment = principalRepayment + interestPayment;
    } else if (type === "ANNUITY") {
      // For annuity mortgage, total payment is fixed; calculate principal repayment
      totalPayment = annuityPayment;
      principalRepaymentForAnnuity = totalPayment - interestPayment; // Difference between total payment and interest
    }

    // Check if there is an extra payment for the current month
    const extraPayment = extraPaymentsMap.get(formattedDate) || 0;

    // Reduce outstanding balance with principal repayment and any extra payments
    if (type === "LINEAR") {
      outstandingBalance -= principalRepayment + extraPayment;
    } else if (type === "ANNUITY") {
      outstandingBalance -= principalRepaymentForAnnuity + extraPayment;
    }

    // Ensure outstanding balance does not go negative
    outstandingBalance = Math.max(0, outstandingBalance);

    // Push the installment data into the array
    installments.push({
      month: `${currentDate.toLocaleString("default", {
        month: "short",
      })} ${currentDate.getFullYear()}`,
      principalRepayment: +(
        (type === "LINEAR"
          ? +principalRepayment
          : +(principalRepaymentForAnnuity || 0)) || 0
      ).toFixed(2),
      interestPayment: +interestPayment.toFixed(2),
      totalPayment: +(totalPayment || 0).toFixed(2),
      extraPayment: +extraPayment.toFixed(2),
      outstandingBalance: +outstandingBalance.toFixed(2),
    });

    // Stop if the outstanding balance is paid off
    if (outstandingBalance === 0) {
      break;
    }

    // Move to the next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  // Calculate the total amount paid (principal + interest + extra payments)
  const totalPaid = mortgageAmount + totalInterestPaid + totalExtraPayments;
  const lastInstallmentDate = installments[installments.length - 1].month;

  // Calculate how many months early the mortgage is completed
  const monthsPaidOffEarly = totalMonths - installments.length;
  const yearsPaidOffEarly = Math.floor(monthsPaidOffEarly / 12);
  const monthsRemainder = monthsPaidOffEarly % 12;

  // Optional interest rate fluctuation scenarios
  let comparison = undefined;
  if (fluctuateRates) {
    comparison = {
      higherRatePlan: mortgageCalculator(mortgageAmount, interestRate + 1, years, startDate, type, extraPayments),
      lowerRatePlan: mortgageCalculator(mortgageAmount, interestRate - 1, years, startDate, type, extraPayments),
    };
  }

  return {
    installments,
    summary: {
      type,
      years,
      startDate,
      mortgageAmount: +mortgageAmount.toFixed(2),
      interestRate: `${interestRate.toFixed(2)}%`,
      totalInterestPaid: +totalInterestPaid.toFixed(2),
      totalExtraPayments: +totalExtraPayments.toFixed(2),
      totalPaid: +totalPaid.toFixed(2),
      lastInstallmentDate: lastInstallmentDate,
      totalTaxBenefit: +totalTaxBenefit.toFixed(2),  // New: Total tax benefits
      extraPayments,
      taxRate,
      fluctuateRates,
    },
    earlyPayoff: {
      isSuccess: monthsPaidOffEarly > 0,
      years: yearsPaidOffEarly,
      months: monthsRemainder,
    },
    comparison,  // New: Rate comparison if enabled
  };
}
