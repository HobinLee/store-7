import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";

import Footer from "./index";

describe("<Footer />", () => {
  it("should render component in document", () => {
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();

    expect(screen.queryByRole("img")).toBeInTheDocument();
    expect(screen.queryByText("공지사항")).toBeInTheDocument();
    expect(screen.queryByText("1:1문의")).toBeInTheDocument();
    expect(screen.queryByText("이용약관")).toBeInTheDocument();
    expect(screen.queryByText("개인정보처리방침")).toBeInTheDocument();
    expect(screen.queryByText("판매처 안내")).toBeInTheDocument();
  });
});
