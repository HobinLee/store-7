import styled from "styled-components";

import Contents from "./Contents";

const Content = ({ current }) => {
  const C = Contents[current];
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
