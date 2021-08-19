import styled from "styled-components";
import { DestinationType, UserType } from "@/shared/type";
import Button from "@/Components/Button";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { gap } from "@/styles/theme";

export type AddressBoxProps = {
  setPage: Dispatch<SetStateAction<"select" | "add" | "edit">>;
  address: DestinationType;
  user: UserType;
};

const AddressBox = ({ setPage, address, user }: AddressBoxProps) => {
  const handleChangeaddress = (address: DestinationType) => {
    console.log(address);
  };

  return (
    <Wrapper>
      <div className="name">{address.name}</div>
      <div>{address.detailAddress}</div>
      <div className="user">
        <span>{user.name}</span> <span>{user.phoneNumber}</span>
      </div>
      <div className="buttons">
        <div>
          <Button size="small">삭제</Button>
          <Button size="small" onClick={() => setPage("edit")}>
            수정
          </Button>
        </div>
        <Button size="small" primary>
          선택
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${gap("1rem", "column")}
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
  ${({ theme }) => theme.font.medium};

  .name {
    ${({ theme }) => theme.font.large};
  }
  .user {
    color: ${({ theme }) => theme.color.line};
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    & > div {
      display: flex;
      ${gap("1rem")}
    }
  }
`;

export default AddressBox;
