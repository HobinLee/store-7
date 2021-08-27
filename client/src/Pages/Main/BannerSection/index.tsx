import styled from "styled-components";
import { Banner1, Banner2, Banner3 } from "@/assets";
import Banner from "./Banner";
import { ItemBannerType } from "@/shared/type";
import Carousel from "@/Components/Carousel";

const banners: ItemBannerType[] = [
  {
    brief: "다시 돌아온 플리츠마마x배민 콜라보!",
    title: "플리츠마마X배달의민족. 텀블러백",
    src: Banner1,
    id: 7,
  },
  {
    brief: "그리고 지금이 바로 그 때야.",
    title: "때 수건. 다 때가 있다.",
    src: Banner2,
    id: 150,
  },
  {
    brief: "여기는 영원히 아날로그야.",
    title: "을지로 목장갑. 위잉 뚝딱",
    src: Banner3,
    id: 156,
  },
];

const BannerSection = () => {
  return (
    <Carousel>
      {banners.map((banner) => (
        <Banner banner={banner} />
      ))}
    </Carousel>
  );
};
const Wrapper = styled.div`
  display: flex;
`;

export default BannerSection;
