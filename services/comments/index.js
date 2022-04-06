import { convertCamelCaseKeysToSnakeCase } from "helpers";
import axiosClient from "services";

const COMMENTS = "/comments";
const GET_COMMENTS_BY_POST = "/comments/by-post";

const CommentApi = {
  getCommentsByPost(postId, { page = 1, size = 10 }) {
    return axiosClient.get(
      `${GET_COMMENTS_BY_POST}/${postId}?page=${page}&size=${size}`
    );
  },
  createNewComment(data) {
    return axiosClient.post(COMMENTS, data);
  },
};

export default CommentApi;
