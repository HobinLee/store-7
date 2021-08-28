import { gap, media } from "@/styles/theme";
import styled from "styled-components";
import { Logo } from "@/assets";
import { Link } from "@/Router";

const Footer = () => {
  return (
    <Wrapper>
      <img width="300" src={Logo} />

      <div>
        <b>
          <a href="https://github.com/danmin20">이정민</a>
          <a href="https://github.com/LeagueLugas">임용성</a>
          <a href="https://github.com/HobinLee">이호빈</a>
          <a href="https://github.com/jjunyjjuny">홍영준</a>
        </b>

        <p>
          {`상호 : (주)ET들 | 대표 : ET | 사업자등록번호 : 120-87-65763 | 통신판매업신고번호 : 2012-서울송파-0515 | [사업자정보확인]
          팩스번호 : 은하철도999 | 메일 : et_store@ets.com | ET네 만물상 인스타그램 : @et_store
          주소 : 안드로메다 은하단구 은하수로 2 장은빌딩
          © ETs Corp. All right Reserved`}
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 30rem;
  background-color: ${({ theme }) => theme.color.light_grey1};
  ${({ theme }) => theme.flexCenter};
  padding: 5rem;
  box-sizing: border-box;
  ${gap("10rem")}
  ${media.tablet} {
    ${gap("0")}
  }
  ${media.mobile} {
    margin: 0;
    flex-direction: column;
  }
  b {
    ${({ theme }) => theme.font.medium};
    display: flex;
    ${gap("6rem")}
    font-weight: 700;
    ${media.tablet} {
      justify-content: space-between;
    }
    a {
      color: #000;
    }
  }
  p {
    ${({ theme }) => theme.font.small};
    margin-top: 3rem;
    line-height: 2rem;
    white-space: pre-line;
    color: ${({ theme }) => theme.color.grey1};
    > & {
      white-space: nowrap;
    }
  }
  img {
    ${media.tablet} {
      width: 20rem;
      height: auto;
    }
    ${media.mobile} {
      width: 10rem;
      height: auto;
      margin-bottom: 2rem;
    }
  }
`;

export default Footer;
