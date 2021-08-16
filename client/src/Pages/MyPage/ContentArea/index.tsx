import styled from "styled-components";
import Contents from "./Contents";

const ContentArea = ({ current }) => {
  const Content = Contents[current];
  return (
    <ContentWrapper>
      <Content />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  flex: 1;
`;

export default ContentArea;
