import axios from 'axios';

export const loginWithGoogle = () => {
  window.location = '/auth/google';
};
export const logout = () => {
  window.location = '/auth/logout';
};
