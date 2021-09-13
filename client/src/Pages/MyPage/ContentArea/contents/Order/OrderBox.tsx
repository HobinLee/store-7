import ReviewModal from "@/Pages/Detail/Review/ReviewModal";
import { Link } from "@/Router";
import { MyOrderType, OrderStatus } from "@/shared/type";
import { media, theme } from "@/styles/theme";
import { convertToKRW, YYYYMMDD_DOT } from "@/utils/util";
import { useState } from "react";
import styled, { css } from "styled-components";
import { Back } from "@/assets";
import { gap } from "@/styles/theme";
import { deleteOrder, useMyOrders } from "@/api/my";
import properties from "@/config/properties";

const OrderBox = ({
  id,
  productId,
  reviewId,
  createdAt,
  amount,
  price,
  image,
  type,
  productName,
}: MyOrderType & { type: string }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const { refetch } = useMyOrders();

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

  const handleCancelOrder = async () => {
    const confirm = window.confirm("주문을 취소하시겠습니까?");
    if (confirm) {
      await deleteOrder({ id });
      refetch();
    }
  };
  return (
    <Container>
      <Wrapper type={type}>
        <div className="body">
          <Link to={`/detail/${productId}`}>
            <div className="image">
              <img
                src={`${properties.imgURL}${image}`}
              />
            </div>
          </Link>

          <div className="contents">
            <Link to={`/detail/${productId}`}>
              <h3>{productName}</h3>
            </Link>
            <div className="create-at">{YYYYMMDD_DOT(createdAt)}</div>
            <div className="price">
              {convertToKRW(price)} x {amount}
            </div>
          </div>
          {isModalOpened && (
            <ReviewModal
              submitType="post"
              {...{ handleModalOpen, orderId: id, productId }}
            />
          )}
        </div>
      </Wrapper>
      {type === OrderStatus.Arrival &&
        (reviewId ? (
          <div className="review-badge">리뷰완료</div>
        ) : (
          <TagButton
            isReviewed={reviewId !== 0}
            onClick={() => handleModalOpen(true)}
            color="primary1"
          >
            <div>리뷰쓰기</div>
            <Back className="next-btn" />
          </TagButton>
        ))}
      {type === OrderStatus.Prepare && (
        <TagButton color="error_color" onClick={handleCancelOrder}>
          <div>주문 취소</div>
          <Back className="next-btn" />
        </TagButton>
      )}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  .review-badge {
    background: ${({ theme }) => theme.color.primary3};
    color: #fff;
    padding: 0.7rem 1rem 0.4rem 1rem;
    border-radius: 2rem;
    position: absolute;
    top: -1rem;
    left: 1rem;
    ${({ theme }) => theme.font.small}
  }
  & + & {
    margin-top: 2rem;
  }
`;

const Wrapper = styled.div<{ type: string }>`
  width: 100%;
  border-radius: 1rem;
  display: flex;
  background: white;

  ${({ theme }) =>
    css`
      ${theme.shadow}
      ${theme.font.medium}
    `}

  .body {
    display: flex;

    .image {
      width: 10rem;
      & > img {
        display: block;
        width: 100%;
        border-radius: 1rem 0 0 1rem;
      }
    }
    .contents {
      flex: 1;
      padding: 1rem;
      position: relative;
      h3 {
        width: 100%;
        font-weight: 700;
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 0.1rem solid ${({ theme }) => theme.color.light_grey1};
        line-height: 2rem;

        ${media.tablet} {
          font-weight: 500;
          margin-bottom: 1rem;
          line-height: 1.6rem;
          font-size: 1.6rem;
          padding-bottom: 0rem;
          border-bottom: none;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-wrap: break-word;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }

      .create-at {
        ${({ theme }) => theme.font.small};
        color: ${({ theme }) => theme.color.body};
        letter-spacing: 0.1rem;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
      }

      .price {
        font-weight: 700;
        margin-top: 1.5rem;
      }
    }
  }
`;

const TagButton = styled.div<{ color: string; isReviewed?: boolean }>`
  ${theme.flexCenter}
  justify-content: flex-end;
  cursor: pointer;
  color: ${({ theme, color }) => theme.color[color]};
  ${({ theme }) => theme.font.medium};
  ${gap("1rem")}
  padding-top: 0.7rem;
  font-weight: 800;

  div {
    padding-top: 0.7rem;
  }

  .next-btn {
    transform: rotate(180deg);
  }
  fill: ${({ theme, color }) => theme.color[color]};

  &:hover {
    color: ${({ theme }) => theme.color.primary3};
    fill: ${({ theme }) => theme.color.primary3};
  }
`;

export default OrderBox;
