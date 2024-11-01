import axiosClient from "./axiosClient";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post("/users/login", payload);
  },

  register(payload: RegisterPayload) {
    return axiosClient.post("/users/register", payload);
  },

  logout() {
    return axiosClient.post("/users/logout");
  },
};

export default authApi;
