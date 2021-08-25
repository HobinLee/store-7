import { render } from "@/utils/test-util";
import ReviewModal from "./index";

describe("<ReviewModal />", () => {
  it("should render component in document", () => {
    const { container } = render(
      <ReviewModal handleModalOpen={() => {}} id={1} />
    );
    expect(container).toBeInTheDocument();
  });
});
