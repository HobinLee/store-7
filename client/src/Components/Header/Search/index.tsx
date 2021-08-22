import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "@/Components/Input";
import { DropdownWrapper, DropdownItem } from "@/shared/styled";
import useInput from "@/hooks/useInput";
import SearchList from "./DropDown/SearchedList";
import AutoList from "./DropDown/AutoCompleteList";
import { debounce } from "@material-ui/core";

const LS_SEARCH = "search";

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
  const handleSearchBox = () => {
    setIsSearchBoxOpened(!isSearchBoxOpened);
  };

  const [searchList, setSearchList] = useState<string[]>(
    JSON.parse(localStorage.getItem(LS_SEARCH)) ?? []
  );

  const setNewSearchList = (newList: string[]) => {
    setSearchList(newList);
    localStorage.setItem(LS_SEARCH, JSON.stringify(newList));
  };

  const makeNewSearchedList = (newKeyword: string): string[] => {
    const MAX_LIST_COUNT = 10;

    const newList = [
      newKeyword,
      ...searchList.filter((value, idx) => value !== newKeyword),
    ];

    return newList.slice(0, MAX_LIST_COUNT);
  };

  const handleSearch = (keyword: string = searchValue.value) => {
    if (keyword === "") return;

    searchValue.setValue(keyword);

    setNewSearchList(makeNewSearchedList(keyword));
  };

  const handleDeleteSearchList = (keyword?: string) => {
    keyword
      ? setNewSearchList(searchList.filter((value) => value !== keyword))
      : setNewSearchList([]);
  };

  const debounceAutoComplete = debounce(() => {}, 200);

  const onChangeKeyword = (e) => {
    searchValue.onChange(e);
    debounceAutoComplete();
  };

  return (
    <SearchWrapper
      onKeyUp={(e) => {
        if (e.key === "Enter") handleSearch();
      }}
    >
      <div onClick={handleMenuOpen} className="input-box__select">
        {category}
        {isMenuOpened && (
          <DropdownWrapper style={{ left: 0, top: "3rem" }}>
            {[0, 0, 0, 0, 0, 0, 0].map((i, idx) => (
              <DropdownItem onClick={() => handleCategory("asdf")} key={idx}>
                asdf
              </DropdownItem>
            ))}
          </DropdownWrapper>
        )}
      </div>
      <div style={{ position: "relative" }} onClick={handleSearchBox}>
        <SearchInput
          placeholder="검색어를 입력해주세요."
          value={searchValue.value}
          onChange={onChangeKeyword}
        />
        {searchValue.value.length > 0 && (
          <ResetButton onClick={() => searchValue.setValue("")} />
        )}
        {isSearchBoxOpened && (
          <SearchBox>
            {searchValue.value?.length ? (
              <AutoList
                keyword={searchValue.value}
                handleSearch={handleSearch}
              />
            ) : (
              <SearchList
                list={searchList}
                handleSearch={handleSearch}
                handleDelete={handleDeleteSearchList}
              />
            )}
          </SearchBox>
        )}
      </div>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.form`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => theme.font.medium}
  border-radius: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.color.light_grey1};
  .input-box__select {
    color: ${({ theme }) => theme.color.grey1};
    position: relative;
    border-right: 0.2rem solid ${({ theme }) => theme.color.light_grey2};
    padding: 0 1.5rem;
    width: 11rem;
    box-sizing: border-box;
    height: 100%;
  }
`;

const SearchBox = styled.div`
  ${({ theme }) => theme.font.small}
  position: absolute;
  width: 27rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.light_grey2};
  background: ${({ theme }) => theme.color.off_white};
  .search-list__title {
    font-weight: bolder;
  }
`;

const SearchInput = styled(Input)`
  ${({ theme }) => theme.font.medium}
  ::placeholder {
    color: ${({ theme }) => theme.color.light_grey2};
  }
  color: ${({ theme }) => theme.color.light_grey1};
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
`;

export default Search;
