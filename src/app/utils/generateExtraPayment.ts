export interface ExtraPayment {
  amount: number;
  date: string; // Format: 'YYYY-MM'
}

export function generateExtraPayments(
  amount: number,
  startDate: string, // Format: 'YYYY-MM-DD'
  years: number,
  sequence: "MONTHLY" | "QUARTERLY" | "ANNUALLY"
): ExtraPayment[] {
  const payments: ExtraPayment[] = [];
  const start = new Date(startDate);
  const end = new Date(start);
  end.setFullYear(start.getFullYear() + years);

  const currentDate = new Date(start);

  // Define the increment based on the sequence
  let monthIncrement: number;
  switch (sequence) {
    case "MONTHLY":
      monthIncrement = 1;
      break;
    case "QUARTERLY":
      monthIncrement = 3;
      break;
    case "ANNUALLY":
      monthIncrement = 12;
      break;
    default:
      throw new Error(
        'Invalid sequence value. Must be "MONTHLY", "QUARTERLY", or "ANNUALLY".'
      );
  }

  // Generate extra payments
  while (currentDate <= end) {
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    payments.push({ amount, date: formattedDate });

    // Move to the next date based on the sequence
    currentDate.setMonth(currentDate.getMonth() + monthIncrement);
  }

  return payments;
}

// Example usage:
// Generate extra payments of 100 every month for 30 years starting from '2023-09-01'
// const monthlyPayments = generateExtraPayments(100, "2023-09-01", 30, "MONTHLY");
// console.log(monthlyPayments);

// // Generate extra payments of 200 every year for 25 years starting from '2023-09-01'
// const yearlyPayments = generateExtraPayments(200, "2023-09-01", 25, "ANNUALLY");
// console.log(yearlyPayments);
