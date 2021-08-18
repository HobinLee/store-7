import { QnAType } from "@/shared/type";
import { render } from "@/utils/test-util";
import { YYYY_MM_DD_HH_mm } from "@/utils/util";
import { screen } from "@testing-library/react";
import QuestionBox from "./index";

const AUTHOR = "author";
const Q_TITLE = "questionTitle";
const Q_TYPE = "배송";
const Q_CONTENT = "question";
const Q_PRODUCT = {
  id: 1,
  name: "product",
};
const A_CONTENT = "answer";
const Q_DATE = new Date();
const A_DATE = new Date();

describe("<QuestionBox />", () => {
  it("답변 미완료", () => {
    const questionBoxProps: QnAType = {
      id: 1,
      authorName: AUTHOR,
      type: Q_TYPE,
      title: Q_TITLE,
      question: Q_CONTENT,
      createdAt: Q_DATE,
      product: Q_PRODUCT,
    };

    const { container } = render(<QuestionBox {...questionBoxProps} />);
    expect(container).toBeInTheDocument();

    expect(screen.queryByText("미답변")).toBeInTheDocument();
    expect(screen.queryByText(AUTHOR)).toBeInTheDocument();
    expect(screen.queryByText(Q_CONTENT)).toBeInTheDocument();
    expect(screen.queryByText(YYYY_MM_DD_HH_mm(Q_DATE))).toBeInTheDocument();
  });

  it("답변 완료", () => {
    const questionBoxProps: QnAType = {
      id: 1,
      authorName: AUTHOR,
      type: Q_TYPE,
      title: Q_TITLE,
      question: Q_CONTENT,
      createdAt: Q_DATE,
      product: Q_PRODUCT,
      answer: A_CONTENT,
      answerCreatedAt: A_DATE,
    };

    const { container } = render(<QuestionBox {...questionBoxProps} />);
    expect(container).toBeInTheDocument();

    expect(screen.queryByText("답변완료")).toBeInTheDocument();
    expect(screen.queryByText(AUTHOR)).toBeInTheDocument();
    expect(screen.queryByText(Q_CONTENT)).toBeInTheDocument();
    expect(screen.queryByText(A_CONTENT)).toBeInTheDocument();
    screen.queryAllByText(YYYY_MM_DD_HH_mm(Q_DATE)).forEach((date) => {
      expect(screen.queryByText(date.innerHTML)).toBeInTheDocument();
    });
  });
});
