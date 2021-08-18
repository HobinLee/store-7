interface EmptyRow {
  colSpan: number;
  message: string;
}

export const Empty = ({ colSpan, message }: EmptyRow) => {
  return (
    <tr>
      <td colSpan={colSpan}>{message}</td>
    </tr>
  );
};

export default Empty;
