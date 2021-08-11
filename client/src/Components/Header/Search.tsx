import { ETLink } from "@/Router";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { DropdownWrapper, DropdownItem } from "@/shared/styled";
import useInput from "@/hooks/useInput";

const LS_SEARCH = 'search';

const SearchList = ({ list, handleSearch }) => {
  const generateList = list.map((keyword, idx) =>
    <li key={idx} onClick={() => handleSearch(keyword)}> {keyword} </li>);
  return (
    <SearchListWrapper>
      { list.length > 0 ? generateList : <span className="no-list">최근 검색내역이 없습니다</span>}
    </SearchListWrapper>
  );
}

const SearchListWrapper = styled.ul `
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  li {
    color: ${({theme}) => theme.color.grey1};
    padding: 1rem;
    max-width: 100%;
    cursor: pointer;
    &:hover {
      background: ${({theme}) => theme.color.background};
    }
  }

  .no-list {
    color: ${({theme}) => theme.color.grey1}
  }
`

const Search = () => {
  const searchValue = useInput("");
  
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const [category, setCategory] = useState("전체");
  const handleCategory = (val: string) => {
    setCategory(val);
  };

  const [isSearchBoxOpened, setIsSearchBoxOpened] = useState(false);
  const handleSearchBoxOpen = () => {
    setIsSearchBoxOpened(!isSearchBoxOpened);
  };

  const [searchList, setSearchList] = useState(JSON.parse(localStorage.getItem(LS_SEARCH)) ?? []);
  const handleSearch = (keyword:string = searchValue.value) => {
    if (keyword === '') return;

    searchValue.setValue(keyword);

    const newList: string[] = [ ...searchList, keyword ];

    setSearchList(newList);
    localStorage.setItem(LS_SEARCH, JSON.stringify(newList));
  }
  
  useEffect(() => {
    // 자동완성?
  }, [searchValue]);

  return (
  <SearchWrapper onKeyUp={(e) => {
    if (e.key === 'Enter') handleSearch()}
  }>
    <div onClick={handleMenuOpen} className="input-box__select">
      {category}
      {isMenuOpened && (
        <DropdownWrapper style={{ left: 0, top: "3rem" }}>
          {[0, 0, 0, 0, 0, 0, 0].map((i, idx) => (
            <DropdownItem
              onClick={() => handleCategory("asdf")}
              key={idx}
            >
              asdf
            </DropdownItem>
          ))}
        </DropdownWrapper>
      )}
    </div>
    <div style={{ position: "relative" }} onClick={handleSearchBoxOpen}>
      <SearchInput
        placeholder="검색어를 입력해주세요."
        value={searchValue.value}
        onChange={searchValue.onChange}
      />
      {(searchValue.value.length > 0) && <ResetButton onClick={() => searchValue.setValue('')} />}
      {isSearchBoxOpened && <SearchBox>
          <span className="search-list__title">최근검색어</span>
          <SearchList list = {searchList} handleSearch={handleSearch}/>
        </SearchBox>}
    </div>
  </SearchWrapper>
  )
}

const SearchWrapper = styled.form`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  border-radius: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.color.light_grey1};
  .input-box__select {
    color: ${({ theme }) => theme.color.grey1 };
    position: relative;
    border-right: 0.2rem solid ${({ theme }) => theme.color.light_grey2};
    padding: 0 1.5rem;
    width: 11rem;
    box-sizing: border-box;
    height: 100%;
  }
`

const SearchBox = styled.div`
  ${({theme}) => theme.font.small}
  position: absolute;
  width: 27rem;
  max-height: 16rem;
  overflow-y: scroll;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.light_grey2};
  background: ${({ theme }) => theme.color.off_white};
  .search-list__title {
    font-weight: bolder;
  }
`;

const SearchInput = styled(Input)`
  ${({theme}) => theme.font.medium}
  ::placeholder {
    color: ${({ theme }) => theme.color.light_grey2 }
  }
  border: none;
  padding: 1rem 1.5rem;
  width: 30rem;
  text-align: left;
  background: none;
`;

const ResetButton = styled.button`
  position: absolute;
  margin-top: 0.8rem;
  right: 1rem;
  padding: 1rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background: ${({ theme }) => theme.color.light_grey1};
  cursor: pointer;
  border-radius: 50%;
`

export default Search;