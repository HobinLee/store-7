import styled from "styled-components";
import contents from "./contents";

export interface ContentAreaProps {
  current: string;
}

const ContentArea = ({ current }: ContentAreaProps) => {
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
