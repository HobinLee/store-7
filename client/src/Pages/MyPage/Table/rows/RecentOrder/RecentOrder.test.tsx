import "jest-styled-components";
import { render } from "@/utils/test-util";
import { screen } from "@testing-library/react";
import RecentOrder, { RecentOrderProps } from "./index";
import { YYYYMMDD } from "@/utils/util";
import { expectText } from "@/utils/test-util";

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
  let page;
  beforeEach(() => {
    const { container } = render(<RecentOrder {...RecentOrderProps} />);
    page = container;
  });
  it("should render component in document", () => {
    expect(page).toBeInTheDocument();
  });

  it("should render text in document", () => {
    expectText(YYYYMMDD(RecentOrderProps.date));

    expectText(RecentOrderProps.name);
    expectText(RecentOrderProps.number);
  });
});
