import { ReviewType } from "@/shared/type";
import { render } from "@/utils/test-util";
import { YYYY_MM_DD_HH_mm } from "@/utils/util";
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
    expect(screen.queryByText(YYYY_MM_DD_HH_mm(DATE))).toBeInTheDocument();
  });
});
