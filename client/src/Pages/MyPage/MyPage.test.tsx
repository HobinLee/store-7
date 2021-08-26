import "jest-styled-components";
import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/dom";

import MyPage from "./index";

describe("<MyPage />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<MyPage location="mypage/" />);
    page = container;
  });
  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });
  it("should render content header in MyPage", () => {
    expect(screen.queryByTestId("test__content-header")).toBeInTheDocument();
  });
  it("should render sidebar in MyPage", () => {
    expect(screen.queryByTestId("test__sidebar")).toBeInTheDocument();
  });
  it("should render content area in MyPage", () => {
    expect(screen.queryByTestId("test__content-area")).toBeInTheDocument();
  });

  it("should render target component when sidebar list is clicked ", () => {
    fireEvent.click(screen.queryByText("주문목록/배송조회"));
    expect(screen.queryByTestId("test__orderlist")).toBeInTheDocument();

    fireEvent.click(screen.queryByText("찜리스트"));
    expect(screen.queryByTestId("test__wishlist")).toBeInTheDocument();

    fireEvent.click(screen.queryByText("회원정보 변경"));
    expect(screen.queryByTestId("test__userinfo")).toBeInTheDocument();

    fireEvent.click(screen.queryByText("나의 상품문의"));
    expect(screen.queryByTestId("test__question-content")).toBeInTheDocument();

    fireEvent.click(screen.queryByText("나의 상품후기"));
    expect(screen.queryByTestId("test__review-content")).toBeInTheDocument();
  });
});
