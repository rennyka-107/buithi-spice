import axios from "axios";
import { convertCamelCaseKeysToSnakeCase, convertKeysToCamel } from "helpers";
import { getDataLocalStorage } from "helpers/localStorage";
import queryString from "query-string";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: process.env.URL_API,
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const newConfig = { ...config };
    if (typeof window !== "undefined") {
      const authData = getDataLocalStorage("auth");
      if (authData) {
        const { accessToken } = authData;
        newConfig.headers.Authorization = "Bearer " + accessToken;
      }
    }
    if (newConfig.headers["Content-Type"] === "multipart/form-data")
      return newConfig;
    if (config.params) {
      newConfig.params = convertCamelCaseKeysToSnakeCase(config.params);
    }
    if (config.data) {
      newConfig.data = convertCamelCaseKeysToSnakeCase(config.data);
    }
    // Do something before request is sent

    return newConfig;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    const camelResponse = {
      ...response,
      data: convertKeysToCamel(response.data),
    };
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return camelResponse;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (typeof window !== "undefined" && error.response.status === 401) {
      toast("Unauthorize! Please login to be continued!");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
