import "jest-styled-components";
import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Review from "./index";
import { ReviewType } from "@/shared/type";
import { YYYYMMDD } from "@/utils/util";
import { expectText } from "@/utils/test-util";

const ReviewProps: ReviewType = {
  id: 1,
  rate: 3,
  content: "test-content",
  image:
    "https://store.baemin.com/data/board/upload/goodsreview/eea0b21ff31b55a0",
  author: "testAuthor",
  date: new Date(),
};

describe("<Review />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<Review {...ReviewProps} />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });

  it("should render text in document", () => {
    expectText(ReviewProps.content);
    expectText(YYYYMMDD(ReviewProps.date));
  });

  it("should render <ReviewBox /> component under row when  row is clicked ", () => {
    fireEvent.click(screen.queryByTestId("test__review-row"));
    expect(screen.queryByTestId("test__review-box")).toBeInTheDocument();
  });
});
