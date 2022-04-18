import { convertCamelCaseKeysToSnakeCase } from "helpers";
import axiosClient from "services";

const PRODUCTS = "/products";
const GET_PRODUCTS_BY_CATEGORY = "/products/by-category";

const ProductApi = {
  getProductBySlug(slug) {
    return axiosClient.get(`${PRODUCTS}/by-slug/${slug}`);
  },
  getAllProducts({ page = 1, size = 10 }) {
    return axiosClient.get(`${PRODUCTS}?page=${page}&size=${size}`);
  },
  getProductsByCategory({ page = 1, size = 10, ids = [] }) {
    return axiosClient.post(
      `${GET_PRODUCTS_BY_CATEGORY}?page=${page}&size=${size}`,
      { ids }
    );
  },
  createNewProduct(data) {
    let bodyFormData = new FormData();
    for (const property in convertCamelCaseKeysToSnakeCase(data)) {
      bodyFormData.append(property, data[property]);
    }
    return axiosClient.post(PRODUCTS, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default ProductApi;
