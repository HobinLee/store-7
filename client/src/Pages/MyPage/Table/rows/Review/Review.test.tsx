import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Review from "./index";
import { ReviewType } from "@/shared/type";

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
  it("should render component in document", () => {
    const { container } = render(<Review {...ReviewProps} />);

    expect(container).toBeInTheDocument();
  });
});
