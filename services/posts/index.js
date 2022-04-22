import { convertCamelCaseKeysToSnakeCase } from "helpers";
import axiosClient from "services";

const POSTS = "/posts";
const GET_POSTS_BY_CATEGORY = "/posts/by-category";

const PostApi = {
  getPostBySlug(slug) {
    return axiosClient.get(`${POSTS}/by-slug/${slug}`);
  },
  getAllPosts({ page = 1, size = 10 }) {
    return axiosClient.get(`${POSTS}?page=${page}&size=${size}`);
  },
  getPostsByCategory(categoryId, { page = 1, size = 10 }) {
    return axiosClient.get(
      `${GET_POSTS_BY_CATEGORY}/${categoryId}?page=${page}&size=${size}`
    );
  },
  createNewPost(data) {
    let bodyFormData = new FormData();
    for (const property in convertCamelCaseKeysToSnakeCase(data)) {
      bodyFormData.append(property, data[property]);
    }
    return axiosClient.post(POSTS, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  updatePost(id, data) {
    let bodyFormData = new FormData();
    for (const property in convertCamelCaseKeysToSnakeCase(data)) {
      bodyFormData.append(property, data[property]);
    }
    return axiosClient.post(`${POSTS}/${id}`, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deletePost(id) {
    return axiosClient.delete(`${POSTS}/${id}`);
  },
};

export default PostApi;
