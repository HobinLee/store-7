import { PageWrapper } from "@/shared/styled";
import React, { JSXElementConstructor, ReactElement } from "react";
import styled from "styled-components";
type InfoRowType = {
  essential?: boolean,
  title: string,
  children: ReactElement<unknown> | JSXElementConstructor<unknown>;
}

const InfoRow = ({ essential, title, children }: InfoRowType) => {
  return <tr>
    <th className={essential ? "essential" : ""}>{title}</th>
    <td>
      {children}
    </td>
  </tr>
}

const SignupPage = () => {
  return <Wrapper>
    <SignupForm>
      <Title>기본정보</Title>
      <InfoTable>
        <tbody>
          <InfoRow essential title="아이디">
            <input></input>
          </InfoRow>
          <InfoRow essential title="비밀번호">
            <input></input>
          </InfoRow>
          <InfoRow essential title="비밀번호 확인">
            <input></input>
          </InfoRow>
          <InfoRow essential title="이름">
            <input></input>
          </InfoRow>
          <InfoRow essential title="이메일">
            <div>
              <input></input>
              <input type="checkbox" id="maillingFl" name="maillingFl" value="y" aria-invalid="false">
              </input>
              <label for="maillingFl" class="check_s on">(선택)마케팅 및 이벤트 정보 메일 수신에 동의합니다.</label>
            </div>
          </InfoRow>
          <InfoRow essential title="휴대폰 번호">
            <div>
            <input></input>
            <input type="checkbox" id="maillingFl" name="maillingFl" value="y" aria-invalid="false">
              </input>
              <label for="maillingFl" class="check_s on">(선택)마케팅 및 이벤트 정보 메일 수신에 동의합니다.</label>
            </div>
            
          </InfoRow>
          <InfoRow title="전화번호">
            <input></input>
          </InfoRow>
          <InfoRow title="주소">
            <div className="sign-up__address-input">
              <div className="sign-up__address-number">
                <input></input>
                <button>우편번호 확인</button>
              </div>
              <input></input>
              <input></input>
            </div>
          </InfoRow>
        </tbody>
      </InfoTable>
      <Title>생일 축하합니다!</Title>
      <InfoTable>
        <tbody>
          <InfoRow essential title="생일">
            <div className="sign-up__birthdate-input">
              <input></input>
              <input></input>
              <input></input>
            </div>
          </InfoRow>
        </tbody>
      </InfoTable>
      <Button>취소</Button>
      <Button>회원가입</Button>
    </SignupForm>
  </Wrapper>;
};
const SignupForm = styled.form`
  width: 100%;
  max-width: 40rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    border: 1px solid #ddd;
    height: 2em;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    ::placeholder {
      color: #aaa;
    }
  }
  .sign-up__address-input {
   display: flex;
   flex-direction: column;
   .sign-up__address-number {
     width: 100%;
     display: flex;
     flex-direction: row;
     input {
       width: 100%;
       margin-right: 1rem;
     }
     button {
       width: 16rem;
     }
   }
  }
`
const Wrapper = styled(PageWrapper)`
  font-size: 1.2rem;
`;

const Title = styled.h3`
  width: 100%;
  text-align: left;
  font-size: 1.8rem;
  color: #444;
  margin: 2rem 0;
`

const InfoTable = styled.table`
  width: 100%;
  border-top: 1px solid #222;
  tr {
   height: 4rem; 
   border-bottom: 1px solid #ddd;
  }
  th {
    width: 10rem;
    padding: 1rem;
    text-align: left;
    background-color: #eee;
    font-weight: bolder;
  }
  td {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .essential::before {
    content: "*";
  }
  .sign-up__birthdate-input {
    width: 100%;
    flex-direction: row;
    input {
      width: 100%;
    }
  }
`;
const Button = styled.button`
  width: 100%;
  height: 6rem;
  background-color: #222;
  color: #eee;
  font-size: 1.8rem;
  border: none;
`;

export default SignupPage;
