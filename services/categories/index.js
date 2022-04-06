import axiosClient from "services";

const GET_ALL_CATEGORIES = "/categories";

const CategoryApi = {
  getAllCategories({ page = 1, size = 5 }) {
    return axiosClient.get(`${GET_ALL_CATEGORIES}?page=${page}&size=${size}`);
  },
};

export default CategoryApi;
