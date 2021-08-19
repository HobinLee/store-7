import { useProduct } from "@/api/products";

const DetailInfo = () => {
  const productId = location.pathname.split("detail/")[1];
  const { status, data: product, error } = useProduct(parseInt(productId));

  return (
    status !== "loading" && (
      <div>
        {product.details.map((detail) => (
          <img key={detail} src={process.env.IMG_URL + detail} />
        ))}
      </div>
    )
  );
};

export default DetailInfo;
