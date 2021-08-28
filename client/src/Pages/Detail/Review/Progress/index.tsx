import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

import { theme } from "@/styles/theme";

type Content = {
  value: number;
  count: number;
  totalCount: number;
};

export type ProgressProps = {
  content?: Content;
};

export const output = ({ value, count, totalCount }) => {
  return {
    valueOutput: `${value}점`,
    progressValueOutput: totalCount !== 0 ? (count / totalCount) * 100 : 0 ?? 0,
    countOutput: count,
  };
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
      backgroundColor: theme.color.line,
    },
    bar: {
      backgroundColor: theme.color.primary1,
    },
  }))(LinearProgress);

  const OUTPUT = output(content);

  return (
    <Container>
      <span className="text">{OUTPUT.valueOutput}</span>
      <CustomLinearProgress
        role="progressbar"
        variant="determinate"
        value={OUTPUT.progressValueOutput}
      />
      <span className="text">{OUTPUT.countOutput}</span>
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
