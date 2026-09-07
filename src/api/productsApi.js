import { request } from "./client";
import products from "./mockData/products.json";

/**
 * GET /marketplace/products
 * Optionally filtered by category, mirroring how a real paginated
 * catalog endpoint would accept query params.
 */
export function fetchProducts({ category } = {}) {
  return request(() => {
    if (!category || category === "All") return products;
    return products.filter((product) => product.category === category);
  });
}

/** GET /marketplace/products/:id */
export function fetchProductById(id) {
  return request(() => {
    const product = products.find((item) => item.id === id);
    if (!product) {
      const error = new Error("This product is no longer available.");
      error.isNotFound = true;
      throw error;
    }
    return product;
  });
}

/** GET /marketplace/categories — derived, but modeled as its own endpoint
 *  since a real catalog service would own category taxonomy separately
 *  from the product list. */
export function fetchCategories() {
  return request(() => {
    const unique = [...new Set(products.map((product) => product.category))];
    return ["All", ...unique];
  });
}
