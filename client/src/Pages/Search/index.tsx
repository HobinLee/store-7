import Header from "@/Components/Header";
import { PageWrapper, Contents } from "@/shared/styled";
import styled from "styled-components";
import Footer from "@/Components/Footer";

const SearchPage = () => {
  return (
    <Wrapper>
      <Header />
      <Contents></Contents>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled(PageWrapper)``;

export default SearchPage;
