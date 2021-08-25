import Button from "@/Components/Button";
import Rating from "@/Components/Rating";
import useInput from "@/hooks/useInput";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { gap } from "@/styles/theme";
import { useState } from "react";
import { postReview } from "@/api/reviews";
import { useRef } from "react";

interface ReviewModalProps {
  handleModalOpen: Function;
  id: number;
  productId: number;
}

const ReviewModal = ({
  handleModalOpen,
  id: orderId,
  productId,
}: ReviewModalProps) => {
  const reviewVal = useInput("");
  const rate = useRef("");
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
    formData.append("orderId", orderId.toString());
    formData.append("productId", productId.toString());
    formData.append("rate", rate.current);
    formData.append("content", reviewVal.value);
    file && formData.append("file", file);
    await postReview(formData);
  };

  return (
    <ModalWrapper title="후기작성" closeModal={() => handleModalOpen(false)}>
      <Wrapper onSubmit={hanleSubmit}>
        <div className="content">
          <div className="content__label">별점 평가</div>
          <Rating rate={rate} />
        </div>
        <div className="content">
          <div className="content__label">사진 첨부 (선택)</div>

          <div className="content__preview">
            <img src={previewURL} />
          </div>
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
            defaultValue={reviewVal.value}
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
    &__preview {
      text-align: center;
      & > img {
        max-height: 20rem;
        height: 100%;
      }
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
