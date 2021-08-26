import styled, { css } from "styled-components";
import { Link } from "@/Router";
import {
  Delivery,
  Wish,
  Question,
  Review,
  DeliveryActive,
  WishActive,
  QuestionActive,
  ReviewActive,
} from "@/assets";

export interface NavProps {
  setCurrent: (path: string) => void;
  current: string;
}

const Nav = ({ setCurrent, current }: NavProps) => {
  return (
    <NavWrpper data-testid="test__nav">
      {navItems.map(({ Icon, Gif, title, path }, i) => {
        const isSelected = path === current;
        return (
          <li key={i} className="nav">
            <Link to={`/mypage/${path}`}>
              <NavItem {...{ Icon, Gif, title, isSelected }} />
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
    Icon: <img src={Delivery} width={ICON_SIZE} height={ICON_SIZE} />,
    Gif: <img src={DeliveryActive} width={ICON_SIZE} height={ICON_SIZE} />,
    title: "주문목록 / 배송조회",
    path: "order",
  },
  {
    Icon: <img src={Wish} width={ICON_SIZE} height={ICON_SIZE} />,
    Gif: <img src={WishActive} width={ICON_SIZE} height={ICON_SIZE} />,

    title: "내 찜목록",
    path: "wish",
  },

  {
    Icon: <img src={Question} width={ICON_SIZE} height={ICON_SIZE} />,
    Gif: <img src={QuestionActive} width={ICON_SIZE} height={ICON_SIZE} />,

    title: "나의 상품문의",
    path: "question",
  },
  {
    Icon: <img src={Review} width={ICON_SIZE} height={ICON_SIZE} />,
    Gif: <img src={ReviewActive} width={ICON_SIZE} height={ICON_SIZE} />,

    title: "나의 상품후기",
    path: "review",
  },
  // {
  //   Icon: (props) => (
  //     <UserIcon width={ICON_SIZE} height={ICON_SIZE} {...props} />
  //   ),
  //   title: "회원정보 변경",
  //   path: "userinfo",
  // },
];

const NavItem = ({ Icon, Gif, title, isSelected }) => {
  return (
    <NavItemWrapper isSelected={isSelected}>
      <div>{isSelected ? Gif : Icon}</div>
      <h3>{title}</h3>
    </NavItemWrapper>
  );
};

const NavItemWrapper = styled.div<{ isSelected: boolean }>`
  ${({ isSelected }) =>
    isSelected &&
    css`
      transform: scale(1.1);
    `}
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
`;
export default Nav;
