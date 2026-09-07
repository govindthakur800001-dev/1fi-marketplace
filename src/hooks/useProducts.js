import { useCallback, useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "../api/productsApi";

/**
 * Owns the full lifecycle of "list of marketplace products": categories,
 * the active filter, and the request state (idle/loading/error/success)
 * for the product list itself. Kept as a hook rather than inline
 * component state so it's reusable and independently testable, and so
 * <ProductGrid> stays a plain, dumb presentational component.
 */
export function useProducts() {
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "error" | "success"
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {
      /* Category chips are non-critical — fail silently and keep "All". */
    });
  }, []);

  const load = useCallback((category) => {
    setStatus("loading");
    setError(null);
    fetchProducts({ category })
      .then((data) => {
        setProducts(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err);
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    load(activeCategory);
  }, [activeCategory, load]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    products,
    status,
    error,
    retry: () => load(activeCategory),
  };
}
