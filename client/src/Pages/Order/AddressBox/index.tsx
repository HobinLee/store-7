import styled from "styled-components";
import { DestinationType, UserType } from "@/shared/type";
import Button from "@/Components/Button";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { gap } from "@/styles/theme";
import { deleteDestination } from "@/api/destinations";

export type AddressBoxProps = {
  setPage: Dispatch<SetStateAction<"select" | "add" | "edit">>;
  address: DestinationType;
  setAddress: Dispatch<SetStateAction<DestinationType>>;
  setAddressToEdit?: Dispatch<SetStateAction<DestinationType>>;
};

const AddressBox = ({
  setPage,
  address,
  setAddress,
  setAddressToEdit,
}: AddressBoxProps) => {
  const handleDelete = async (id: number) => {
    await deleteDestination(id);
  };
  const handleEdit = () => {
    setAddressToEdit(address);
    setPage("edit");
  };

  return (
    <Wrapper>
      <div className="name">{address.name}</div>
      <div>{address.address}</div>
      <div>{address.detailAddress}</div>
      <div className="buttons">
        <div>
          <Button onClick={() => handleDelete(address.id)} size="small">
            삭제
          </Button>
          <Button size="small" onClick={handleEdit}>
            수정
          </Button>
        </div>
        <Button size="small" primary onClick={() => setAddress(address)}>
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
