import axiosClient from "services";

const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";
const REGISTER = "/auth/register";
const GET_CSRF_COOKIE = "/sanctum/csrf-cookie";
const GET_VERIFY_CODE = "/auth/get-verify-code";
const RESET_PASSWORD_WITH_CODE = "/auth/renew-forgot-password";

const AuthApi = {
  getCsrfCookie() {
    return axiosClient.get(GET_CSRF_COOKIE, {
      withCredentials: true,
    });
  },
  login(data) {
    return axiosClient.post(LOGIN, data);
  },
  logout() {
    return axiosClient.get(LOGOUT);
  },
  register(data) {
    return axiosClient.post(REGISTER, data);
  },
  getVerifyCode(data) {
    return axiosClient.post(GET_VERIFY_CODE, data);
  },
  resetPasswordWithCode(data) {
    return axiosClient.post(RESET_PASSWORD_WITH_CODE, data);
  },
};

export default AuthApi;
