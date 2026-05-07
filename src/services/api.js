// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://sitelavajato-backend.onrender.com/",
});

// 🔐 adiciona o token automaticamente em TODAS requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;