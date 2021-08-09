import Header from "@/Components/Header";
import { PageWrapper } from "@/shared/styled";
import React from "react";
import styled from "styled-components";

const DetailPage = () => {
  return (
    <Wrapper>
      <Header />
      <div className="contents"></div>
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)`
  .contents {
  }
`;

export default DetailPage;
