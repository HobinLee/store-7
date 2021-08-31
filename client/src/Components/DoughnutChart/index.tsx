import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import * as S from "./styles";

interface Props {
  title: string;
  data: any;
}

const DoughnutChart: FC<Props> = ({ title, data }) => (
  <S.Box>
    <S.Description>{title}</S.Description>
    <Doughnut data={data} />
  </S.Box>
);

export default DoughnutChart;
