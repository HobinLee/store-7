import Button from "@/Components/Button";
import Rating from "@/Components/Rating";
import useInput from "@/hooks/useInput";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { gap } from "@/styles/theme";
import { useState } from "react";
import { patchReview, postReview } from "@/api/reviews";
import { useRef } from "react";
import { ReviewForm } from "@/Pages/MyPage/ContentArea/contents/Review";
import properties from "@/config/properties";
import APIButton from "@/Components/APIButton";
import { useMyOrders, useMyReviews } from "@/api/my";

interface ReviewModalProps {
  submitType: string;
  handleModalOpen: Function;
  orderId?: number;
  productId?: number;
  review?: ReviewForm;
}

const ReviewModal = ({
  handleModalOpen,
  orderId,
  productId,
  review = { rate: "0", content: "", image: "" },
  submitType,
}: ReviewModalProps) => {
  const { refetch: orderRefetch } = useMyOrders();
  const { refetch: reviewRefetch } = useMyReviews();
  const reviewVal = useInput(review.content);
  const [rate, setRate] = useState(review.rate);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewURL, setPreviewURL] = useState<string>(
    review.image && properties.imgURL + review.image
  );

  const selectImg = ({ target }: { target: HTMLInputElement }) => {
    const reader = new FileReader();
    const targetFile = target.files[0];
    setFile(targetFile);

    reader.onloadend = () => {
      setPreviewURL(reader.result as string);
    };

    reader.readAsDataURL(targetFile);
  };

  const hanleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (submitType === "post") {
      formData.append("orderId", orderId.toString());
      formData.append("productId", productId.toString());
      formData.append("rate", rate);
      formData.append("content", reviewVal.value);
      file && formData.append("file", file);
      await postReview(formData);
      handleModalOpen(false, true);
      orderRefetch();
    } else if (submitType === "patch") {
      formData.append("rate", rate);
      formData.append("content", reviewVal.value);
      if (file) {
        file && formData.append("file", file);
      }
      await patchReview({ id: review.id, data: formData });
      handleModalOpen(false, true);
      reviewRefetch();
    }
  };

  return (
    <ModalWrapper title="후기작성" closeModal={() => handleModalOpen(false)}>
      <Wrapper>
        <div className="content">
          <div className="content__label">별점 평가</div>
          <span className="rating">
            <Rating {...{ rate, setRate }} />
          </span>
        </div>
        <div className="content">
          <div className="content__label">사진 첨부 (선택)</div>

          {previewURL && (
            <div className="content__preview">
              <img src={previewURL} />
            </div>
          )}
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
            placeholder="자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다. (10자 이상)"
            defaultValue={reviewVal.value}
            onChange={reviewVal.onChange}
          />
        </div>
        <APIButton
          api={hanleSubmit}
          primary
          className="submit-btn"
          disabled={rate === "0" || reviewVal.value.length < 10}
        >
          완료
        </APIButton>
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
    .rating {
      transform: scale(1.8);
      width: 15rem;
      margin-left: 6rem;
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
  .submit-btn {
    width: 100%;
    margin-top: 3rem;
  }
`;

const ReivewInput = styled.textarea`
  border: 0.1rem solid ${({ theme }) => theme.color.line};
  height: 10rem;
  padding: 1.5rem;
  ${({ theme }) => theme.font.medium};
  ${({ theme }) => theme.borderRadius.medium};
`;

export default ReviewModal;
