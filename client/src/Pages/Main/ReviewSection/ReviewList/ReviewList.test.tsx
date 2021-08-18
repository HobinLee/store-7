import { render } from "@/utils/test-util";
import ReviewList from "./index";
import { reviews } from "@/shared/dummy";

const ReviewListProps = {
  reviews: reviews.reviews,
};

describe("<ReviewList />", () => {
  it("should render component in document", () => {
    const { container } = render(<ReviewList {...ReviewListProps} />);
    expect(container).toBeInTheDocument();
  });
});
