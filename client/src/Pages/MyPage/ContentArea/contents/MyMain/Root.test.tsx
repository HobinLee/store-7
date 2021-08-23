import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import MyMain from "./index";
import { expectText } from "@/utils/test-util";
import { recent, sampleMain } from "@/shared/dummy";

describe("<Root />", () => {
  let page;
  beforeEach(() => {
    const { container } = render(<MyMain />);
    page = container;
  });

  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });
  it("should render 3 section component in document", () => {
    expect(screen.queryAllByTestId("test__section").length).toBe(3);

    expectText("진행 중인 주문");
    expectText("최근 주문 정보");
    expectText("최근 본 상품");
  });

  it("should render table in document", () => {
    expect(screen.queryByTestId("test__table")).toBeInTheDocument();
  });

  it("should render recent view product in document", () => {
    expect(screen.queryByTestId("test__table")).toBeInTheDocument();
    expect(screen.queryAllByTestId("test__itme").length).toBe(
      sampleMain.length
    );
  });
});
