import styled from "styled-components";
import { ReviewType } from "@/shared/type";
import Rating from "@/Components/Rating";
import { gap } from "@/styles/theme";
import { YYYY_MM_DD_HH_mm } from "@/utils/util";

const ReviewBox = (review: ReviewType) => {
  return (
    <Wrapper data-testid="test__review-box">
      <Header>
        <div className="author">{review.authorName}</div>
        <div className="info">
          <div className="info__rate">
            <Rating value={review.rate} readOnly />
          </div>
          <div className="info__date">{YYYY_MM_DD_HH_mm(review.date)}</div>
        </div>
      </Header>

      <div className="content">
        <div className="content-img">
          {review.image && <img src={`${review.image}`} alt="review_img" />}
        </div>
        <span>{review.content}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.font.medium}
  width: 100%;
  padding: 4rem 0;
  .content {
    margin-top: 1.5rem;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: 1rem;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    ${gap("3rem", "column")}

    .content-img {
      max-width: 80%;
      align-self: center;
      img {
        width: 100%;
      }
    }
  }
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.line};
`;

const Header = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  align-items: flex-start;
  ${gap("1rem", "column")}
  .info {
    ${({ theme }) => theme.flexCenter}
    ${gap("1rem", "column")}
  }
`;

export default ReviewBox;
