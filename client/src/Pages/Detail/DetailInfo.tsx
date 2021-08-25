import properties from "@/config/properties";
import { ProductType } from "@/shared/type";
import { memo } from "react";

const DetailInfo = ({ product }: { product: ProductType }) => {
  return (
    status !== "loading" && (
      <div>
        {product?.details.map((detail) => (
          <img key={detail} src={properties.imgURL + detail} />
        ))}
      </div>
    )
  );
};

export default memo(DetailInfo);
