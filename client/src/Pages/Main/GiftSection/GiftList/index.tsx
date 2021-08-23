import { ItemBannerType } from "@/shared/type";
import { gap, media } from "@/styles/theme";
import styled from "styled-components";
import GiftItem from "../Gift";

export interface GiftListProps {
  items: ItemBannerType[];
}

const GiftList = ({ items }) => (
  <GiftListWrapper>
    {items.map((item, idx) => (
      <li key={idx}>
        <GiftItem item={item} />
      </li>
    ))}
  </GiftListWrapper>
);

const GiftListWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex: 1 1 50%;
  ${gap("2rem")}

  ${media.custom(620)} {
    flex-direction: column;
    flex: 0 0 100%;
    li {
      margin: 0;
      padding: 0.5rem 0;
    }
  }
`;

export default GiftList;
