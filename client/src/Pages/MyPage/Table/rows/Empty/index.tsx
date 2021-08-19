export interface EmptyProps {
  colSpan: number;
  message: string;
}

export const Empty = ({ colSpan, message }: EmptyProps) => {
  return (
    <tr>
      <td colSpan={colSpan}>{message}</td>
    </tr>
  );
};

export default Empty;
