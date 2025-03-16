import axios from "axios";

const API_URL = "http://localhost:6543/auth/";
const instance = axios.create({ baseURL: API_URL });

// Rafraîchir le token
export const refreshTokenRequest = (token) => 
  instance.post("refreshtoken", { refreshToken: token });

export const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// Ajouter un intercepteur pour gérer l'expiration du token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user?.refreshToken) {
          logout();
          return Promise.reject(error);
        }
        
        const response = await refreshTokenRequest(user.refreshToken);
        user.accessToken = response.data.accessToken;
        localStorage.setItem("user", JSON.stringify(user));

        originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const signup = (user) => instance.post("signup", user);
export const login = (user) => instance.post("signin", user);

export default instance;
