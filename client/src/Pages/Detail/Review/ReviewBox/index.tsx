import styled from "styled-components";
import { ReviewType } from "@/shared/type";
import Rating from "@/Components/Rating";
import { gap, theme } from "@/styles/theme";
import { YYYY_M_D_H_m } from "@/utils/util";
import properties from "@/config/properties";

const ReviewBox = (review: ReviewType) => {
  return (
    <Wrapper>
      <div>
        <div className="rating">
          <Rating value={review.rate} readOnly color="#fff" />
        </div>

        <Header>
          <div className="author">{review.authorName}</div>
          <div className="date">{YYYY_M_D_H_m(review.date)}</div>
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
  .rating {
    background: ${({ theme }) => theme.color.primary3};
    color: #fff;
    padding: 0.4rem 0.7rem 0.1rem 0.7rem;
    border-radius: 2rem;
    position: absolute;
    top: -1rem;
    left: 1rem;
    transform: scale(1);
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
