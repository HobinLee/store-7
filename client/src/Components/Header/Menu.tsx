import React, { useState } from "react";
import styled from "styled-components";
import { ETLink } from "@/Router";
import { MenuIcon } from "@/assets/";
import { DropdownWrapper, DropdownItem } from "@/shared/styled";

const Menu = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleMenuOpen = (val: boolean) => {
    setIsMenuOpened(val);
  };

  const [isMenuhover, setIsMenuHover] = useState(false);
  const handleMenuHover = (val: boolean) => {};

  return (
    <Wrapper
      onMouseEnter={() => handleMenuOpen(true)}
      onMouseLeave={() => handleMenuOpen(false)}
    >
      <MenuIcon />
      {isMenuOpened && (
        <DropdownWrapper style={{ left: 0, top: "10rem" }}>
          {[0, 0, 0, 0, 0, 0, 0].map((i, idx) => (
            <ETLink to={`/category/${idx}`}>
              <DropdownItem key={idx}>asdf</DropdownItem>
            </ETLink>
          ))}
        </DropdownWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 10rem;
  height: 10rem;

  img {
    width: 10rem;
    height: 10rem;
  }
`;

export default Menu;
