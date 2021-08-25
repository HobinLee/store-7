import { expectText, render } from "@/utils/test-util";
import ReviewList, { ReviewListProps } from "./index";

const reviewListProps: ReviewListProps = {
  reviews: [],
};

describe("<ReviewList />", () => {
  it("should render component in document", () => {
    const { container } = render(<ReviewList {...reviewListProps} />);
    expect(container).toBeInTheDocument();

    // reviewListProps.reviews.forEach((review) => {
    //   expectText(review.authorName);
    //   expectText(review.content);
    // });
  });
});
