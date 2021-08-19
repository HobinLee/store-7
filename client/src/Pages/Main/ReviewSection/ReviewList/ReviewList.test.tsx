import { expectText, render } from "@/utils/test-util";
import ReviewList, { ReviewListProps } from "./index";
import { reviews } from "@/shared/dummy";

const reviewListProps: ReviewListProps = {
  reviews: reviews.reviews,
};

describe("<ReviewList />", () => {
  it("should render component in document", () => {
    const { container } = render(<ReviewList {...reviewListProps} />);
    expect(container).toBeInTheDocument();

    reviewListProps.reviews.forEach((review) => {
      expectText(review.author);
      expectText(review.content);
    });
  });
});
