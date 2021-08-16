import styled from "styled-components";

import Temp from "./Temp";

const Content = ({ current }) => {
  const C = Temp[current];
  return (
    <ContentWrapper>
      <C />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  flex: 1;
`;

export default Content;
