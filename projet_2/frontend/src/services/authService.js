import axios from 'axios';

const API_URL = "http://localhost:6543/auth/";

export const signup = (user) => axios.post(API_URL + "signup", user);
export const login = (user) => axios.post(API_URL + "signin", user);
export const refreshToken = (token) => axios.post(API_URL + "refreshtoken", { refreshToken: token });
