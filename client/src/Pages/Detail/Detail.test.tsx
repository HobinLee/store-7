import { render, fireEvent } from "@/utils/test-util";
import DetailPage, { tabs } from "./index";
import { screen } from "@testing-library/react";

describe("<DetailPage />", () => {
  window.scrollTo = jest.fn();

  it("should render component in document", () => {
    const { container } = render(<DetailPage />);
    expect(container).toBeInTheDocument();

    expect(screen.queryByText("판매가격")).toBeInTheDocument();
    expect(screen.queryByText("배송정보")).toBeInTheDocument();

    // 탭 전환
    tabs.forEach((tab) => {
      fireEvent.click(screen.queryByText(tab.title));
      expect(screen.queryByTestId(tab.title)).toBeInTheDocument();
    });
  });
});
