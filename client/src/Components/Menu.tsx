import { flexCenter, shadow } from '@/styles/global-style';
import React, { useState } from 'react';
import styled from 'styled-components';

const Menu = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuOpen = (val: boolean) => {
    setIsMenuOpened(val);
  };

  return (
    <Wrapper
      onMouseEnter={() => handleMenuOpen(true)}
      onMouseLeave={() => handleMenuOpen(false)}
    >
      {isMenuOpened && (
        <MenuList>
          {[0, 0, 0, 0, 0, 0, 0].map((i) => (
            <div key={i.toString()} className="menu">
              asdf
            </div>
          ))}
        </MenuList>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 10rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.color.blue};
`;

const MenuList = styled.div`
  ${flexCenter}
  ${shadow}
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 10rem;
  flex-direction: column;
  .menu {
    width: 10rem;
    box-sizing: border-box;
    padding: 0.8rem 1rem;
  }
`;

export default Menu;
