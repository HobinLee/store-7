import { render, fireEvent } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import AddressModal from "./index";

describe("<AddressModal />", () => {
  it("should render component in document", () => {
    const { container } = render(
      <AddressModal closeModal={() => {}} setAddress={() => {}} />
    );
    expect(container).toBeInTheDocument();

    expect(screen.queryByText("배송지 선택")).toBeInTheDocument();

    // 배송지 추가 클릭
    fireEvent.click(screen.queryByText("배송지 추가"));
    expect(screen.queryByText("배송지 추가")).toBeInTheDocument();

    // 뒤로가기 클릭
    const backBtn = screen.queryByTestId("back-btn");
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(screen.queryByText("배송지 선택")).toBeInTheDocument();
  });
});
