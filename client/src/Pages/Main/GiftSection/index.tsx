import styled from "styled-components";
import { SecretpenImg } from "@/assets";
import { TrayImg } from "@/assets";
import GiftList from "./GiftList";
import { ItemBannerType } from "@/shared/type";

const giftList: ItemBannerType[] = [
  {
    title: "을지로에서 만든 쟁반",
    id: 149,
    brief: "캬 ~ 좋다. 한 상 가득 을지로 쟁반",
    src: TrayImg,
  },
  {
    title: "쉿! 비밀펜",
    id: 43,
    brief: "진짜진짜 아무한테도 말하지마",
    src: SecretpenImg,
    isWhite: true,
  },
];

const GiftSection = () => (
  <SectionWrapper>
    <div className="title">선물하기 딱 좋은</div>
    <GiftList items={giftList}></GiftList>
  </SectionWrapper>
);

const SectionWrapper = styled.div``;

export default GiftSection;
