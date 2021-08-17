import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

// TODO: 그냥 테스트용 데이터고 화요일에 바로 Elastic Search 적용해볼 거에요..!
const RandomList = [
  "물품1",
  "물품2",
  "물품3",
  "물품4",
  "물품5",
  "물품6",
  "물품7",
  "책",
  "매거진",
  "펜",
  "연필",
  "지우개",
  "색연필",
];

const AutoList = ({ keyword, handleSearch }) => {
  const handleClick = (v) => {
    console.log(v, "click");

    handleSearch(v);
  };
  const [autoList, setAutoList] = useState<string[]>([]);

  useEffect(() => {
    setAutoList(
      RandomList.filter((v) => v.includes(keyword)).sort(
        (a, b) => a.length - b.length
      )
    );
  }, [keyword]);

  const generateAutoList = autoList.map((value, idx) => (
    <li key={idx} onClick={() => handleClick(value)}>
      {value}
    </li>
  ));
  return (
    <AutoListWrapper>
      {autoList.length ? (
        generateAutoList
      ) : (
        <div className="no-list">관련 상품이 없습니다</div>
      )}
    </AutoListWrapper>
  );
};

const AutoListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 16rem;
  overflow-y: scroll;
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
    padding: 0.7rem 0;
    color: ${({ theme }) => theme.color.grey2};
  }
`;

export default AutoList;
