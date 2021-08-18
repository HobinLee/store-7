import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import Review from "./index";

describe("<Review />", () => {
  it("should render component in document", () => {
    window.alert = jest.fn();
    window.confirm = jest.fn();

    const { container } = render(<Review />);
    expect(container).toBeInTheDocument();

    // 후기쓰기 클릭 시 ReviewMdoal 열림
    fireEvent.click(screen.queryByText("후기쓰기"));
    expect(screen.queryByTestId("close-btn")).toBeInTheDocument();

    // close btn 클릭시 alert 때문에 바로 안 닫힘
    fireEvent.click(screen.queryByTestId("close-btn"));
    expect(screen.queryByTestId("close-btn")).toBeInTheDocument();
  });
});
