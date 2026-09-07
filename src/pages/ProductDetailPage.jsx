import { useProductDetail } from "../hooks/useProductDetail";
import { ProductDetail } from "../components/marketplace/ProductDetail";

export function ProductDetailPage({ productId }) {
  const { product, status, error, retry } = useProductDetail(productId);
  return <ProductDetail status={status} product={product} error={error} onRetry={retry} />;
}
