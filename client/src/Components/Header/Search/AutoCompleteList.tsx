import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const RandomList = [
  "물품1",
  "물품2",
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
  return <AutoListWrapper>{generateAutoList}</AutoListWrapper>;
};

const AutoListWrapper = styled.ul`
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

export default AutoList;
