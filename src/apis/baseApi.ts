import axios from 'axios';

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    TokenCybersoft: `Bearer ${import.meta.env.VITE_TOKEN_CYBERSOFT}`,
  },
});

export default baseApi;

baseApi.interceptors.request.use(
  (request) => {
    const accessToken =
      JSON.parse(localStorage.getItem('currentUser') || '{}').accessToken || '';
    request.headers.Authorization  = `Bearer ${accessToken}`;
    request.headers.TokenCybersoft = `Bearer ${import.meta.env.VITE_TOKEN_CYBERSOFT}`;

    return request;
  },
  (error) => {
    // request.config
    return Promise.reject(error);
  }
);
