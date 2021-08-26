import {
  KeyboardEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import Input from "@/Components/Input";
import { DropdownWrapper, DropdownItem } from "@/shared/styled";
import useInput from "@/hooks/useInput";
import SearchList from "./DropDown/SearchedList";
import AutoList from "./DropDown/AutoCompleteList";
import { moveTo } from "@/Router";
import { media } from "@/styles/theme";
import { categories } from "@/shared/dummy";
import { MainCategoryType } from "@/Pages/Category";

const LS_SEARCH = "search";

const Search = () => {
  const searchValue = useInput("");

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const [category, setCategory] = useState<MainCategoryType>(categories[0]);
  const handleCategory = (category) => {
    setCategory(category);
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

    moveTo(`/search?category=${category.id}&keyword=${keyword}`);
  };

  const handleDeleteSearchList = (keyword?: string) => {
    keyword
      ? setNewSearchList(searchList.filter((value) => value !== keyword))
      : setNewSearchList([]);
  };

  return (
    <SearchWrapper
      onKeyUp={({ key, target }) => {
        key === "Enter" && handleSearch((target as HTMLInputElement).value);
      }}
    >
      <div onClick={handleMenuOpen} className="input-box__select">
        {category.name}
        {isMenuOpened && (
          <DropdownWrapper>
            {categories.map((mainCategory: MainCategoryType) => (
              <DropdownItem
                onClick={() => handleCategory(mainCategory)}
                key={mainCategory.id}
              >
                {mainCategory.name}
              </DropdownItem>
            ))}
          </DropdownWrapper>
        )}
      </div>
      <div style={{ position: "relative" }} onClick={handleSearchBox}>
        <input
          className="search-input"
          placeholder="검색어를 입력해주세요."
          defaultValue={searchValue.value}
          onChange={searchValue.onChange}
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
  border: 0.2rem solid ${({ theme }) => theme.color.light_grey2};
  background: ${({ theme }) => theme.color.off_white};
  z-index: 40;
  .input-box__select {
    color: ${({ theme }) => theme.color.grey1};
    position: relative;
    border-right: 0.2rem solid ${({ theme }) => theme.color.light_grey2};
    padding: 0.6rem 2rem;
    min-width: 11rem;
    max-width: auto;
    box-sizing: border-box;
    height: 100%;
    font-size: 1.4rem;
    text-align: left;
    cursor: pointer;

    & > div {
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.color.primary1};
      background: white;
      top: 3.4rem;
      right: -0.3rem;
      & > div {
        &:hover {
          background: ${({ theme }) => theme.color.off_white};
        }
      }
    }
  }

  .search-input {
    ${({ theme }) => theme.font.medium}
    ::placeholder {
      color: ${({ theme }) => theme.color.light_grey2};
    }
    color: ${({ theme }) => theme.color.grey1};
    border: none;
    padding: 1rem 1.5rem;
    width: 34rem;
    text-align: left;

    ${media.tablet} {
      width: 22vw;
    }
  }

  ${media.mobile} {
    display: none;
  }
`;

const SearchBox = styled.div`
  ${({ theme }) => theme.font.small}
  position: absolute;
  width: 27rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.light_grey2};
  background: ${({ theme }) => theme.color.white};
  .search-list__title {
    font-weight: bolder;
  }
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
