import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import QuestionModal, { OPTIONS } from "./index";

describe("<QuestionModal />", () => {
  it("should render component in document", () => {
    const { container } = render(<QuestionModal handleModalOpen={() => {}} />);
    expect(container).toBeInTheDocument();

    // OPTIONS.forEach((option) => {
    //   expect(screen.queryByText(option)).toBeInTheDocument();
    // });
  });
});
