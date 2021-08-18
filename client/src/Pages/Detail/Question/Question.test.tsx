import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Question from "./index";

describe("<Question />", () => {
  it("should render component in document", () => {
    window.alert = jest.fn();
    window.confirm = jest.fn();

    const { container } = render(<Question />);
    expect(container).toBeInTheDocument();

    // 문의하기 클릭 시 QuestionMdoal 열림
    fireEvent.click(screen.queryByText("문의하기"));
    expect(screen.queryByTestId("close-btn")).toBeInTheDocument();

    // close btn 클릭시 alert 때문에 바로 안 닫힘
    fireEvent.click(screen.queryByTestId("close-btn"));
    expect(screen.queryByTestId("close-btn")).toBeInTheDocument();
  });
});
