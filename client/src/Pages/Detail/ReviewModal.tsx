import Button from "@/Components/Button";
import ETRating from "@/Components/ETRating";
import useInput from "@/hooks/useInput";
import React from "react";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";

const ReviewModal = ({ handleModalOpen }) => {
  const reviewVal = useInput("");

  return (
    <Wrapper
      title="후기작성"
      closeModal={(e: React.MouseEvent) => handleModalOpen(e, false)}
    >
      <form>
        <div className="content">
          <div className="content__label">별점 평가</div>
          <ETRating />
        </div>
        <div className="content">
          <div className="content__label">사진 첨부 (선택)</div>

          <label className="upload-btn" htmlFor="img-upload">
            사진 업로드 (최대 1장)
          </label>
          <input id="img-upload" type="file" accept="image/*" />
        </div>

        <div className="content">
          <div className="content__label">후기 작성</div>
          <ReivewInput
            placeholder="자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다."
            value={reviewVal.value}
            onChange={reviewVal.onChange}
          />
        </div>

        <SubmitBtn primary>완료</SubmitBtn>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled(ModalWrapper)`
  .header {
    ${({ theme }) => theme.font.large};
    margin: 1rem;
    color: ${({ theme }) => theme.color.primary1};
  }
  form {
    ${({ theme }) => theme.flexCenter};
    flex-direction: column;
    width: 100%;
    .content {
      margin-top: 4rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      &__label {
        ${({ theme }) => theme.font.medium};
      }
    }
    .upload-btn {
      ${({ theme }) => theme.font.large}
      width: 100%;
      cursor: pointer;
      padding: 1.5rem 3rem;
      border: 0.1rem solid ${({ theme }) => theme.color.line};
      border-radius: 1rem;
      box-sizing: border-box;
      text-align: center;
    }
  }
  .header {
    ${({ theme }) => theme.font.large};
    margin: 1rem;
    color: ${({ theme }) => theme.color.primary1};
  }
  form {
    ${({ theme }) => theme.flexCenter};
    flex-direction: column;
    width: 100%;
    .content {
      margin-top: 4rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      &__label {
        ${({ theme }) => theme.font.medium};
      }
    }
    .upload-btn {
      ${({ theme }) => theme.font.large}
      width: 100%;
      cursor: pointer;
      padding: 1.5rem 3rem;
      border: 0.1rem solid ${({ theme }) => theme.color.line};
      border-radius: 1rem;
      box-sizing: border-box;
      text-align: center;
    }
  }
`;

const ReivewInput = styled.textarea`
  border: 0.1rem solid ${({ theme }) => theme.color.line};
  height: 10rem;
  padding: 1.5rem;
`;

const SubmitBtn = styled(Button)`
  width: 100%;
  margin-top: 3rem;
`;

export default ReviewModal;
