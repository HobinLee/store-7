import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Question from "./index";
import { QnAType } from "@/shared/type";
import { qnas } from "@/shared/dummy";

const QuestionProps: QnAType = qnas[0];

describe("<Question />", () => {
  it("should render component in document", () => {
    const { container } = render(<Question {...QuestionProps} />);

    expect(container).toBeInTheDocument();
  });
});
