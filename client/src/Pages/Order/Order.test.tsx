import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import OrderPage from "./index";

describe("<OrderPage />", () => {
  it("should render component in document", () => {
    const { container } = render(<OrderPage />);
    expect(container).toBeInTheDocument();

    // 배송지 변경 클릭시 addressModal 열림
    fireEvent.click(screen.queryByText("변경"));
    expect(screen.queryByText("배송지 선택")).toBeInTheDocument();

    // 요청사항 select 클릭
    fireEvent.click(screen.queryByText("배송시 요청사항을 선택해주세요."));
    expect(
      screen.queryByText("부재시 문 앞에 놓아주세요.")
    ).toBeInTheDocument();
  });
});
