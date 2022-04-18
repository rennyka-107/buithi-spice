import { convertCamelCaseKeysToSnakeCase } from "helpers";
import axiosClient from "services";

const CATEGORIES = "/categories";

const CategoryApi = {
  getAllCategories({ page = 1, size = 5 }) {
    return axiosClient.get(`${CATEGORIES}?page=${page}&size=${size}`);
  },
  createNewCategory(data) {
    let bodyFormData = new FormData();
    for (const property in convertCamelCaseKeysToSnakeCase(data)) {
      bodyFormData.append(property, data[property]);
    }
    return axiosClient.post(CATEGORIES, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default CategoryApi;
