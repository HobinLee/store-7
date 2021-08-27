import { ItemBannerType } from "@/shared/type";
import { expectText, render } from "@/utils/test-util";
import Banner, { BannerProps } from "./index";

const banner1: ItemBannerType = {
  brief: "다시 돌아온 플리츠마마x배민 콜라보!",
  title: "플리츠마마X배달의민족. 텀블러백",
  src: "img",
  id: 1,
};

const bannerProps: BannerProps = {
  banners: [banner1],
};

describe("<ProductSection />", () => {
  // it("should render component in document", () => {
  //   const { container } = render(<Banner {...bannerProps} />);
  //   expect(container).toBeInTheDocument();
  //   expectText(banner1.brief);
  //   expectText(banner1.title);
  // });
});
