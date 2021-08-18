import styled from "styled-components";
import contents from "./contents";

const ContentArea = ({ current }) => {
  const Content = contents[current];
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
