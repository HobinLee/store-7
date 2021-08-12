import Header from "@/Components/Header";
import { PageWrapper, Contents, ItemList } from "@/shared/styled";
import React from "react";
import styled from "styled-components";
import Banner from "./Banner";
import BannerImg from "@/assets/banner1.gif";
import Item from "@/Components/Item";
import Footer from "@/Components/Footer";
import { sampleMain } from "@/shared/dummy";
import GiftSection from "./GiftSection/";
import { ItemBannerType } from "@/shared/type";
const banner1: ItemBannerType = {
  brief: "다시 돌아온 플리츠마마x배민 콜라보!",
  title: "플리츠마마X배달의민족. 텀블러백",
  src: BannerImg,
  id: 1,
};

const list: ItemBannerType[] = [banner1];

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <Banner items={list} />
      <Contents style={{ padding: "10rem 5rem" }}>
        <div className="main__contents-wrapper">
          <div>
            <div className="title">잘나가는</div>
            <ItemList>
              {sampleMain.map((item) => (
                <li key={item.id}>
                  <Item {...item} />
                </li>
              ))}
            </ItemList>
          </div>
          <GiftSection />
          <div>
            <div className="title">잘나가요</div>
            <ItemList>
              {sampleMain.map((item) => (
                <li key={item.id}>
                  <Item {...item} />
                </li>
              ))}
            </ItemList>
          </div>
        </div>
      </Contents>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .main__contents-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5rem;

    & > div {
      ${({ theme }) => theme.flexCenter}
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      & + & {
        margin-top: 10rem;
      }
      .title {
        width: 100%;
        ${({ theme }) => theme.font.large}
        margin-bottom: 2rem;
      }
    }
  }
`;

export default MainPage;
