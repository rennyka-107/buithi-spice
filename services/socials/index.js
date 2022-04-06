import axiosClient from "services";

const SocialApi = {
  getSocialUrlLogin(provider) {
    return axiosClient.get(`/auth/${provider}/url`);
  },
  getInfoSocial(params, provider) {
    return axiosClient.get(`/auth/${provider}/callback`, {
      params: params,
    });
  },
};

export default SocialApi;
