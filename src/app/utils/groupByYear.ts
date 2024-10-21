type DataEntry = {
  month: string; // Date in 'YYYY-MM' format
  [key: string]: any; // Other dynamic fields with any type
};

type GroupedEntry = {
  year: string;
  [key: string]: any;
};

export function groupByYear(dataArray: DataEntry[]): GroupedEntry[] {
  const groupedData: { [year: string]: GroupedEntry } = {};

  if (!dataArray.length) return [];

  dataArray.forEach((entry) => {
    const year = entry.month.split(" ")[1]; // Extract the year from 'MMM YYYY'

    // If the year is not in groupedData, initialize it
    if (!groupedData[year]) {
      groupedData[year] = { year };
    }

    // Iterate over the fields in the entry (excluding 'date')
    for (const [key, value] of Object.entries(entry)) {
      if (key === "month") continue; // Skip the date field

      if (typeof value === "number") {
        // Sum numeric fields
        groupedData[year][key] = (groupedData[year][key] || 0) + value;
      } else if (typeof value === "string") {
        // Concatenate string fields, separated by a comma
        groupedData[year][key] = groupedData[year][key]
          ? groupedData[year][key] + ", " + value
          : value;
      } else if (Array.isArray(value)) {
        // Merge arrays of objects into one array
        groupedData[year][key] = groupedData[year][key]
          ? groupedData[year][key].concat(value)
          : [...value]; // Spread to copy the array
      } else if (value instanceof Date) {
        // Combine Date objects into an array
        groupedData[year][key] = groupedData[year][key]
          ? [...groupedData[year][key], value]
          : [value];
      } else {
        // For all other types, combine them into an array
        groupedData[year][key] = groupedData[year][key]
          ? [...groupedData[year][key], value]
          : [value];
      }
    }
  });

  // Convert the groupedData object back to an array
  return Object.values(groupedData);
}

export function groupByYearWithMinMax(
  dataArray: DataEntry[],
  groupBy: "MIN" | "MAX"
): GroupedEntry[] {
  const groupedData: { [year: string]: GroupedEntry } = {};

  dataArray.forEach((entry) => {
    const year = entry.month.split(" ")[1]; // Extract the year from 'MMM YYYY'

    // If the year is not in groupedData, initialize it
    if (!groupedData[year]) {
      groupedData[year] = { year };
    }

    // Iterate over the fields in the entry (excluding 'month')
    for (const [key, value] of Object.entries(entry)) {
      if (key === "month") continue; // Skip the month field

      if (typeof value === "number") {
        if (groupBy === "MAX") {
          // For MAX: keep the maximum value for numeric fields
          groupedData[year][key] = Math.max(
            groupedData[year][key] || value,
            value
          );
        } else if (groupBy === "MIN") {
          // For MIN: keep the minimum value for numeric fields
          groupedData[year][key] = Math.min(
            groupedData[year][key] !== undefined
              ? groupedData[year][key]
              : value,
            value
          );
        }
      }
    }
  });

  // Convert the groupedData object back to an array
  return Object.values(groupedData);
}
