import properties from "@/config/properties";
import { ProductType } from "@/shared/type";
import { memo } from "react";
import { Image } from "@/Components/Common";

const DetailInfo = ({ product }: { product: ProductType }) => {
  return (
    status !== "loading" && (
      <div>
        {product?.details.map((detail) => (
          <Image
            key={detail}
            src={properties.imgURL + detail}
            lazyload={true}
          />
        ))}
      </div>
    )
  );
};

export default memo(DetailInfo);
