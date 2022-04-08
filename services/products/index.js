import { convertCamelCaseKeysToSnakeCase } from "helpers";
import axiosClient from "services";

const PRODUCTS = "/products";
const GET_PRODUCTS_BY_CATEGORY = "/products/by-category";

const ProductApi = {
  getProductById(id) {
    return axiosClient.get(`${PRODUCTS}/${id}`);
  },
  getAllProducts({ page = 1, size = 10 }) {
    return axiosClient.get(`${PRODUCTS}?page=${page}&size=${size}`);
  },
  getProductsByCategory(categoryId, { page = 1, size = 10 }) {
    return axiosClient.get(
      `${GET_PRODUCTS_BY_CATEGORY}/${categoryId}?page=${page}&size=${size}`
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
