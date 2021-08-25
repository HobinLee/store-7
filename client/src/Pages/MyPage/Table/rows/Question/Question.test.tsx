import "jest-styled-components";
import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Question from "./index";
import { YYYYMMDD } from "@/utils/util";
import { expectText } from "@/utils/test-util";
import { QuestionType } from "@/shared/type";

const QuestionProps: QuestionType = {
  id: 1,
  authorName: "author",
  type: "배송",
  question: "question",
  answer: "answer",
  isSecret: false,
  createdAt: new Date(),
  answeredAt: new Date(),
  product: {
    id: 2,
    name: "asdf",
  },
};

describe("<Question />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<Question {...QuestionProps} />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });

  it("should render text in document", () => {
    const isAnswered = !!QuestionProps.answer;

    expectText(QuestionProps.type);
    expectText(isAnswered ? "답변 완료" : "미답변");
    expectText(YYYYMMDD(QuestionProps.createdAt));
  });

  it("should open <ReviewBox /> component under row when  row is clicked ", () => {
    fireEvent.click(screen.queryByTestId("test__question-row"));
    expect(screen.queryByTestId("test__question-box")).toBeInTheDocument();
  });

  // it("should close <ReviewBox /> component under row when opened row is clicked ", () => {
  //   fireEvent.click(screen.queryByTestId("test__question"));
  //   fireEvent.click(screen.queryByTestId("test__question"));

  //   expect(screen.queryByTestId("test__question-box")).toBeInTheDocument();
  // });
});
