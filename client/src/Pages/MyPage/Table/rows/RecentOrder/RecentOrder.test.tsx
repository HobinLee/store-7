import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import RecentOrder, { RecentOrderProps } from "./index";

const RecentOrderProps: RecentOrderProps = {
  id: 1,
  date: new Date(),
  number: "1293812492",
  image: "https://store.baemin.com/data/editor/goods/0ad3730867ef81ba.jpg",
  name: "testName",
  price: 123456,
  status: "",
  count: 1,
  reviewID: 1,
};

describe("<RecentOrder />", () => {
  it("should render component in document", () => {
    const { container } = render(<RecentOrder {...RecentOrderProps} />);

    expect(container).toBeInTheDocument();
  });
});
