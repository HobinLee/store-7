import styled from "styled-components";
import { Delete } from "@/assets";
import { hideScroll } from "@/styles/theme";

const SearchList = ({ list, handleSearch, handleDelete }) => {
  const generateList = list.map((keyword, idx) => (
    <li key={idx} onClick={() => handleSearch(keyword)}>
      <span>{keyword}</span>
      <button
        className="search-list__delte-item"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(keyword);
        }}
      >
        <Delete />
      </button>
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
      <button className="search-list__delte-all" onClick={() => handleDelete()}>
        전체 삭제
      </button>
    </SearchListWrapper>
  );
};

const SearchListWrapper = styled.div`
  max-height: 100%;
  display: flex;
  flex-direction: column;
  ul {
    height: auto;
    max-height: 16rem;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    ${hideScroll}
    margin-top: 1rem;
  }

  li {
    box-sizing: border-box;
    color: ${({ theme }) => theme.color.grey1};
    padding: 0;
    max-width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    word-break: break-all;
    word-wrap: wrap;

    span {
      width: 100%;
      padding: 1rem;
    }
    span:hover {
      background: ${({ theme }) => theme.color.background};
    }

    .search-list__delte-item {
      width: 1.5rem;
      min-width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;
      margin-right: 0.5rem;
      svg {
        width: 1.3rem;
        height: 1.3rem;
      }
      &:hover {
        opacity: 0.5;
      }
    }
  }

  .no-list {
    padding: 0.7rem 0;
    color: ${({ theme }) => theme.color.grey1};
  }

  .search-list__delte-all {
    align-self: flex-end;
    text-align: right;
    color: ${({ theme }) => theme.color.grey2};
    cursor: pointer;
    padding-top: 1rem;
    border: none;
  }
`;

export default SearchList;
