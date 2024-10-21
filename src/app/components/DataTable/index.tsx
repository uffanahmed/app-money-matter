"use client";

import { currencyFormat } from "@/app/utils/currencyFormat";
import "./index.scss";

type ColumnType = "currency" | "string";

export type DataTableProps = {
  config?: {
    height?: number;
  };
  columns: Array<{ label: string; type?: ColumnType; key: string }>;
  dataItems: Array<any>;
};

export default function DataTable({
  config,
  columns,
  dataItems,
}: DataTableProps) {
  return (
    <>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th style={{ width: `${100 / columns.length}%` }} key={index}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ height: config?.height || "auto" }}>
            {dataItems.map((item, index) => (
              <tr key={index}>
                {columns.map((column, i) => (
                  <td
                    key={`${index}-${i}`}
                    className={"type-" + (column.type || "string")}
                    style={{ width: `${100 / columns.length}%` }}
                  >
                    {column.type === "currency"
                      ? currencyFormat(item[column.key])
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
