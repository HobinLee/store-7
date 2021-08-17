import { QuestionType } from "@/shared/type";
import { render } from "@/utils/test-util";
import { YYYY_MM_DD_HH_mm } from "@/utils/util";
import { screen } from "@testing-library/react";
import QuestionBox from "./index";

const AUTHOR = "author";
const Q_CONTENT = "question";
const A_CONTENT = "answer";
const DATE = new Date();

describe("<QuestionBox />", () => {
  it("답변 미완료", () => {
    const questionBoxProps: QuestionType = {
      id: 1,
      question: {
        author: AUTHOR,
        content: Q_CONTENT,
        date: DATE,
      },
    };

    const { container } = render(<QuestionBox {...questionBoxProps} />);
    expect(container).toBeInTheDocument();

    expect(screen.queryByText("미답변")).toBeInTheDocument();
    expect(screen.queryByText(AUTHOR)).toBeInTheDocument();
    expect(screen.queryByText(Q_CONTENT)).toBeInTheDocument();
    expect(screen.queryByText(YYYY_MM_DD_HH_mm(DATE))).toBeInTheDocument();
  });

  it("답변 완료", () => {
    const questionBoxProps: QuestionType = {
      id: 1,
      question: {
        author: AUTHOR,
        content: Q_CONTENT,
        date: DATE,
      },
      answer: {
        content: A_CONTENT,
        date: new Date(),
      },
    };

    const { container } = render(<QuestionBox {...questionBoxProps} />);
    expect(container).toBeInTheDocument();

    expect(screen.queryByText("답변완료")).toBeInTheDocument();
    expect(screen.queryByText(AUTHOR)).toBeInTheDocument();
    expect(screen.queryByText(Q_CONTENT)).toBeInTheDocument();
    expect(screen.queryByText(A_CONTENT)).toBeInTheDocument();
    screen.queryAllByText(YYYY_MM_DD_HH_mm(DATE)).forEach((date) => {
      expect(screen.queryByText(date.innerHTML)).toBeInTheDocument();
    });
  });
});
