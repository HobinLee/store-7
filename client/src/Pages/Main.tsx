import Header from '@/Components/Header';
import React from 'react';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

export default MainPage;
