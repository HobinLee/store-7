import styled from "styled-components";

import Section from "../../../Section";
import Item from "@/Components/Item";
import { ItemWrapList } from "@/shared/styled";
import { useMyWishes } from "@/api/my";

const WishList = () => {
  const { status, data: wishes } = useMyWishes();

  return (
    <Wrapper data-testid="test__wishlist">
      <Section
        title="찜리스트"
        description="최근 30일 내에 진행중인 주문정보입니다."
        lineType="long1"
        data-testid="test__section"
      >
        {status !== "loading" && (
          <ItemWrapList>
            {wishes.map((wish) => (
              <Item {...wish} key={wish.id} />
            ))}
          </ItemWrapList>
        )}
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default WishList;
