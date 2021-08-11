import React, { useState } from "react";
import styled from "styled-components";

type TableType = {
  ths: string[];
  ratio: number[];
  checker?: boolean;
  children: JSX.Element | JSX.Element[];
};

const Table = ({
  ths,
  ratio,
  checker = false,
  children: inputChildren,
}: TableType) => {
  // 체크 기능은 이후 isChecked라는 값이 애초에 들어있을건지 협의 후 만들기!

  const entire = ratio.reduce((acc, curr) => acc + curr, 0);
  const children = checker
    ? appendCheckerToChildren(inputChildren)
    : inputChildren;

  return (
    <TableWrapper>
      <colgroup>
        {checker && <col style={{ width: "10%" }} />}
        {ratio.map((ra) => (
          <col style={{ width: `${(ra / entire) * 90}%` }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {checker && (
            <th>
              <AllChecker />
            </th>
          )}
          {ths.map((th) => (
            <th>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </TableWrapper>
  );
};

const TableWrapper = styled.table`
  border-top: 1px solid black;
  width: 100%;
  ${({ theme }) => theme.font.small}
  th {
    padding: 1rem 0;
    background: ${({ theme }) => theme.color.background};
    border-bottom: 1px solid ${({ theme }) => theme.color.line};
  }
`;

const AllChecker = () => {
  return (
    <CheckerWrapper>
      <input type="checkbox" id="allCheck" name="allCheck" />
      <label htmlFor="allCheck" />
    </CheckerWrapper>
  );
};

const Checker = (num) => {
  return (
    <CheckerWrapper>
      <input type="checkbox" id={`Check-${num}`} name={`Check-${num}`} />
      <label htmlFor={`Check-${num}`} />
    </CheckerWrapper>
  );
};

const CheckerWrapper = styled.div`
  position: relative;
  padding-right: 3rem;
  ${({ theme }) => theme.flexCenter}

  input {
    // 추후 얘를 가리고 라벨로 스타일링
  }

  label {
    min-width: 1.3rem;
    min-height: 1.3rem;
    cursor: pointer;
    color: ${({ theme }) => theme.color.grey1};
  }
`;

const appendCheckerToChildren = (children) => {
  return React.Children.map(children, (child) => {
    return (
      <tr>
        <td>
          <Checker />
        </td>
        {child.props.children}
      </tr>
    );
  });
};
export default Table;
