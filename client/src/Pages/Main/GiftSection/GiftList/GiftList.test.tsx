import { expectText, render } from "@/utils/test-util";
import GiftList, { GiftListProps } from "./index";

const giftList: GiftListProps = {
  items: [
    {
      title: "을지로에서 만든 쟁반",
      id: 4,
      brief: "캬 ~ 좋다. 한 상 가득 을지로 쟁반",
      src: "img",
    },
    {
      title: "쉿! 비밀펜",
      id: 5,
      brief: "진짜진짜 아무한테도 말하지마",
      src: "img",
      isWhite: true,
    },
  ],
};

describe("<ProductSection />", () => {
  it("should render component in document", () => {
    const { container } = render(<GiftList {...giftList} />);
    expect(container).toBeInTheDocument();

    giftList.items.forEach((item) => {
      expectText(item.title);
      expectText(item.brief);
    });
  });
});
