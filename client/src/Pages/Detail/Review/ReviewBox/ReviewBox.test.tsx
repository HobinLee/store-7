import { ReviewType } from "@/shared/type";
import { render } from "@/utils/test-util";
import { YYYY_M_D_H_m } from "@/utils/util";
import { screen } from "@testing-library/react";
import ReviewBox from "./index";

const AUTHOR = "author";
const CONTENT = "question";
const DATE = new Date();

const reviewBoxProps: ReviewType = {
  id: 1,
  rate: 3,
  content: CONTENT,
  authorName: AUTHOR,
  date: DATE,
};

describe("<ReviewBox />", () => {
  it("should render component in document", () => {
    const { container } = render(<ReviewBox {...reviewBoxProps} />);
    expect(container).toBeInTheDocument();

    expect(screen.queryByText(AUTHOR)).toBeInTheDocument();
    expect(screen.queryByText(CONTENT)).toBeInTheDocument();
    expect(screen.queryByText(YYYY_M_D_H_m(DATE))).toBeInTheDocument();
  });
});
