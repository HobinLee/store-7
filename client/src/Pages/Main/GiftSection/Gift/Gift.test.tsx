import { render } from "@/utils/test-util";
import Gift, { GiftItemProps } from "./index";

const giftProps: GiftItemProps = {
  item: {
    title: "을지로에서 만든 쟁반",
    id: 4,
    brief: "캬 ~ 좋다. 한 상 가득 을지로 쟁반",
    src: "img",
  },
};

describe("<ProductSection />", () => {
  it("should render component in document", () => {
    const { container } = render(<Gift {...giftProps} />);
    expect(container).toBeInTheDocument();
  });
});
