import styled from "styled-components";
import { ReviewType } from "@/shared/type";
import Rating from "@/Components/Rating";
import { gap, media } from "@/styles/theme";
import { YYYY_M_D_H_m } from "@/utils/util";
import properties from "@/config/properties";
import { deleteReview } from "@/api/reviews";
import { QueryObserverResult } from "react-query";
import { ReviewForm } from "@/Pages/MyPage/ContentArea/contents/Review";

const ReviewBox = ({
  review,
  refetch,
  handleClickEditButton,
}: {
  review: ReviewType;
  refetch?: () => Promise<QueryObserverResult<any, unknown>>;
  handleClickEditButton?: (review: ReviewForm) => void;
}) => {
  const pathname = location.pathname.split("/")[1];

  return (
    <Wrapper>
      <div>
        <div className="rating">
          <Rating value={review.rate} readOnly color="#fff" />
        </div>

        <Header>
          <div className="author">{review.authorName}</div>
          <div className="date">{YYYY_M_D_H_m(review.date)}</div>
          {pathname && (
            <EditAndDeleteButtons
              {...{ review, refetch, handleClickEditButton }}
            />
          )}
        </Header>

        <div className="content">{review.content}</div>
      </div>

      <div className="content-img">
        {review.image && (
          <img src={properties.imgURL + review.image} alt="review_img" />
        )}
      </div>
    </Wrapper>
  );
};

const EditAndDeleteButtons = ({ handleClickEditButton, review, refetch }) => {
  const handleClickDeleteButton = async () => {
    const confirm = window.confirm(
      "고객님이 작성한 후기는 다른 고객님들께 많은 도움이 됩니다. 정말로 삭제하시겠어요?"
    );
    if (confirm) {
      const result = await deleteReview({ id: review?.id });
      refetch();
    } 
  };
  const { id, rate, content, image } = review;

  return (
    <div className="buttons">
      <button
        onClick={() => handleClickEditButton({ id, rate, content, image })}
      >
        수정
      </button>
      <button onClick={handleClickDeleteButton}>삭제</button>
    </div>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.font.medium}
  ${({ theme }) => theme.shadow}
  position: relative;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  box-sizing: border-box;
  position: relative;

  ${media.tablet} {
    flex-direction: column;
  }

  .rating {
    background: ${({ theme }) => theme.color.primary3};
    color: #fff;
    padding: 0.4rem 0.7rem 0.1rem 0.7rem;
    border-radius: 2rem;
    position: absolute;
    top: -1rem;
    left: 1rem;
  }

  .content {
    margin-top: 1.5rem;
    ${({ theme }) => theme.font.large};
    font-weight: 400;
    line-height: 3.5rem;
    white-space: pre-line;
    padding: 1rem;
    box-sizing: border-box;
  }

  .content-img {
    max-width: 30rem;
    max-height: 30rem;
    align-self: center;
    img {
      width: 100%;
      border-radius: 1rem;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  ${gap("1rem")}
  margin-top: 1rem;
  .author {
    ${({ theme }) => theme.font.medium};
    font-weight: 600;
  }
  .date {
    ${({ theme }) => theme.font.small};
  }
`;

export default ReviewBox;
