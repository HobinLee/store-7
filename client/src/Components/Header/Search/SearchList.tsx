import React from "react";
import styled from "styled-components";

const SearchList = ({ list, handleSearch }) => {
  const generateList = list.map((keyword, idx) => (
    <li key={idx} onClick={() => handleSearch(keyword)}>
      {" "}
      {keyword}{" "}
    </li>
  ));

  return (
    <>
      <span className="search-list__title">최근검색어</span>
      <SearchListWrapper>
        {list.length > 0 ? (
          generateList
        ) : (
          <span className="no-list">최근 검색내역이 없습니다</span>
        )}
      </SearchListWrapper>
    </>
  );
};

const SearchListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  li {
    color: ${({ theme }) => theme.color.grey1};
    padding: 1rem;
    max-width: 100%;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.color.background};
    }
  }

  .no-list {
    color: ${({ theme }) => theme.color.grey1};
  }
`;

export default SearchList;
