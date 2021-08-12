import React from "react";
import styled from "styled-components";
import BannerImg from "@/assets/banner1.gif";
import Banner from "./Banner";
import { ItemBannerType } from "@/shared/type";

const banner1: ItemBannerType = {
  brief: "다시 돌아온 플리츠마마x배민 콜라보!",
  title: "플리츠마마X배달의민족. 텀블러백",
  src: BannerImg,
  id: 1,
};

const list: ItemBannerType[] = [banner1];

const BannerSection = () => {
  return (
    <SectionWrapper>
      <Banner items={list} />
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div``;

export default BannerSection;
