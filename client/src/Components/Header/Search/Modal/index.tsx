import styled from "styled-components";
import SearchBar from "@/Components/Header/Search";
const SearchModal = () => {
  return (
    <Wrapper>
      <SearchBar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 50rem;
  background: white;
  position: relative;
`;

export default SearchModal;
