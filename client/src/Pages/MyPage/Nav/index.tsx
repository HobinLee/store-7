import styled, { css } from "styled-components";
import { Link } from "@/Router";
import {
  DeleveryIcon,
  WishIcon,
  QuestionIcon,
  ReviewIcon,
  UserIcon,
} from "@/assets";

export interface NavProps {
  setCurrent: (path: string) => void;
  current: string;
}

const Nav = ({ setCurrent, current }: NavProps) => {
  return (
    <NavWrpper data-testid="test__nav">
      {navItems.map(({ Icon, title, path }, i) => {
        const isSelected = path === current;
        return (
          <li
            key={i}
            onClick={() => {
              setCurrent(path);
            }}
            className="nav"
          >
            <Link to={`/mypage/${path}`}>
              <NavItem {...{ Icon, title, isSelected }} />
            </Link>
          </li>
        );
      })}
    </NavWrpper>
  );
};

const NavWrpper = styled.ul`
  display: flex;
  margin-right: 5rem;
  align-items: flex-end;
  flex: 1;
  & > li {
    flex: 1;
    ${({ theme }) => theme.font.small}
  }
  & > li + li {
    margin-left: 5rem;
  }
`;

const ICON_SIZE = 60;
const navItems = [
  {
    Icon: (props) => (
      <WishIcon width={ICON_SIZE} height={ICON_SIZE} {...props} />
    ),
    title: "내 찜목록",
    path: "orders",
  },
  {
    Icon: (props) => (
      <DeleveryIcon width={ICON_SIZE} height={ICON_SIZE} {...props} />
    ),
    title: "주문목록 / 배송조회",
    path: "orders",
  },
  {
    Icon: (props) => (
      <UserIcon width={ICON_SIZE} height={ICON_SIZE} {...props} />
    ),
    title: "회원정보 변경",
    path: "userinfo",
  },
  {
    Icon: (props) => (
      <QuestionIcon width={ICON_SIZE} height={ICON_SIZE} {...props} />
    ),
    title: "나의 상품문의",
    path: "questions",
  },
  {
    Icon: (props) => (
      <ReviewIcon width={ICON_SIZE} height={ICON_SIZE} {...props} />
    ),
    title: "나의 상품후기",
    path: "reviews",
  },
];

const NavItem = ({ Icon, title, isSelected }) => {
  return (
    <NavItemWrapper isSelected={isSelected}>
      <div>
        <Icon fill={isSelected ? "#3be1b4" : "black"} />
      </div>
      <h3>{title}</h3>
    </NavItemWrapper>
  );
};

const NavItemWrapper = styled.div<{ isSelected: boolean }>`
  ${({ isSelected }) =>
    isSelected &&
    css`
      transform: scale(1.3);
    `}
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    transform: scale(1.3);
    transition: transform 0.2s;
  }
`;
export default Nav;
