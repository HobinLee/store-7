import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { useState } from "react";
import AddressBox from "../AddressBox";
import Button from "@/Components/Common/Button";
import { Back } from "@/assets";
import AddressForm from "../AddressForm";
import { gap } from "@/styles/theme";
import { useMyDestinations } from "@/api/my";
import { useEffect, useCallback } from "react";
import { patchDefaultDestination } from "@/api/destinations";

const AddressModal = ({ closeModal, setAddress }) => {
  const { status, data: destinations, error, refetch } = useMyDestinations();

  const [page, setPage] = useState<"select" | "add" | "edit">("select");
  const title =
    (page === "select" && "배송지 선택") ||
    (page === "edit" && "배송지 수정") ||
    (page === "add" && "배송지 추가");

  const [addressToEdit, setAddressToEdit] = useState();

  // 기본배송지
  const [defaultId, setDefaultId] = useState(
    destinations?.find((i) => i.isDefault)?.id
  );
  const handleCheck = async (id: number) => {
    setDefaultId(id);
    await patchDefaultDestination(id);
    refetch();
  };

  useEffect(() => {
    setDefaultId(destinations?.find((i) => i.isDefault)?.id);
  }, [destinations]);

  const RenderContents = useCallback(() => {
    return (
      <Contents>
        {destinations.length > 0 ? (
          destinations.map((address) => (
            <AddressBox
              key={address.id}
              {...{
                setPage,
                address,
                setAddress,
                setAddressToEdit,
                refetch,
                closeModal,
              }}
              isChecked={
                defaultId === address.id ||
                destinations?.find((i) => i.isDefault)?.id === address.id
              }
              handleCheck={() => handleCheck(address.id)}
            />
          ))
        ) : (
          <div className="empty">첫 배송지 추가시 기본배송지로 설정됩니다.</div>
        )}
      </Contents>
    );
  }, [destinations]);

  return (
    <Wrapper {...{ closeModal, title }} hideCloseBtn={page !== "select"}>
      <>
        {page !== "select" && (
          <Back
            data-testid="back-btn"
            className="back-btn"
            onClick={() => setPage("select")}
          />
        )}

        {page === "select" ? (
          <RenderContents />
        ) : (
          <AddressForm
            isFirst={destinations.length === 0}
            {...{ addressToEdit, refetch, setAddressToEdit, setPage }}
          />
        )}

        {page === "select" && (
          <div className="add-btn">
            <Button primary size="large" onClick={() => setPage("add")}>
              배송지 추가
            </Button>
          </div>
        )}
      </>
    </Wrapper>
  );
};

const Wrapper = styled(ModalWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 40rem;
  height: 68rem;
  padding: 0;
  padding-top: 2rem;
  overflow-y: hidden;
  .add-btn {
    padding: 2rem;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
  }
  .back-btn {
    cursor: pointer;
    position: absolute;
    top: 3rem;
    left: 2rem;
  }
`;

const Contents = styled.div`
  width: 100%;
  height: 55rem;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  ${gap("1rem", "column")}
  background: ${({ theme }) => theme.color.background};
  overflow-y: scroll;
  .empty {
    height: 100%;
    ${({ theme }) => theme.font.medium};
    ${({ theme }) => theme.flexCenter};
  }
`;

export default AddressModal;
