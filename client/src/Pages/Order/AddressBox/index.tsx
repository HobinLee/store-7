import styled from "styled-components";
import { DestinationType, UserType } from "@/shared/type";
import Button from "@/Components/Button";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { gap } from "@/styles/theme";
import { deleteDestination } from "@/api/destinations";
import Checkbox from "@/Components/Checkbox";

export type AddressBoxProps = {
  setPage: Dispatch<SetStateAction<"select" | "add" | "edit">>;
  address: DestinationType;
  setAddress: Dispatch<SetStateAction<DestinationType>>;
  setAddressToEdit?: Dispatch<SetStateAction<DestinationType>>;
  refetch: Function;
  closeModal: Function;
  isChecked: boolean;
  handleCheck: Function;
};

const AddressBox = ({
  setPage,
  address,
  setAddress,
  setAddressToEdit,
  refetch,
  closeModal,
  isChecked,
  handleCheck,
}: AddressBoxProps) => {
  const handleDelete = async (id: number) => {
    await deleteDestination(id);
    setPage("select");
    refetch();
  };
  const handleEdit = () => {
    setAddressToEdit(address);
    setPage("edit");
  };
  const handleSelect = () => {
    setAddress(address);
    closeModal();
  };

  return (
    <Wrapper>
      <div className="checkbox">
        <div>{isChecked && "기본배송지"}</div>
        <Checkbox size="small" {...{ isChecked, handleCheck }} />
      </div>

      <div className="name">{address.name}</div>
      <div>{address.address}</div>
      <div>{address.detailAddress}</div>
      <div className="user">
        {address.addressee} {address.phoneNumber}
      </div>
      <div className="buttons">
        <div>
          <Button onClick={() => handleDelete(address.id)} size="small">
            삭제
          </Button>
          <Button size="small" onClick={handleEdit}>
            수정
          </Button>
        </div>
        <Button size="small" primary onClick={handleSelect}>
          선택
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${gap("1rem", "column")};
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
  ${({ theme }) => theme.font.medium};
  position: relative;

  .checkbox {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    ${gap("0.5rem")};
    ${({ theme }) => theme.font.small};
  }

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
