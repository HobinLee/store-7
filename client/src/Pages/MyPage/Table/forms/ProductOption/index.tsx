import styled from "styled-components";
import { Link } from "@/Router";

export interface ProductOptionProps {
  image: string;
  name: string;
  id: number;
}

const ProductOption = ({ image, name, id }: ProductOptionProps) => {
  return (
    <Link to={`/detail/${id}`}>
      <ProductOptionWrapper>
        <div className="thumbnail">
          <img src={image} />
        </div>
        <h4 className="product__name">{name}</h4>
      </ProductOptionWrapper>
    </Link>
  );
};

const ProductOptionWrapper = styled.div`
  display: flex;
  align-items: center;

  .thumbnail {
    width: 6rem;
    height: 7.5rem;
    img {
      display: block;
      width: 100%;
    }
    margin-right: 2rem;
  }

  .product__name {
    flex: 1;
    ${({ theme }) => theme.font.medium}
    font-weight: bold;
    line-height: 2.5rem;
    text-align: left;
  }
`;

export default ProductOption;
