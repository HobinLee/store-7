import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

import { light } from "@/styles/theme";

type Content = {
  value: number;
  count: number;
  totalCount: number;
};

export type ProgressProps = {
  content?: Content;
};

const Progress = ({
  content = { value: 0, count: 0, totalCount: 0 },
}: ProgressProps) => {
  const CustomLinearProgress = withStyles(() => ({
    root: {
      width: "20rem",
      height: "0.8rem",
      borderRadius: "1.5rem",
    },
    colorPrimary: {
      backgroundColor: light.color.line,
    },
    bar: {
      backgroundColor: light.color.primary1,
    },
  }))(LinearProgress);

  return (
    <Container>
      <span className="text">{content.value}점</span>
      <CustomLinearProgress
        role="progressbar"
        variant="determinate"
        value={
          content.totalCount !== 0
            ? (content.count / content.totalCount) * 100
            : 0 ?? 0
        }
      />
      <span className="text">{content.count}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  :not(:last-child) {
    margin-bottom: 1rem;
  }
  .text {
    ${({ theme }) => theme.font.medium}
    white-space: nowrap;
    width: 0.5rem;
    margin-bottom: -0.5rem;
    :first-child {
      margin-right: 2.5rem;
      color: ${({ theme }) => theme.color.grey1};
    }
    :last-child {
      margin-left: 1rem;
      color: ${({ theme }) => theme.color.primary1};
    }
  }
`;

export default Progress;
