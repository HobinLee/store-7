import styled from "styled-components";
import Section from "../../../Section";
import { useMyReviews } from "@/api/my";
import ReviewBox from "@/Pages/Detail/Review/ReviewBox";
import { gap } from "@/styles/theme";
import { useState } from "react";
import ReviewModal from "@/Pages/Detail/Review/ReviewModal";
import NoData from "@/Components/NoData";

export interface ReviewForm {
  id?: number;
  rate: string;
  content: string;
  image?: string;
}

const Review = () => {
  const { status, data: reviews, refetch } = useMyReviews();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [review, setReview] = useState<ReviewForm | undefined>(undefined);

  const handleClickEditButton = (review: ReviewForm) => {
    setReview(review);
    handleModalOpen(true);
  };

  const handleModalOpen = (val: boolean, justClose = false) => {
    if (justClose) {
      setIsModalOpened(false);
      return;
    }
    if (!val) {
      const submit = window.confirm(
        "작성하고 있던 내용이 유실됩니다. 정말 다른 페이지로 이동하시겠어요?"
      );
      if (submit) setIsModalOpened(val);
    } else setIsModalOpened(val);
  };

  return (
    <Wrapper data-testid="test__review-content">
      <Section
        title="나의 상품후기"
        description="회원님의 상품후기 내역입니다."
      >
        <ReviewsWrapper>
          {status !== "loading" ? (
            reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewBox {...{ review, refetch, handleClickEditButton }} />
              ))
            ) : (
              <NoData />
            )
          ) : (
            <div>스켈레톤 UI</div>
          )}
        </ReviewsWrapper>
        {isModalOpened && (
          <ReviewModal submitType="patch" {...{ handleModalOpen, review }} />
        )}
      </Section>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

const ReviewsWrapper = styled.div`
  margin-top: 3rem;
  ${gap("3rem", "column")}
`;
export default Review;
