import { gap } from "@/styles/theme";
import styled from "styled-components";
import GiftItem from "./Gift";

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
`;

export default GiftList;
