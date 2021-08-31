import { FC } from "react";
import { Bar } from "react-chartjs-2";
import * as S from "./styles";

interface Props {
  title: string;
  data: any;
}

const BarChart: FC<Props> = ({ title, data }) => (
  <S.Box>
    <S.Description>{title}</S.Description>
    <Bar data={data} />
  </S.Box>
);

export default BarChart;
