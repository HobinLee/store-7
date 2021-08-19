import styled from "styled-components";

const SearchList = ({ list, handleSearch, handleDelete }) => {
  const generateList = list.map((keyword, idx) => (
    <li key={idx} onClick={() => handleSearch(keyword)}>
      {" "}
      {keyword}{" "}
      <div
        className="search-list__delte-item"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(keyword);
        }}
      ></div>
    </li>
  ));

  return (
    <SearchListWrapper>
      <div className="search-list__title">최근검색어</div>
      <ul className="search-list__list">
        {list.length > 0 ? (
          generateList
        ) : (
          <span className="no-list">최근 검색내역이 없습니다</span>
        )}
      </ul>
      <div className="search-list__delte-all" onClick={() => handleDelete()}>
        전체 삭제
      </div>
    </SearchListWrapper>
  );
};

const SearchListWrapper = styled.div`
  max-height: 100%;
  ul {
    height: auto;
    max-height: 16rem;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    margin-top: 1rem;
  }

  li {
    color: ${({ theme }) => theme.color.grey1};
    padding: 1rem;
    max-width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      background: ${({ theme }) => theme.color.background};
    }
    .search-list__delte-item {
      width: 1.5rem;
      height: 1.5rem;
      right: 0;
      top: 0;
      background-color: ${({ theme }) => theme.color.grey2};
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .no-list {
    padding: 0.7rem 0;
    color: ${({ theme }) => theme.color.grey1};
  }

  .search-list__delte-all {
    text-align: right;
    color: ${({ theme }) => theme.color.grey2};
    cursor: pointer;
    padding-top: 1rem;
  }
`;

export default SearchList;
