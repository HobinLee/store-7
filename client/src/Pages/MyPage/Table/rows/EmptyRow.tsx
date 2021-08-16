import React from "react";

interface EmptyRow {
  colSpan: number;
  message: string;
}

export const EmptyRow = ({ colSpan, message }: EmptyRow) => {
  return (
    <tr>
      <td colSpan={colSpan}>{message}</td>
    </tr>
  );
};
