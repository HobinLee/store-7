import { useProduct } from "@/api/products";
import properties from "@/config/properties";

const DetailInfo = () => {
  const productId = location.pathname.split("detail/")[1];
  const { status, data: product, error } = useProduct(parseInt(productId));

  return (
    status !== "loading" && (
      <div>
        {product.details.map((detail) => (
          <img key={detail} src={properties.imgURL + detail} />
        ))}
      </div>
    )
  );
};

export default DetailInfo;
