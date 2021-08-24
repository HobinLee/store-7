import Button from "@/Components/Button";
import Rating from "@/Components/Rating";
import useInput from "@/hooks/useInput";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { gap } from "@/styles/theme";
import { FormEvent, useState } from "react";
import { postReview } from "@/api/reviews";
import { ChangeEventHandler } from "react";

const ReviewModal = ({ handleModalOpen }) => {
  const reviewVal = useInput("");

  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewURL, setPreviewURL] = useState("");

  const selectImg = ({ target }: { target: HTMLInputElement }) => {
    const reader = new FileReader();
    const targetFile = target.files[0];
    setFile(targetFile);

    reader.onloadend = () => {
      setPreviewURL(reader.result as string);
    };

    reader.readAsDataURL(targetFile);
  };

  const hanleSubmit = async () => {
    const formData = new FormData();
    formData.append("orderId", "7");
    formData.append("rate", "3");
    formData.append("content", "asdf");
    formData.append("file", file);
    await postReview(formData);
  };

  return (
    <ModalWrapper title="후기작성" closeModal={() => handleModalOpen(false)}>
      <Wrapper onSubmit={hanleSubmit}>
        <div className="content">
          <div className="content__label">별점 평가</div>
          <Rating />
        </div>
        <div className="content">
          <div className="content__label">사진 첨부 (선택)</div>

          <img src={previewURL} />
          <label className="upload-btn" htmlFor="img-upload">
            사진 업로드 (최대 1장)
          </label>
          <input
            id="img-upload"
            type="file"
            accept="image/*"
            onChange={selectImg}
          />
        </div>

        <div className="content">
          <div className="content__label">후기 작성</div>
          <ReivewInput
            placeholder="자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다."
            value={reviewVal.value}
            onChange={reviewVal.onChange}
          />
        </div>

        <SubmitBtn type="submit" primary>
          완료
        </SubmitBtn>
      </Wrapper>
    </ModalWrapper>
  );
};

const Wrapper = styled.form`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  width: 100%;
  .content {
    margin-top: 4rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    ${gap("1rem", "column")}
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
