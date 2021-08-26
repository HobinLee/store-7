import { useMyQuestions } from "@/api/my";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import QuestionModal, { TYPES } from "./index";

describe("<QuestionModal />", () => {
  it("should render component in document", () => {
    const { refetch } = useMyQuestions();
    const { container } = render(
      <QuestionModal
        handleModalOpen={() => {}}
        submitType="post"
        refetch={refetch}
      />
    );
    expect(container).toBeInTheDocument();
    TYPES.forEach((option) => {
      expect(screen.queryByText(option)).toBeInTheDocument();
    });
  });
});
