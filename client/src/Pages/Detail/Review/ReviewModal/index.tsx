import Rating from "@/Components/Common/Rating";
import useInput from "@/hooks/useInput";
import styled from "styled-components";
import ModalWrapper from "@/Components/ModalWrapper";
import { gap } from "@/styles/theme";
import { useState } from "react";
import { patchReview, postReview } from "@/api/reviews";
import { ReviewForm } from "@/Pages/MyPage/ContentArea/contents/Review";
import properties from "@/config/properties";
import APIButton from "@/Components/Common/Button/APIButton";
import { useMyOrders, useMyReviews } from "@/api/my";
import useValidation from "@/hooks/useValidation";
import {
  validateTextarea,
  validateReviewRate,
  VALIDATION_ERR_MSG,
} from "@/utils/validations";
import { useEffect } from "react";
import ValidationInput from "@/Components/Common/Input/ValidationInput";

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
  const reviewValidation = useValidation(validateTextarea);
  const rateValidation = useValidation(validateReviewRate);
  const reviewVal = useInput(review.content);
  const [rate, setRate] = useState(review.rate);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewURL, setPreviewURL] = useState<string>(
    review.image && properties.imgURL + review.image
  );

  useEffect(() => {
    reviewValidation.onCheck(reviewVal.value);
    rateValidation.onCheck(rate);
  }, [rate, reviewVal]);

  const isSubmitable = reviewValidation.isValid && rateValidation.isValid;

  const selectImg = ({ target }: { target: HTMLInputElement }) => {
    const reader = new FileReader();
    const targetFile = target.files[0];
    setFile(targetFile);

    reader.onloadend = () => {
      setPreviewURL(reader.result as string);
    };

    reader.readAsDataURL(targetFile);
  };

  const hanleSubmit = async (e: Event) => {
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
      file && formData.append("file", file);
      await patchReview({ id: review.id, data: formData });
      handleModalOpen(false, true);
      reviewRefetch();
    }
  };

  // 글자 수
  const [contentLen, setContentLen] = useState(0);
  const handleContentInput = ({ target }: { target: HTMLTextAreaElement }) => {
    setContentLen(target.value.length);
  };

  return (
    <ModalWrapper title="후기작성" closeModal={() => handleModalOpen(false)}>
      <Wrapper>
        <div className="content">
          <div className="content__label">별점 평가</div>
          <span className="content__rating">
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
          <div>
            <div className="content__label">후기 작성</div>
            <div>
              <span>{contentLen}</span>/100
            </div>
          </div>
          <ValidationInput
            input={reviewVal}
            validation={reviewValidation}
            placeholder="자세하고 솔직한 리뷰는 다른 고객에게 큰 도움이 됩니다."
            message={VALIDATION_ERR_MSG.INVALID_REVIEW}
            className="content__review"
            type="textarea"
            onInput={handleContentInput}
            maxLength={99}
          />
        </div>
        <APIButton
          api={hanleSubmit}
          primary
          className="submit-btn"
          disabled={!isSubmitable}
          isDestroyed={true}
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
    &__rating {
      transform: scale(1.8);
      width: 15rem;
      margin-left: 6rem;
    }
    &__review {
      border: 0.1rem solid ${({ theme }) => theme.color.line};
      height: 10rem;
      padding: 1.5rem;
      line-height: 2rem;
      ${({ theme }) => theme.font.medium};
      ${({ theme }) => theme.borderRadius.medium};
    }
    & > div {
      display: flex;
      justify-content: space-between;
      span {
        color: ${({ theme }) => theme.color.primary1};
        font-weight: 800;
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
  .submit-btn {
    width: 100%;
    margin-top: 3rem;
    height: 6rem;
  }
`;

export default ReviewModal;
