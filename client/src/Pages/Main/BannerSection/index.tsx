import styled from "styled-components";
import { Banner1 } from "@/assets";
import Banner from "./Banner";
import { ItemBannerType } from "@/shared/type";

const banner1: ItemBannerType = {
  brief: "다시 돌아온 플리츠마마x배민 콜라보!",
  title: "플리츠마마X배달의민족. 텀블러백",
  src: Banner1,
  id: 1,
};

const list: ItemBannerType[] = [banner1];

const BannerSection = () => {
  return (
    <SectionWrapper>
      <Banner banners={list} />
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div``;

export default BannerSection;
