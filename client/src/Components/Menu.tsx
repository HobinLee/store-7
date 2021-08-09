import { flexCenter, shadow } from "@/styles/global-style";
import React, { useState } from "react";
import styled from "styled-components";

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
      <img
        height="100"
        src="https://mblogthumb-phinf.pstatic.net/MjAxOTA1MTdfMjg5/MDAxNTU4MDU5MjY3NzI0.La9iCTKSS9Cue6MbMeNSJADSkjSr0VMPlAsIdQYGjoYg.q_VK0tw6okzVQOBJbXGKFFGJkLJUqLVT26CZ9qe29Xcg.PNG.smartbaedal/%ED%97%A4%ED%97%A4%EB%B0%B0%EB%8B%AC%EC%9D%B4_%EC%9E%90%EB%A5%B8%EA%B2%83.png?type=w800"
      />
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
`;

const MenuList = styled.div`
  ${flexCenter}
  ${shadow}
  background-color: #fff;
  position: absolute;
  left: 1rem;
  top: 10rem;
  flex-direction: column;
  .menu {
    width: 10rem;
    box-sizing: border-box;
    padding: 0.8rem 1rem;
  }
`;

export default Menu;
