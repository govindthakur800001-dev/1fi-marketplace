import { useCallback, useEffect, useState } from "react";
import { fetchProductById } from "../api/productsApi";

export function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setStatus("loading");
    setError(null);
    fetchProductById(productId)
      .then((data) => {
        setProduct(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  return { product, status, error, retry: load };
}
